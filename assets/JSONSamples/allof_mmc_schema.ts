export function generateAllOfJSON(): Record<string, unknown> {
  return {
    ManifestSourceLicensor: {
      DisplayName: 'Example DisplayName',
      SortName: 'Example SortName',
      AlternateName: ['Example AlternateName1', 'Example AlternateName2'],
      organizationID: 'Example organizationID',
      departmentID: 'Example departmentID',
      idType: 'Example idType',
      ALID: ['Example ALID1', 123, true, null, { subObject: 'Example subObject' }, ['Example ALID2', 456]],
    },
    OrgName: {
      DisplayName: 'Example DisplayName',
      SortName: 'Example SortName',
      AlternateName: ['Example AlternateName1', 'Example AlternateName2'],
      organizationID: 'Example organizationID',
      departmentID: 'Example departmentID',
      idType: 'Example idType',
    },
  };
}
