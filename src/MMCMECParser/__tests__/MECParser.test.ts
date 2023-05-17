import { MECInterface } from '../MEC/MECInterface';
import { expectedMEC } from './ExpectedValues/MECInterface';
import { LocalXMLFileAdaptor } from '../adaptors/secondary/LocalXMLFileAdaptor';
import { MECParser } from '../MMCMECParser';

describe('MECParser', () => {
  interface TestParametersParseMEC {
    pathToXml: string,
    expected: {
      returnValue: MECInterface,
    }
  }

  const testParseMEC = async ({ pathToXml, expected }: TestParametersParseMEC) => {
    const fileAdaptor = new LocalXMLFileAdaptor();
    const mecParser = new MECParser({ fileAdaptor });
    expect(await mecParser.parse(pathToXml)).toEqual(expected.returnValue);
  };

  it('Test Parse MEC Function', async () => {
    const exampleXML = './src/MMCMECParser/__tests__/assets/movielabs/fullMEC.xml';

    await testParseMEC({
      pathToXml: exampleXML,
      expected: {
        returnValue: expectedMEC,
      },
    });
  });
});
