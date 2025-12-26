import { STEPS, useSteps } from '../contexts/useSteps'
import { Button } from './ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { UserForm } from './details/userForm';
import { useTranslation } from 'react-i18next';
import { useUser } from '@/contexts/useUser';

export function Home() {
    const { t } = useTranslation();
    const { step, currentStep } = useSteps();
    const { user } = useUser();

    return (
        <div className='p-6 max-w-5xl mx-auto relative'>
            <h1 className='text-center text-2xl font-bold'>{t("numberology")}</h1>
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
            {step === STEPS.Result && (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="absolute top-10 right-10">Renew</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-4" align="end">
                        <UserForm />
                    </PopoverContent>
                </Popover>
            )}
        </div>
    )
}
