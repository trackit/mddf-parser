export function MECChecker(data: string): boolean {
  const mecSubstring = 'http://www.movielabs.com/schema/mdmec/';

  if (data.includes(mecSubstring)) {
    return true;
  }
  return false;
}
