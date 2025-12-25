import { mapBirthdayMeanings } from "./MapDataLocales/birthdayMeanings";

export function getBirthdayMeaning(locale: string, birthdayNumber: number): string | null {
    const localeMap = mapBirthdayMeanings.get(locale);
    if (!localeMap) {
        return null;
    }

    return localeMap.get(birthdayNumber) || null;
}