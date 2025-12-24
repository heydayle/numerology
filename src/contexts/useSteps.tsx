import { UserForm } from '@/components/userForm';
import { createContext, useContext, type ReactNode, useState, useMemo } from 'react';
import { useUser } from './useUser';

export const STEPS = Object.freeze({
    InputForm: 'InputForm',
    Analysing: 'Analysing',
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
    const [step, setStep] = useState<Step>(STEPS.InputForm)
    const { user, mainNumber, isLoading } = useUser()

    const currentStep = useMemo<CurrentStep>(() => {
        switch(step) {
            case STEPS.Analysing:
                return {
                    canNextStep: !isLoading,
                    titleNext: 'View Result',
                    onNextStep: () => setStep(STEPS.Result),
                    component: 'Analysis Loading!'
                }
            case STEPS.Result:
                return {
                    canNextStep: true,
                    onNextStep: () => setStep(STEPS.InputForm),
                    component: (<>Number: { mainNumber }</>)
                }
            default:
                return {
                    canNextStep: Boolean(mainNumber && user.name),
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