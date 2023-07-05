import { LocalFileAdaptor } from '../FileAdaptor/LocalFileAdaptor';
import SchemaUtils from './SchemaUtils';

describe('SchemaUtils', () => {
  const getLibrarySchema = async () => {
    const fileReader = new LocalFileAdaptor();
    return JSON.parse(await fileReader.readFile('assets/JSONSchemaSamples/library.json'));
  };

  describe('accessDefinition', () => {
    it('should return the library definition', async () => {
      const librarySchema = await getLibrarySchema();

      const schemaUtils = new SchemaUtils();

      expect(schemaUtils.accessDefinition(librarySchema, [
        { propertyName: 'library' },
      ])).toEqual({
        type: 'object',
        required: ['book'],
        properties: {
          book: {
            type: 'array',
            items: { $ref: '#/definitions/library.book' },
            minItems: 1,
          },
        },
      });
    });

    it('it should return the nested book array definition', async () => {
      const librarySchema = await getLibrarySchema();

      const schemaUtils = new SchemaUtils();

      expect(schemaUtils.accessDefinition(librarySchema, [
        { propertyName: 'library' },
        { propertyName: 'book' },
      ])).toEqual({
        type: 'array',
        items: {
          type: 'object',
          required: [
            'title',
            'author',
            'reviews',
          ],
          properties: {
            title: { type: 'string' },
            author: { type: 'string' },
            reviews: { $ref: '#/definitions/library.book.reviews' },
          },
        },
      });
    });

    it('it should return the nested book array item definition', async () => {
      const librarySchema = await getLibrarySchema();

      const schemaUtils = new SchemaUtils();

      expect(schemaUtils.accessDefinition(librarySchema, [
        { propertyName: 'library' },
        { propertyName: 'book', arrayIndex: 0 },
      ])).toEqual({
        type: 'object',
        required: [
          'title',
          'author',
          'reviews',
        ],
        properties: {
          title: { type: 'string' },
          author: { type: 'string' },
          reviews: { $ref: '#/definitions/library.book.reviews' },
        },
      });
    });

    it('it should return the nested book reviews definition', async () => {
      const librarySchema = await getLibrarySchema();

      const schemaUtils = new SchemaUtils();

      expect(schemaUtils.accessDefinition(librarySchema, [
        { propertyName: 'library' },
        { propertyName: 'book' },
        { propertyName: 'reviews' },
      ])).toEqual({
        type: 'object',
        required: ['review'],
        properties: {
          review: {
            type: 'array',
            items: { $ref: '#/definitions/library.book.reviews.review' },
            minItems: 1,
          },
        },
      });
    });

    it('should return deeply nested book review text definition', async () => {
      const librarySchema = await getLibrarySchema();

      const schemaUtils = new SchemaUtils();

      expect(schemaUtils.accessDefinition(librarySchema, [
        { propertyName: 'library' },
        { propertyName: 'book' },
        { propertyName: 'reviews' },
        { propertyName: 'review' },
        { propertyName: 'text' },
      ])).toEqual({
        type: 'string',
      });
    });
  });

  it('should return deeply nested book review array definition', async () => {
    const librarySchema = await getLibrarySchema();

    const schemaUtils = new SchemaUtils();

    expect(schemaUtils.accessDefinition(librarySchema, [
      { propertyName: 'library' },
      { propertyName: 'book' },
      { propertyName: 'reviews' },
      { propertyName: 'review' },
    ])).toEqual({
      type: 'array',
      items: {
        type: 'object',
        required: [
          'text',
          'rating',
        ],
        properties: {
          text: { type: 'string' },
          rating: { type: 'number' },
        },
      },
    });
  });

  it('should return deeply nested book review array item definition', async () => {
    const librarySchema = await getLibrarySchema();

    const schemaUtils = new SchemaUtils();

    expect(schemaUtils.accessDefinition(librarySchema, [
      { propertyName: 'library' },
      { propertyName: 'book' },
      { propertyName: 'reviews' },
      { propertyName: 'review', arrayIndex: 0 },
    ])).toEqual({
      type: 'object',
      required: [
        'text',
        'rating',
      ],
      properties: {
        text: { type: 'string' },
        rating: { type: 'number' },
      },
    });
  });

  describe('getDefinition', () => {
    it('should return the definition', async () => {
      const librarySchema = await getLibrarySchema();

      const conformer = new SchemaUtils();

      expect(conformer.getDefinition(librarySchema, '#/definitions/library.book')).toEqual({
        type: 'object',
        required: [
          'title',
          'author',
          'reviews',
        ],
        properties: {
          title: { type: 'string' },
          author: { type: 'string' },
          reviews: { $ref: '#/definitions/library.book.reviews' },
        },
      });
    });
  });
});
