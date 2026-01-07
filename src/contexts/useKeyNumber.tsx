import { useContext, createContext } from "react";
import { getLifePathNumber } from "@/assets/MapKeyNumberByLocales";
import { getBirthdayMeaning } from "@/assets/MapNumberOfBirthdayByLocales";
import { getAdditudeMeaning } from "@/assets/MapAdditudeByLocales";
import { getNameMeanings, getCharacterMeanings } from "@/assets/MapNumberOfNameByLocales";
import { getPeaksByPeakNumbers } from "@/assets/MapPeakMeaningsByLocales";
import { getChallengesByChallengeNumbers } from "@/assets/MapChallengeMeaningsByLocales";

type GeneralItemType = {
    index: number;
    description: string | null;
    title: string;
    style: string;
}

// Destiny, Overview, Purpose of life, Optimal development conditions,
// Outstanding characteristics, Development recommendations, Suitable careers,
// Negative tendencies to overcome, Summary

export type GeneralType = {
    destiny: GeneralItemType | null;
    overview: GeneralItemType | null;
    purposeOfLife: GeneralItemType | null;
    optimalDevelopmentConditions: GeneralItemType | null;
    outstandingCharacteristics: GeneralItemType | null;
    developmentRecommendations: GeneralItemType | null;
    suitableCareers: GeneralItemType | null;
    negativeTendenciesToOvercome: GeneralItemType | null;
    summary: GeneralItemType | null;
}
export type NameData = {
    destiny: string | null
    vowel: string | null
    additude: string | null
    character: string | null
}
type KeyNumberContextType = {
    general: GeneralType | null
    birthday: string | null
    additude: string | null
    name: NameData
    peakMeanings: { title: number, description: string | number | undefined }[] | []
    challengeMeanings: { title: number, description: string | number | undefined }[] | []
}

type KeyNumberProviderProps = {
    children: React.ReactNode;
    keyNumber: number;
    birthdayNumber: number;
    lifeAdtitudeNumber: number;
    vowelNumber: number;
    nameNumber: number;
    peakNumbers: number[];
    challengeNumbers: number[]
}

const KeyNumberContext = createContext<KeyNumberContextType | undefined>(undefined);

export function KeyNumberProvider({ children, keyNumber, birthdayNumber, lifeAdtitudeNumber, vowelNumber, nameNumber, peakNumbers, challengeNumbers }: KeyNumberProviderProps) {
    const locales = 'vi';

    const lifePathNumberInfor = getLifePathNumber(locales, keyNumber);
    const birthdayNumberInfor = getBirthdayMeaning(locales, birthdayNumber);
    const additudeNumberInfor = getAdditudeMeaning(locales, lifeAdtitudeNumber);
    const nameNumberInfor = {
        destiny: getNameMeanings(locales, nameNumber),
        vowel: getNameMeanings(locales, vowelNumber),
        additude: getAdditudeMeaning(locales, lifeAdtitudeNumber),
        character: getCharacterMeanings(locales, nameNumber),
    }
    const peakMeanings = getPeaksByPeakNumbers(locales, peakNumbers);
    const challengeMeanings = getChallengesByChallengeNumbers(locales, challengeNumbers);

    const data = {
        general: lifePathNumberInfor?.general || null,
        birthday: birthdayNumberInfor || null,
        additude: additudeNumberInfor || null,
        name: nameNumberInfor || null,
        peakMeanings: peakMeanings,
        challengeMeanings: challengeMeanings,
    }
    return (
        <KeyNumberContext.Provider value={data}>
            {children}
        </KeyNumberContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useKeyNumber() {
    const context = useContext(KeyNumberContext);
    if (!context) {
        throw new Error("useKeyNumber must be used within a KeyNumberProvider");
    }
    return context;
}
