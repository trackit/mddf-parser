import { XsdUtils } from './XsdUtils';

describe('Add namespace to elements in js object', () => {
  const xsdUtils = new XsdUtils;

  ////////////////////////
  //     Basic Test     //
  ////////////////////////
  describe('Basic Test', () => {
    var testXsd: Record<string, unknown> = {
      'xs:schema': {
        'xmlns:xs': 'http://www.w3.org/2001/XMLSchema',
        'xf:element': {
          'name': 'library',
          'xs:complexType': {
            'xs:sequence': {
              'xs:element': [
                {
                  'name': 'book',
                  'type': 'xs:string'
                },
                {
                  'name': 'item',
                  'type': 'xs:string'
                }
              ]
            }
          }
        },
      },
    }
    var testObject: Record<string, unknown> = {
      'library': {
        'item': 'Sample Item',
        'book': 'Book Item'
      },
    }
    var expectedObject: Record<string, unknown> = {
      'xf:library': {
        'xs:item': 'Sample Item',
        'xs:book': 'Book Item'
      },
    }
    it('it should add xsd namespace before all elements in object', async () => {
      var newObject: Record<string, unknown> = xsdUtils.addNamespaceToElementInObject(testObject, [], testXsd);
      //console.log(newObject);

      expect(newObject).toEqual(expectedObject);
    })
  });




  ////////////////////////
  //     Medium Test    //
  ////////////////////////
  describe('Medium Test', () => {
    var testXsd: Record<string, unknown> = {
      'xs:schema': {
        'xmlns:xs': 'http://www.w3.org/2001/XMLSchema',
        'xf:element': {
          'name': 'sample5',
          'xs:complexType': {
            'xs:sequence': {
              'xs:element': [
                {
                  'name': 'book',
                  'type': 'xs:string'
                },
                {
                  'name': 'item',
                  'type': 'xs:string'
                }
              ]
            }
          }
        },
        'xd:element': {
          'name': 'sample2',
          'xd:complexType': {
            'xc:element': {
              'name': 'sample5',
              'xs:complexType': {
                'xs:sequence': {
                  'xs:element': [
                    {
                      'name': 'book',
                      'type': 'xs:string'
                    },
                    {
                      'name': 'item',
                      'type': 'xs:string'
                    }
                  ]
                }
              }
            }
          }
        },
        'xy:element': {
          'name': 'sample4',
          'xs:complexType': {
            'xs:sequence': {
              'xs:element': [
                {
                  'name': 'book',
                  'type': 'xs:string'
                },
                {
                  'name': 'item',
                  'type': 'xs:string'
                }
              ],
              'xx:element': {
                'name': 'sample5',
                'xs:complexType': {
                  'xs:sequence': {
                    'xs:element': [
                      {
                        'name': 'book',
                        'type': 'xs:string'
                      },
                      {
                        'name': 'item',
                        'type': 'xs:string'
                      }
                    ]
                  }
                }
              }
            }
          }
        }
      }
    }
    var testObject: Record<string, unknown> = {
      'sample5': {
        'item': 'Sample Item',
        'book': 'Book Item'
      },
      'sample2': {
        'sample5': {
          'item': 'Sample Item',
          'book': 'Book Item'
        }
      },
      'sample4': {
        'item': 'Sample Item',
        'book': 'Book Item',
        'sample5': {
          'item': 'Sample Item',
          'book': 'Book Item'
        }
      }
    }
    var expectedObject: Record<string, unknown> = {
      'xf:sample5': {
        'xs:item': 'Sample Item',
        'xs:book': 'Book Item'
      },
      'xd:sample2': {
        'xc:sample5': {
          'xs:item': 'Sample Item',
          'xs:book': 'Book Item'
        }
      },
      'xy:sample4': {
        'xs:item': 'Sample Item',
        'xs:book': 'Book Item',
        'xx:sample5': {
          'xs:item': 'Sample Item',
          'xs:book': 'Book Item'
        }
      }
    }
    it('it should add xsd namespace before all elements in object', async () => {
      var newObject: Record<string, unknown> = xsdUtils.addNamespaceToElementInObject(testObject, [], testXsd);
      console.log(newObject);

      expect(newObject).toEqual(expectedObject);
    })
  });
});
