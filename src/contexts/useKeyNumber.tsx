import { useContext, createContext } from "react";
import { getLifePathNumber } from "@/assets/MapKeyNumberByLocales";
import { getBirthdayMeaning } from "@/assets/MapNumberOfBirthdayByLocales";
import { getAdditudeMeaning } from "@/assets/MapAdditudeByLocales";

type GeneralItemType = {
    index: number;
    description: string | null;
    title: string;
    style: string;
}

// Destiny, Overview, Purpose of life, Optimal development conditions,
// Outstanding characteristics, Development recommendations, Suitable careers,
// Negative tendencies to overcome, Summary

type GeneralType = {
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

type KeyNumberContextType = {
    general: GeneralType | null
    birthday: string | null
    additude: string | null
}

type KeyNumberProviderProps = {
    children: React.ReactNode;
    keyNumber: number;
    birthdayNumber: number;
    lifeAdtitudeNumber: number;
}

const KeyNumberContext = createContext<KeyNumberContextType | undefined>(undefined);

export function KeyNumberProvider({ children, keyNumber, birthdayNumber, lifeAdtitudeNumber }: KeyNumberProviderProps) {
    const locales = 'vi';

    const lifePathNumberInfor = getLifePathNumber(locales, keyNumber);
    const birthdayNumberInfor = getBirthdayMeaning(locales, birthdayNumber);
    const additudeNumberInfor = getAdditudeMeaning(locales, lifeAdtitudeNumber);

    const data = {
        general: lifePathNumberInfor?.general || null,
        birthday: birthdayNumberInfor || null,
        additude: additudeNumberInfor || null,
    }
    return (
        <KeyNumberContext.Provider value={data}>
            {children}
        </KeyNumberContext.Provider>
    );
}

export function useKeyNumber() {
    const context = useContext(KeyNumberContext);
    if (!context) {
        throw new Error("useKeyNumber must be used within a KeyNumberProvider");
    }
    return context;
}
