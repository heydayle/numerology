import { cycleNineYears, cycleYearMeanings } from "./MapDataLocales/cycleYearMeanings";

export function getCycleMeanings(locale: string): Map<number, string> | null {
    const localeCycleMeaningsMap = cycleYearMeanings.get(locale);
    if (!localeCycleMeaningsMap) {
        return null;
    }
    return localeCycleMeaningsMap;
}
export function getCycleDate(locale: string) {
    const localeCycleDate = cycleNineYears.get(locale)
    if (!localeCycleDate)
        return null;
    return localeCycleDate
}

export function getCycleDateAndMeanings(locale: string, cycleNumber: number): {
    from: string
    to: string
    description: string
    year: number
    cycle: number
}[] {
    const localeCycleDate = getCycleDate(locale)
    const localeCycleMeanings = getCycleMeanings(locale)

    const currentYear = new Date().getFullYear()
    const threeYears = [currentYear - 1, currentYear, currentYear + 1]
    const threeValues = [cycleNumber - 1, cycleNumber >= 10 ? 1 : cycleNumber, (cycleNumber + 1) >= 10 ? 1 : (cycleNumber + 1)]
    const cycles = threeValues.map((item, index) => {
        const { from, to } = localeCycleDate?.get(item)
        const description = localeCycleMeanings?.get(item) || ''
        return {
            cycle: item,
            from,
            to,
            description,
            year: threeYears[index] as number
        }
    })
    return cycles
}