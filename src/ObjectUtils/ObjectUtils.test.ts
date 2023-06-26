import generateLibrary from '../../assets/RawJSONSamples/library';
import ObjectUtils from './ObjectUtils';
import { ObjectPath } from '../ObjectPath/ObjectPath';

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

  describe('setDeepProperty', () => {
    it('should set the title of the first book', () => {
      const objectUtils = new ObjectUtils();
      const rawLibrary = generateLibrary('Value');

      const path: ObjectPath = [
        { propertyName: 'library' },
        { propertyName: 'book', arrayIndex: 0 },
        { propertyName: 'title' },
        { propertyName: 'Value' },
      ];

      objectUtils.setDeepProperty(rawLibrary, path, 'New Book Title');

      const title = objectUtils.getDeepProperty(rawLibrary, path);
      expect(title).toEqual('New Book Title');
    });

    it('should set the rating of the second review of the first book', () => {
      const objectUtils = new ObjectUtils();
      const rawLibrary = generateLibrary('Value');

      const path: ObjectPath = [
        { propertyName: 'library' },
        { propertyName: 'book', arrayIndex: 0 },
        { propertyName: 'reviews' },
        { propertyName: 'review', arrayIndex: 1 },
        { propertyName: 'rating' },
        { propertyName: 'Value' },
      ];

      objectUtils.setDeepProperty(rawLibrary, path, 5);

      const rating = objectUtils.getDeepProperty(rawLibrary, path);
      expect(rating).toEqual(5);
    });

    it('should set the author of the second book', () => {
      const objectUtils = new ObjectUtils();
      const rawLibrary = generateLibrary('Value');

      const path: ObjectPath = [
        { propertyName: 'library' },
        { propertyName: 'book', arrayIndex: 1 },
        { propertyName: 'author' },
        { propertyName: 'Value' },
      ];

      objectUtils.setDeepProperty(rawLibrary, path, 'New Author');

      const author = objectUtils.getDeepProperty(rawLibrary, path);
      expect(author).toEqual('New Author');
    });
  });
});
