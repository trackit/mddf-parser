import { XsdUtils } from './XsdUtils';
import { XMLRawParser } from '../XMLRawParser/XMLRawParser'

import { LocalFileAdaptor } from '../FileAdaptor/LocalFileAdaptor';

describe('XsdUtils', () => {

  var XsdPath: string = 'assets/JsonToXml/XsdTemplate.xsd';
  var JsonPath: string = 'assets/JsonToXml/JsonObject.json';

  describe('XsdIntoJson', () => {
    it('Test', async () => {
      const xsdUtils = new XsdUtils;
      const utils = new XMLRawParser;
      const fileReader = new LocalFileAdaptor();

      var testXsdString = await fileReader.readFile(XsdPath);
      var testJsonString = await fileReader.readFile(JsonPath);
      const testXsd: Record<string, unknown> = await utils.parseString(testXsdString);
      const testJson: JSON = JSON.parse(testJsonString);

      await fileReader.writeFile('assets/JsonToXml/JsonObject.json', JSON.stringify(testJson, null, 2));
      await fileReader.writeFile('assets/JsonToXml/XsdTemplate.json', JSON.stringify(testXsd, null, 2));

      const array: Array<string> = ["sample2", "sample"]

      xsdUtils.runJsonToXmlTest(testXsd, testJson);
      console.log(xsdUtils.searchElementNamespaceInXsd("sample5", testXsd, ""));
    })
  });

});
  