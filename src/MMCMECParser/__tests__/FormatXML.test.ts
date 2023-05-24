import { FormatXML } from '../tools/FormatXML';

describe('FormatXML', () => {
  const prefix1 = 'p1';
  const prefix2 = 'p2';
  const keysToAddPrefix1 = ['k1', 'k2'];

  const formatXML = new FormatXML(prefix1, prefix2, keysToAddPrefix1);

  const xml = `<${prefix1}:root><${prefix1}:child>Hello!</${prefix1}:child></${prefix1}:root>`;

  const object = {
    root: {
      child: {
        _tagText: 'Hello!',
      },
    },
  };

  it('formatTags', () => {
    expect(formatXML.formatTags(xml)).toBe('<root><child>Hello!</child></root>');
  });

  it('transformTextNodes', () => {
    formatXML.transformTextNodes(object);
    expect(object).toEqual({ root: { child: 'Hello!' } });
  });

  it('transformSpecificKeys', () => {
    formatXML.transformSpecificKeys(object);
    expect(object).toEqual({ root: { child: { $t: 'Hello!' } } });
  });

  it('removePrefixesAndCollectKeys', () => {
    expect(formatXML.removePrefixesAndCollectKeys(object)).toEqual(object);
  });

  it('addPrefixes', () => {
    expect(formatXML.addPrefixes(object)).toEqual(object);
  });

  it('extractParentElements', () => {
    expect(formatXML.extractParentElements(xml, ['child'])).toEqual(new Map().set('child', ['root']));
  });

  it('checkKeyAndParent', () => {
    const map = new Map().set('child', ['root']);
    expect(formatXML.checkKeyAndParent('child', 'root', map)).toBe(true);
  });

  it('removeAttributePrefixes', () => {
    const xmlWithAttr = `<root ${prefix1}:attr="value"><child>Hello!</child></root>`;
    const expectedXml = '<root attr="value"><child>Hello!</child></root>';
    expect(formatXML.removeAttributePrefixes(xmlWithAttr)).toBe(expectedXml);
  });
});
