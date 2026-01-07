import { UserForm } from '@/components/details/userForm';
import { createContext, useContext, type ReactNode, useState, useMemo, useCallback, useEffect } from 'react';
import { useUser, type User } from './useUser';
import { InformationOfNumber } from '@/components/details/InformationOfNumber';
import { useTranslation } from 'react-i18next';
import { useLocation, useHref, useSearchParams } from 'react-router';
import { copyToClipboard } from '@/utils/helper';
import { toast } from "sonner"

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
    renew: () => void
    share: () => void
}

const StepsContext = createContext<StepsContextType | undefined>(undefined);

export function StepsProvider({ children }: { children: ReactNode }) {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [step, setStep] = useState<Step>(STEPS.InputForm)
    const { mainNumber, user } = useUser();

    const renew = useCallback(() => {
        if (step !== STEPS.InputForm) {
            setSearchParams('')
            setStep(STEPS.InputForm)
        }
    }, [step])

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

    const share = useCallback(async () => {
        const link = new URL(window.location.href)
        link.searchParams.append('shared', '1')
        const response = await copyToClipboard(link.href)
        if (response) {
            toast.success('Ready to share!')
        } else {
            toast.error('Copy fail!')
        }
    }, [step, searchParams])

    const initByShared = () => {
        const shared = searchParams.get('shared');
        if (shared === '1') {
            nextToResult(user)
        }
    }

    useEffect(() => {
        initByShared()
    }, [user])

    return (
        <StepsContext.Provider value={{ step, setStep, currentStep, renew, share }}>
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