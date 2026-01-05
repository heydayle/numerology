import { nameNumbersMeanings, characterNumberMeanings } from "./MapDataLocales/nameNumbersMeaning";

export function getNameMeanings(locale: string, nameNumber: number): string | null {
    const localeMap = nameNumbersMeanings.get(locale);
    if (!localeMap) {
        return null;
    }

    return localeMap.get(nameNumber) || null;
}

export function getCharacterMeanings(locale: string, nameNumber: number): string | null {
    const localeMap = characterNumberMeanings.get(locale);
    if (!localeMap) {
        return null;
    }

    return localeMap.get(nameNumber) || null;
}