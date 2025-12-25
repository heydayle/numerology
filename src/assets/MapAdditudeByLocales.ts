import { mapAdditudeMeanings } from "./MapDataLocales/additudeMeanings";

export function getAdditudeMeaning(locale: string, additudeNumber: number): string | null {
    const localeMap = mapAdditudeMeanings.get(locale);
    if (!localeMap) {
        return null;
    }

    return localeMap.get(additudeNumber) || null;
}