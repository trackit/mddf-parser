import { MECInterface } from '../MEC/MECInterface';
import { MMCInterface } from '../MMC/MMCInterface';
import { expectedMEC } from './ExpectedValues/MECInterface';
import { expectedMMC } from './ExpectedValues/MMCInterface';
import { LocalXMLFileAdaptor } from '../adaptors/secondary/LocalXMLFileAdaptor';
import { MMCParser, MECParser} from '../MMCMECParser';

describe('MMCMECParser', () => {
  interface TestParametersParseMEC {
    pathToXml: string,
    expected: {
      returnValue: MECInterface,
    }
  }

  interface TestParametersParseMMC {
    pathToXml: string,
    expected: {
      returnValue: MMCInterface,
    }
  }

  const testParseMEC = async ({ pathToXml, expected }: TestParametersParseMEC) => {
    const fileAdaptor = new LocalXMLFileAdaptor();
    const mecParser = new MECParser({ fileAdaptor });
    expect(await mecParser.parse(pathToXml)).toEqual(expected.returnValue);
  };

  const testParseMMC = async ({ pathToXml, expected }: TestParametersParseMMC) => {
    const fileAdaptor = new LocalXMLFileAdaptor();
    const mmcParser = new MMCParser({ fileAdaptor });
    expect(await mmcParser.parse(pathToXml)).toEqual(expected.returnValue);
  };

  it('Test Parse MEC Function', async () => {
    const exampleXML = './assets/movielabs/moviefullMEC.xml';

    await testParseMEC({
      pathToXml: exampleXML,
      expected: {
        returnValue: expectedMEC,
      },
    });
  });

  it('Test MMC Function', async () => {
    const exampleXML = './assets/movielabs/fullMMC.xml';

    await testParseMMC({
      pathToXml: exampleXML,
      expected: {
        returnValue: expectedMMC,
      },
    });
  });
});
