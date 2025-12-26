import { UserForm } from '@/components/details/userForm';
import { createContext, useContext, type ReactNode, useState, useMemo } from 'react';
import { useUser, type User } from './useUser';
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
    onNextStep?: (user?: User) => void
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
    const [_, setSearchParams] = useSearchParams();
    const [step, setStep] = useState<Step>(STEPS.InputForm)
    const { mainNumber } = useUser();

    const nextToResult = (userFormData?: User) => {
        setStep(STEPS.Result)
        if (!userFormData) return;
        
        const params = {
            name: userFormData.name,
            birthday: userFormData.birthday ? `${userFormData.birthday.year}-${userFormData.birthday.month + 1}-${userFormData.birthday.day}` : '',
        }

        setSearchParams((prev) => ({ ...prev, ...params }));
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
                    onNextStep: (user?: User) => nextToResult(user),
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