import { UserForm } from '@/components/userForm';
import { createContext, useContext, type ReactNode, useState, useMemo } from 'react';
import { useUser } from './useUser';
import { Loading } from '@/components/loading';
import { InformationOfNumber } from '@/components/InformationOfNumber';

export const STEPS = Object.freeze({
    InputForm: 'InputForm',
    Analysing: 'Analysing',
    Result: 'Result',
} as const)
export type Step = keyof typeof STEPS

interface CurrentStep {
    isLoading?: boolean
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
    const [step, setStep] = useState<Step>(STEPS.InputForm)
    const { user, mainNumber, isLoading } = useUser()

    const currentStep = useMemo<CurrentStep>(() => {
        switch(step) {
            case STEPS.Analysing:
                return {
                    isLoading: true,
                    canNextStep: !isLoading,
                    titleNext: 'View Result',
                    onNextStep: () => setStep(STEPS.Result),
                    component: <Loading />,
                }
            case STEPS.Result:
                return {
                    canNextStep: true,
                    onNextStep: () => setStep(STEPS.InputForm),
                    component: <InformationOfNumber />,
                }
            default:
                return {
                    canNextStep: Boolean(mainNumber),
                    titleNext: 'Analysis',
                    onNextStep: () => setStep(STEPS.Analysing),
                    component: <UserForm />,
                }
        }
    }, [step, setStep, user, mainNumber])

    return (
        <StepsContext.Provider value={{ step, setStep, currentStep }}>
            {children}
        </StepsContext.Provider>
    );
}

export function useSteps() {
    const context = useContext(StepsContext);
    if (context === undefined) {
        throw new Error('useSteps must be used within a StepsProvider');
    }
    return context;
}