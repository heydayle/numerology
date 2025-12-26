import { mapBirthdayChartMeanings } from "./MapDataLocales/birthdayChartMeaning";

const getAnalysisByChart = (meaningMap: Map<string,string>, chart: Record<string, string>): Record<string, Record<string, string>> => {
    const chartMeanings = {} as Record<string, Record<string, string>>

    for (const [key, value] of Object.entries(chart)) {
        chartMeanings[key] = { description: meaningMap.get(value) || "", value: value }
    }
    return chartMeanings
}

export function getBirthdayChartMeaning(locale: string, chart: Record<string, string>): Record<string, Record<string, string>> | null {
    const localeMap = mapBirthdayChartMeanings.get(locale);
    if (!localeMap) {
        return null;
    }

    const analysisByChart = getAnalysisByChart(localeMap, chart)

    return analysisByChart || null;
}