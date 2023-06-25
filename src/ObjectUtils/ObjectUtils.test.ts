import generateLibrary from '../../assets/RawJSONSamples/library';
import ObjectUtils from './ObjectUtils';
import { ObjectPath } from '../ObjectPath';

describe('ObjectUtils', () => {
  describe('getDeepProperty', () => {
    const charkey = 'Value';

    const rawLibrary = generateLibrary(charkey);

    it('should return the title of the first book', () => {
      const objectUtils = new ObjectUtils();

      const path: ObjectPath = [
        { propertyName: 'library' },
        { propertyName: 'book', arrayIndex: 0 },
        { propertyName: 'title' },
        { propertyName: charkey },
      ];
      const title = objectUtils.getDeepProperty(rawLibrary, path);

      expect(title).toEqual('To Kill a Mockingbird');
    });

    it('should return the title of the second book', () => {
      const objectUtils = new ObjectUtils();

      const path: ObjectPath = [
        { propertyName: 'library' },
        { propertyName: 'book', arrayIndex: 1 },
        { propertyName: 'title' },
        { propertyName: charkey },
      ];
      const title = objectUtils.getDeepProperty(rawLibrary, path);

      expect(title).toEqual(1984);
    });

    it('should return the second review of the first book', () => {
      const objectUtils = new ObjectUtils();

      const path: ObjectPath = [
        { propertyName: 'library' },
        { propertyName: 'book', arrayIndex: 0 },
        { propertyName: 'reviews' },
        { propertyName: 'review', arrayIndex: 1 },
      ];

      const review = objectUtils.getDeepProperty(rawLibrary, path);

      expect(review).toEqual({
        text: { [charkey]: 'A compelling and timeless piece of literature.' },
        rating: { [charkey]: 4.5 },
      });
    });
  });
});
