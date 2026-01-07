import { challengeMeanings } from "./MapDataLocales/challengeMeanings";

export function getchallengeMeaningsByChallengeNumber(locale: string): Map<number, string> | null {
    const localeMap = challengeMeanings.get(locale);
    if (!localeMap) {
        return null;
    }

    return localeMap || null;
}

export function getChallengesByChallengeNumbers(locale: string, challengeNumbers: number[]): { title: number, description: string | number | undefined }[] | [] {
    let challengesByNumbers = [] as { title: number, description: string | number | undefined }[]
    const challengeMeanings = getchallengeMeaningsByChallengeNumber(locale)

    if (!challengeMeanings) return []

    challengeNumbers.forEach(number => {
        challengesByNumbers.push({
            title: number,
            description: challengeMeanings.get(number)
        })
    })

    return challengesByNumbers
}