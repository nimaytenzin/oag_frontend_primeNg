import { LanguageType, SectionType } from '../constants/enums';

export function GetSectionStylesPublic(type: string, language: string) {
    if (language === LanguageType.ENG) {
        switch (type) {
            case SectionType.HEADING_1:
                return 'heading font-serif  text-5xl font-bold text-center   text-secondary-700';
            case SectionType.HEADING_2:
                return 'heading font-serif text-3xl font-bold text-center text-secondary-700';
            case SectionType.HEADING_3:
                return 'heading font-serif text-3xl font-bold text-center   text-secondary-700';
            case SectionType.SUBSECTION_H1:
                return 'heading font-serif text-3xl font-bold text-left  mt-1 text-secondary-700';
            case SectionType.SUBSECTION_H2:
                return 'heading font-serif text-2xl font-semibold text-left   text-secondary-700';
            case SectionType.CLAUSE:
                return 'ml-4 font-serif text-2xl text-justify  text-secondary-600 ';
            default:
                return '';
        }
    } else {
        console.log('ok');

        switch (type) {
            case SectionType.HEADING_1:
                return 'heading font-uchen text-5xl font-semibold text-center  mt-3 text-secondary-700';
            case SectionType.HEADING_2:
                return 'heading font-uchen text-3xl font-semibold text-center  text-secondary-700';
            case SectionType.HEADING_3:
                return 'heading font-uchen text-3xl font-semibold text-center   text-secondary-700';
            case SectionType.SUBSECTION_H1:
                return 'heading font-uchen text-3xl font-semibold text-left  mt-1 mb-1 text-secondary-700';
            case SectionType.SUBSECTION_H2:
                return 'heading font-uchen text-2xl font-semibold text-left  text-secondary-700';
            case SectionType.CLAUSE:
                return 'font-uchen text-2xl text-justify  text-secondary-600  ';
            default:
                return '';
        }
    }
}

export function GetSectionStylesAdmin(
    type: string,
    language: string,
    softDelete: boolean
) {
    let styles = '';

    if (softDelete) {
        styles += 'line-through text-red-400 ';
    }
    if (language === LanguageType.ENG) {
        switch (type) {
            case SectionType.HEADING_1:
                styles +=
                    'font-times text-2xl font-semibold text-center  mt-3  text-secondary-700';
                break;
            case SectionType.HEADING_2:
                styles +=
                    'font-times text-2xl font-semibold text-center text-secondary-700';
                break;
            case SectionType.HEADING_3:
                styles +=
                    'font-times text-lg font-semibold text-center   text-secondary-700';
                break;
            case SectionType.SUBSECTION_H1:
                styles +=
                    'font-times text-lg font-bold text-left  mt-1 text-secondary-700';
                break;
            case SectionType.SUBSECTION_H2:
                styles +=
                    'font-times text-base font-semibold text-left   text-secondary-700';
                break;
            case SectionType.CLAUSE:
                styles +=
                    'font-times mt-3 text-md text-justify  text-secondary-600 ';
                break;
            default:
                break;
        }
    } else {
        switch (type) {
            case SectionType.HEADING_1:
                styles +=
                    'font-uchen text-2xl font-semibold text-center  mt-3 text-secondary-700';
                break;
            case SectionType.HEADING_2:
                styles +=
                    'font-uchen text-2xl font-semibold text-center  text-secondary-700';
                break;
            case SectionType.HEADING_3:
                styles +=
                    'font-uchen text-lg font-semibold text-center   text-secondary-700';
                break;
            case SectionType.SUBSECTION_H1:
                styles +=
                    'font-uchen text-lg font-semibold text-left  mt-2 mb-1 text-secondary-700';
                break;
            case SectionType.SUBSECTION_H2:
                styles +=
                    ' font-uchen text-base font-semibold text-left mb-4  text-secondary-700';
                break;
            case SectionType.CLAUSE:
                styles +=
                    'font-uchen text-md text-justify  text-secondary-600 mt-3 ';
                break;
            default:
                break;
        }
    }

    return styles;
}

export function GetTocStylesAdmin(type: string, language: string) {
    if (language === LanguageType.ENG) {
        if (type === SectionType.HEADING_1) {
            return 'font-serif text-xl pl-0 mt-2 font-bold';
        } else if (type === SectionType.HEADING_2) {
            return 'text-xl pl-4 my-1 font-medium';
        } else if (type === SectionType.HEADING_3) {
            return 'pl-8 text-xl';
        } else if (type === SectionType.SUBSECTION_H1) {
            return 'pl-8 ';
        } else if (type === SectionType.SUBSECTION_H2) {
            return 'pl-16';
        }
        return '';
    } else {
        if (type === SectionType.HEADING_1) {
            return 'font-uchen text-xl pl-0 my-2 font-medium';
        } else if (type === SectionType.HEADING_2) {
            return 'font-uchen text-xl pl-4 my-1 font-medium';
        } else if (type === SectionType.HEADING_3) {
            return 'font-uchen text-xl pl-8 ';
        } else if (type === SectionType.SUBSECTION_H1) {
            return 'font-uchen text-xl pl-8 text-sm';
        } else if (type === SectionType.SUBSECTION_H2) {
            return 'font-uchen text-xl pl-12';
        }
        return '';
    }
}
