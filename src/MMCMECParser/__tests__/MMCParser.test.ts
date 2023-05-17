import { MMCInterface } from '../MMC/MMCInterface';
import { expectedMMC } from './ExpectedValues/MMCInterface';
import { LocalXMLFileAdaptor } from '../adaptors/secondary/LocalXMLFileAdaptor';
import { MMCParser } from '../MMCMECParser';

describe('MMCMECParser', () => {
  interface TestParametersParseMMC {
    pathToXml: string,
    expected: {
      returnValue: MMCInterface,
    }
  }

  const testParseMMC = async ({ pathToXml, expected }: TestParametersParseMMC) => {
    const fileAdaptor = new LocalXMLFileAdaptor();
    const mmcParser = new MMCParser({ fileAdaptor });
    expect(await mmcParser.parse(pathToXml)).toEqual(expected.returnValue);
  };

  it('Test MMC Function', async () => {
    const exampleXML = './src/MMCMECParser/__tests__/assets/movielabs/fullMMC.xml';

    await testParseMMC({
      pathToXml: exampleXML,
      expected: {
        returnValue: expectedMMC,
      },
    });
  });
});
