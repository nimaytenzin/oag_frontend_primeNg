const PUBLICSTATE_CURRENTLEGISLATIONALPHABETKEY =
    'Public_currentlegislationAlphaSelection';

export function SetPublicCurrentLegislationAlphabet(alphabet: string) {
    sessionStorage.setItem(PUBLICSTATE_CURRENTLEGISLATIONALPHABETKEY, alphabet);
}

export function GetPublicCurrentLegislationAlphabet() {
    return sessionStorage.getItem(PUBLICSTATE_CURRENTLEGISLATIONALPHABETKEY);
}

// DRAFT DELEGATED LEGISALTION LIST
const ADMIN_DRAFT_DELEGATEDLEGISLATION_ALPHABET_KEY =
    'Admin_Draft_Delegated_Legisaltion_Alphabet_key';

export function SetAdminDraftDelegatedLegisaltionAlphaSelection(
    alphabet: string
) {
    sessionStorage.setItem(
        ADMIN_DRAFT_DELEGATEDLEGISLATION_ALPHABET_KEY,
        alphabet
    );
}

export function GetAdminDraftDelegatedLegislationAlphaSelection() {
    return sessionStorage.getItem(
        ADMIN_DRAFT_DELEGATEDLEGISLATION_ALPHABET_KEY
    );
}

//DRAFT LEGISLATION LIST
const ADMIN_DRAFT_LEGISLATION_ALPHABET_KEY =
    'Admin_Draft_Legisaltion_Alphabet_key';

export function SetAdminDraftLegisaltionAlphaSelection(alphabet: string) {
    sessionStorage.setItem(ADMIN_DRAFT_LEGISLATION_ALPHABET_KEY, alphabet);
}

export function GetAdminDraftLegislationAlphaSelection() {
    return sessionStorage.getItem(ADMIN_DRAFT_LEGISLATION_ALPHABET_KEY);
}

//DRAFT Convention LIST
const ADMIN_DRAFT_CONVENTION_ALPHABET_KEY =
    'Admin_Draft_Convention_Alphabet_key';

export function SetAdminDraftConventionAlphaSelection(alphabet: string) {
    sessionStorage.setItem(ADMIN_DRAFT_CONVENTION_ALPHABET_KEY, alphabet);
}

export function GetAdminDraftConventionAlphaSelection() {
    return sessionStorage.getItem(ADMIN_DRAFT_CONVENTION_ALPHABET_KEY);
}

//PUBLISHED CURRENT LEGISLATION LIST
const ADMIN_PUBLISHED_CURRENT_LEGISLATION_ALPHABET_KEY =
    'Admin_Published_Current_Legislation_Alphabet_key';

export function SetAdminPublishedCurrentLegialtionAlphaSelection(
    alphabet: string
) {
    sessionStorage.setItem(
        ADMIN_PUBLISHED_CURRENT_LEGISLATION_ALPHABET_KEY,
        alphabet
    );
}

export function GetAdminPublishedCurrentLegislationAlphaSelection() {
    return sessionStorage.getItem(
        ADMIN_PUBLISHED_CURRENT_LEGISLATION_ALPHABET_KEY
    );
}

//PUBLISHED BILL LEGISLATION LIST
const ADMIN_PUBLISHED_BILL_LEGISLATION_ALPHABET_KEY =
    'Admin_Published_Bill_Legislation_Alphabet_key';

export function SetAdminPublishedBillLegialtionAlphaSelection(
    alphabet: string
) {
    sessionStorage.setItem(
        ADMIN_PUBLISHED_BILL_LEGISLATION_ALPHABET_KEY,
        alphabet
    );
}

export function GetAdminPublishedBillLegislationAlphaSelection() {
    return sessionStorage.getItem(
        ADMIN_PUBLISHED_BILL_LEGISLATION_ALPHABET_KEY
    );
}

//PUBLISHED REPEALED LEGISLATION LIST
const ADMIN_PUBLISHED_REPEALED_LEGISLATION_ALPHABET_KEY =
    'Admin_Published_Repealed_Legislation_Alphabet_key';

export function SetAdminPublishedRepealedLegialtionAlphaSelection(
    alphabet: string
) {
    sessionStorage.setItem(
        ADMIN_PUBLISHED_REPEALED_LEGISLATION_ALPHABET_KEY,
        alphabet
    );
}

export function GetAdminPublishedRepealedLegislationAlphaSelection() {
    return sessionStorage.getItem(
        ADMIN_PUBLISHED_REPEALED_LEGISLATION_ALPHABET_KEY
    );
}

//PUBLISHED CURRENT DELEGATED LEGISLATION LIST
const ADMIN_PUBLISHED_CURRENT_DELEGATED_LEGISLATION_ALPHABET_KEY =
    'Admin_Published_Current_Delegted_Legislation_Alphabet_key';

export function SetAdminPublishedCurrentDelegatedLegialtionAlphaSelection(
    alphabet: string
) {
    sessionStorage.setItem(
        ADMIN_PUBLISHED_CURRENT_DELEGATED_LEGISLATION_ALPHABET_KEY,
        alphabet
    );
}
