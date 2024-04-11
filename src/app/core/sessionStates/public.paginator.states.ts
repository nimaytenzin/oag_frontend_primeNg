const PUBLICSTATE_CURRENTLEGISLATIONALPHABETKEY =
    'Public_currentlegislationAlphaSelection';

export function SetPublicCurrentLegislationAlphabet(alphabet: string) {
    sessionStorage.setItem(PUBLICSTATE_CURRENTLEGISLATIONALPHABETKEY, alphabet);
}

export function GetPublicCurrentLegislationAlphabet() {
    return sessionStorage.getItem(PUBLICSTATE_CURRENTLEGISLATIONALPHABETKEY);
}
