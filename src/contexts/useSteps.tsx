import { UserForm } from '@/components/details/userForm';
import { createContext, useContext, type ReactNode, useState, useMemo } from 'react';
import { useUser } from './useUser';
import { InformationOfNumber } from '@/components/details/InformationOfNumber';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router';

export const STEPS = Object.freeze({
    InputForm: 'InputForm',
    Result: 'Result',
} as const)
export type Step = keyof typeof STEPS

interface CurrentStep {
    canNextStep: boolean
    titleNext?: string
    onNextStep?: () => void
    component: ReactNode
}

interface StepsContextType {
    step: Step
    setStep: (step: Step) => void
    currentStep: CurrentStep
}

const StepsContext = createContext<StepsContextType | undefined>(undefined);

export function StepsProvider({ children }: { children: ReactNode }) {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [step, setStep] = useState<Step>(STEPS.InputForm)
    const { mainNumber, user } = useUser()

    const nextToResult = () => {
        setStep(STEPS.Result)
        console.log('name', user);
        
        setSearchParams({
            ...Object.fromEntries(searchParams),
            name: user.name,
            birthday: user.birthday ? `${user.birthday.year}-${user.birthday.month + 1}-${user.birthday.day}` : '',
        });
    }

    const currentStep = useMemo<CurrentStep>(() => {
        switch(step) {
            case STEPS.Result:
                return {
                    canNextStep: true,
                    onNextStep: () => setStep(STEPS.InputForm),
                    component: <InformationOfNumber />,
                }
            default:
                return {
                    canNextStep: Boolean(mainNumber),
                    titleNext: t("analysis"),
                    onNextStep: () => nextToResult(),
                    component: <UserForm />,
                }
        }
    }, [step, mainNumber])

    return (
        <StepsContext.Provider value={{ step, setStep, currentStep }}>
            {children}
        </StepsContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSteps() {
    const context = useContext(StepsContext);
    if (context === undefined) {
        throw new Error('useSteps must be used within a StepsProvider');
    }
    return context;
}