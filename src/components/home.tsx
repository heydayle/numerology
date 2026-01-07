import { STEPS, useSteps } from '../contexts/useSteps'
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';
import { useUser } from '@/contexts/useUser';
import { SidebarTrigger } from './ui/sidebar';
import { RotateCcw, Share2 } from "lucide-react"

export function Home() {
    const { t } = useTranslation();
    const { step, currentStep, renew, share } = useSteps();
    const { user } = useUser();

    return (
        <div className='p-6 max-w-300 mx-auto relative font-mono'>
            <div className="sticky top-0 z-10 flex justify-between p-4 bg-black/20 filter backdrop-blur-sm">
                <h1 className='text-center text-2xl font-bold'>{t("numberology")}</h1>
                {step === STEPS.Result && 
                    <div className="flex items-center gap-4">
                        <Button className="rounded-full" title="Renew information" onClick={() => renew()}><RotateCcw /></Button>
                        <Button className="rounded-full" title="Copy to share!" onClick={() => share()}><Share2 /></Button>
                        <SidebarTrigger size="sm" className="text-right z-90" />
                    </div>}
            </div>
            <hr className='my-4' />
            {currentStep.component}
            {step === STEPS.InputForm && <div className='md:w-125 mx-auto text-center'>
                <Button
                    disabled={!currentStep.canNextStep}
                    onClick={() => currentStep.onNextStep?.(user)}
                    className="cursor-pointer"
                >
                    {currentStep.titleNext}
                </Button>
            </div>}
        </div>
    )
}
