
import { lifePathNumbers } from "./MapDataLocales/lifePathNumbers";

export type GeneralItemType = {
    index: number;
    description: string | null;
    title: string;
    style: string;
}

export const typeLifePathNumbersStrings = [
    "overview",
    "destiny",
    "purposeOfLife",
    "optimalDevelopmentConditions",
    "outstandingCharacteristics",
    "developmentRecommendations",
    "suitableCareers",
    "negativeTendenciesToOvercome",
    "summary",
];

const getLifePathByLocales = (locale: string, keyNumber: number): Map<string, GeneralItemType> | null => {
    const localeData = lifePathNumbers.get(locale);
    if (!localeData) {
        return null;
    }
    const map_KeyNumber_Info = new Map<string, GeneralItemType>();

    typeLifePathNumbersStrings.map((type, index) => {
        const dataMap = localeData[`${type}_map`];
        const item = {
            title: `${type}_title`,
            description: dataMap.get(keyNumber),
            style: "text-blue-500",
            index: index + 1
        };

        map_KeyNumber_Info.set(type, item);
    });

    return map_KeyNumber_Info
}

export function getLifePathNumber(locale: string, keyNumber: number) {
    const lifePaths = getLifePathByLocales(locale, keyNumber);

    if (!lifePaths) {
        return null;
    }

    const general = {
        destiny: lifePaths.get('destiny') || null,
        overview: lifePaths.get('overview') || null,
        purposeOfLife: lifePaths.get('purposeOfLife') || null,
        optimalDevelopmentConditions: lifePaths.get('optimalDevelopmentConditions') || null,
        outstandingCharacteristics: lifePaths.get('outstandingCharacteristics') || null,
        developmentRecommendations: lifePaths.get('developmentRecommendations') || null,
        suitableCareers: lifePaths.get('suitableCareers') || null,
        negativeTendenciesToOvercome: lifePaths.get('negativeTendenciesToOvercome') || null,
        summary: lifePaths.get('summary') || null,
    }

    return {
        general,
    }
}