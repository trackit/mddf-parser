import { LocalXMLFileAdaptor } from '../adaptors/secondary/LocalXMLFileAdaptor';
import { MECParser } from '../MMCMECParser';

describe('MECParser', () => {
  interface TestParametersParseMEC {
    pathToXml: string,
  }

  const testParseMEC = async ({ pathToXml }: TestParametersParseMEC) => {
    const fileAdaptor = new LocalXMLFileAdaptor();
    const mecParser = new MECParser({ fileAdaptor });
    const tmp = await mecParser.convert(await mecParser.parse(pathToXml));
    expect(tmp).toEqual(mecParser.mecFile);
  };

  it('Test Parse MEC Function', async () => {
    const exampleXML = './src/MMCMECParser/__tests__/assets/movielabs/fullMEC.xml';

    await testParseMEC({
      pathToXml: exampleXML,
    });
  });
});
