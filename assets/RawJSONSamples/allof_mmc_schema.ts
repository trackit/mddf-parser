export function generateAllOfRawJSON(charKey: string): Record<string, unknown> {
  return {
    ManifestSourceLicensor: {
      DisplayName: { [charKey]: 'Example DisplayName' },
      SortName: { [charKey]: 'Example SortName' },
      AlternateName: [{ [charKey]: 'Example AlternateName1' }, { [charKey]: 'Example AlternateName2' }],
      organizationID: 'Example organizationID',
      departmentID: 'Example departmentID',
      idType: 'Example idType',
      ALID: [
        { [charKey]: 'Example ALID1' },
        123,
        true,
        null,
        { subObject: { [charKey]: 'Example subObject' } },
        [{ [charKey]: 'Example ALID2' }, 456],
      ],
    },
    OrgName: {
      DisplayName: { [charKey]: 'Example DisplayName' },
      SortName: { [charKey]: 'Example SortName' },
      AlternateName: [{ [charKey]: 'Example AlternateName1' }, { [charKey]: 'Example AlternateName2' }],
      organizationID: 'Example organizationID',
      departmentID: 'Example departmentID',
      idType: 'Example idType',
    },
  };
}
