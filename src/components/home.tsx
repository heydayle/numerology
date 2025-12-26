import { STEPS, useSteps } from '../contexts/useSteps'
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';
import { useUser } from '@/contexts/useUser';

export function Home() {
    const { t } = useTranslation();
    const { step, currentStep, setStep } = useSteps();
    const { user } = useUser();

    return (
        <div className='p-6 max-w-[1200px] mx-auto relative'>
            <h1 className='text-center text-2xl font-bold'>{t("numberology")}</h1>
            <hr className='my-4' />
            {currentStep.component}
            {step === STEPS.InputForm && <div className='w-[500px] mx-auto text-center'>
                <Button
                    disabled={!currentStep.canNextStep}
                    onClick={() => currentStep.onNextStep?.(user)}
                    className="cursor-pointer"
                >
                    {currentStep.titleNext}
                </Button>
            </div>}
            {step === STEPS.Result && <Button variant="outline" className="fixed bottom-6 right-10" onClick={() => setStep(STEPS.InputForm)}>Renew</Button>}
        </div>
    )
}
