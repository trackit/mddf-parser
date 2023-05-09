export function MMCChecker(data: string): boolean {
  const mmcManifest = 'http://www.movielabs.com/schema/manifest/';

  if (data.includes(mmcManifest)) {
    return true;
  }
  return false;
}
