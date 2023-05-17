import { FormatXML } from '../tools/FormatXML';

const sampleXml = `
<mdmec:Basic id="1">
    <mdmec:movie>Example1</mdmec:movie>
    <mdmec:movie>Example2</mdmec:movie>
    <mdmec:movie>Example3</mdmec:movie>
</mdmec:Basic>
`;

const formatXml = new FormatXML('mdmec', 'md', ['movie']);

describe('FormatXML', () => {
  it('should format XML tags correctly', () => {
    const result = formatXml.formatTags(sampleXml);

    expect(result).toContain('<Basic id="1">');
    expect(result).toContain('<movie>Example1</movie>');
  });

  it('should transform text nodes correctly', () => {
    const obj = {
      movie: {
        _tagText: 'Example1',
      },
    };

    formatXml.transformTextNodes(obj);
    expect(obj.movie).toEqual('Example1');
  });

  it('should transform specific keys correctly', () => {
    const obj = {
      movie: 'Example1',
    };
    const result = formatXml.transformSpecificKeys(obj);

    expect(result.movie).toEqual({ $t: 'Example1' });
  });

  it('should remove prefixes and collect keys correctly', () => {
    const obj = {
      'mdmec:movie': 'Example1',
    };
    const result = formatXml.removePrefixesAndCollectKeys(obj);

    expect(result.movie).toEqual('Example1');
  });

  it('should add prefixes correctly', () => {
    const obj = {
      movie: 'Example1',
    };
    const result = formatXml.addPrefixes(obj);

    expect(result['mdmec:movie']).toEqual('Example1');
  });
});
