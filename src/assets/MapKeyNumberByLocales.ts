
import { KeyNumbersMap } from "./MapDataLocales/keyNumbers";
type GetInforByLocalesType  = {
    index: number;
    data: Map<number, string>;
    title: string;
    style: string;
}
type GeneralItemType = {
    index: number;
    description: string | null;
    title: string;
    style: string;
}

export const typeKeyNumbersStrings = [
    "destiny",
    "overview",
    "purposeOfLife",
    "optimalDevelopmentConditions",
    "outstandingCharacteristics",
    "developmentRecommendations",
    "suitableCareers",
    "negativeTendenciesToOvercome",
    "summary",
];

const getInforByLocales = (locale: string): Map<string, GetInforByLocalesType> | null => {
    const localeData = KeyNumbersMap.get(locale);
    if (!localeData) {
        return null;
    }
    const map_KeyNumber_Info = new Map<string, { data: Map<number, string>, title: string, index: number, style: string }>();

    typeKeyNumbersStrings.map((type, index) => {
        const dataMap = localeData[`${locale}_${type}_map`];
        const item = {
            title: `${type}_title`,
            data: dataMap,
            style: "text-blue-500",
            index: index + 1
        };

        map_KeyNumber_Info.set(type, item);
    });

    return map_KeyNumber_Info
}

const getInforByType = (type: string, locale: string, keyNumber: number): GeneralItemType | null => {
    const keyNumberInfor = getInforByLocales(locale);
    if (!keyNumberInfor) {
        return null;
    }
    return {
        title: keyNumberInfor.get(type)?.title || '',
        style: keyNumberInfor.get(type)?.style || '',
        index: keyNumberInfor.get(type)?.index || 0,
        description: keyNumberInfor.get(type)?.data.get(keyNumber) || null,
    }
}

export function getKeyNumberInfo(locale: string, keyNumber: number) {
    const keyNumberInfor = getInforByLocales(locale);

    if (!keyNumberInfor) {
        return null;
    }

    const general = {
        destiny: getInforByType('destiny', locale, keyNumber) || null,
        overview: getInforByType('overview', locale, keyNumber) || null,
        purposeOfLife: getInforByType('purposeOfLife', locale, keyNumber) || null,
        optimalDevelopmentConditions: getInforByType('optimalDevelopmentConditions', locale, keyNumber) || null,
        outstandingCharacteristics: getInforByType('outstandingCharacteristics', locale, keyNumber) || null,
        developmentRecommendations: getInforByType('developmentRecommendations', locale, keyNumber) || null,
        suitableCareers: getInforByType('suitableCareers', locale, keyNumber) || null,
        negativeTendenciesToOvercome: getInforByType('negativeTendenciesToOvercome', locale, keyNumber) || null,
        summary: getInforByType('summary', locale, keyNumber) || null,
    }

    return {
        general,
    }
}