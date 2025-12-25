import { useContext, createContext } from "react";
import { getKeyNumberInfo } from "@/assets/MapKeyNumberByLocales";
import { useUser } from "./useUser";

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
    general: GeneralType | null;
}

const KeyNumberContext = createContext<KeyNumberContextType | undefined>(undefined);

export function KeyNumberProvider({ children, keyNumber }: { children: React.ReactNode; keyNumber: number }) {
    const locales = 'vi';

    const keyNumberInfor = getKeyNumberInfo(locales, keyNumber);
    const data = {
        general: keyNumberInfor?.general || null
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
