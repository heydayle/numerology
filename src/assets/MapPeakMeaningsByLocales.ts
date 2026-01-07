import { peakMeanings } from "./MapDataLocales/peakMeanings";

export function getPeakMeaningsByPeakNumber(locale: string): Map<number, string> | null {
    const localeMap = peakMeanings.get(locale);
    if (!localeMap) {
        return null;
    }

    return localeMap || null;
}

export function getPeaksByPeakNumbers(locale: string, peakNumbers: number[]): { title: number, description: string | number | undefined }[] | [] {
    let peaksByNumbers = [] as { title: number, description: string | number | undefined }[]
    const peakMeanings = getPeakMeaningsByPeakNumber(locale)

    if (!peakMeanings) return []

    peakNumbers.forEach(number => {
        peaksByNumbers.push({
            title: number,
            description: peakMeanings.get(number)
        })
    })

    return peaksByNumbers
}