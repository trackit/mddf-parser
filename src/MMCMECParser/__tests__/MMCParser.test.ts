import { LocalXMLFileAdaptor } from '../adaptors/secondary/LocalXMLFileAdaptor';
import { MMCParser } from '../MMCMECParser';

describe('MMCParser', () => {
  interface TestParametersParseMMC {
    pathToXml: string,
  }

  const testParseMMC = async ({ pathToXml }: TestParametersParseMMC) => {
    const fileAdaptor = new LocalXMLFileAdaptor();
    const mmcParser = new MMCParser({ fileAdaptor });
    const tmp = await mmcParser.convert(await mmcParser.parse(pathToXml));
    expect(tmp).toEqual(mmcParser.mmcFile);
  };

  it('Test Parse MMC Function', async () => {
    const exampleXML = './src/MMCMECParser/__tests__/ressources/movielabs/fullMMC.xml';

    await testParseMMC({
      pathToXml: exampleXML,
    });
  });
});
