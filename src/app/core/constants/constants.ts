export const API_URL = 'http://localhost:3002';
export const COMPANY_NAME = 'Depository of Law';
export const ZHICHAR_API_URL = 'https://zhichar.bt/dev';

export const ALPHABETARRAY = [
    '#',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
];

export const ROWSPERPAGEOPTION = [10, 20, 50, 100];

export interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}
