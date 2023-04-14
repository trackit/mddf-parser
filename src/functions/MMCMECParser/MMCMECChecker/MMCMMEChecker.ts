export function MMCChecker(data: string): boolean {
    const mmcManifest = 'http://www.movielabs.com/schema/manifest/';

    if (data.includes(mmcManifest)) {
        return true;
    }
    return false;
}

export function MECChecker(data: string): boolean {
    const mecSubstring = 'http://www.movielabs.com/schema/mdmec/';

    if (data.includes(mecSubstring)) {
        return true;
    }
    return false;
}