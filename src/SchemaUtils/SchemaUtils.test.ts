import { LocalFileAdaptor } from '../FileAdaptor/LocalFileAdaptor';
import SchemaUtils from './SchemaUtils';

const fileReader = new LocalFileAdaptor();
describe('SchemaUtils', () => {
  const getLibrarySchema = async () => JSON.parse(await fileReader.readFile('assets/JSONSchemaSamples/library.json'));

  const getAllOfMMCSchema = async () => JSON.parse(await fileReader.readFile('assets/JSONSchemaSamples/allof_mmc_schema.json'));

  const getPropertiesAndDefinitionsSchema = async () => JSON.parse(
    await fileReader.readFile('assets/JSONSchemaSamples/properties_and_definitions_with_different_name.json'),
  );

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

  it('should return all properties defined in all of', async () => {
    const allOfMMCSchema = await getAllOfMMCSchema();

    const schemaUtils = new SchemaUtils();

    expect(schemaUtils.accessDefinition(allOfMMCSchema, [{ propertyName: 'ManifestSourceLicensortype' }])).toEqual({
      type: 'object',
      required: ['DisplayName'],
      properties: {
        DisplayName: { type: 'string' },
        SortName: { type: 'string' },
        AlternateName: {
          type: 'array',
          items: { type: 'string' },
          minItems: 0,
        },
        organizationID: { type: 'string' },
        departmentID: { type: 'string' },
        idType: { type: 'string' },
        ALID: {
          type: 'array',
          items: {
            type: [
              'string',
              'number',
              'integer',
              'boolean',
              'null',
              'object',
              'array',
            ],
          },
          minItems: 0,
        },
      },
    });
  });

  it('should return correct schema and not undefined if properties and definitions dont have the same name', async () => {
    const schema = await getPropertiesAndDefinitionsSchema();

    const schemaUtils = new SchemaUtils();

    expect(schemaUtils.accessDefinition(schema, [{ propertyName: 'studentType' }])).toEqual({
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
    });

    expect(schemaUtils.accessDefinition(schema, [{ propertyName: 'teacherType' }])).toEqual({
      type: 'object',
      properties: {
        subject: { type: 'string' },
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
