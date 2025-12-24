import { STEPS, useSteps } from '../contexts/useSteps'
import { Button } from './ui/button';

export function Home() {
    const { step, currentStep } = useSteps();

    return (
        <div className='p-6'>
            <h1 className='text-lg'>Numberology</h1>
            {currentStep.component}
            {step === STEPS.InputForm && <div className='w-md mx-auto text-right'>
                <Button
                    disabled={!currentStep.canNextStep}
                    onClick={currentStep.onNextStep}
                >
                    {currentStep.titleNext}
                </Button>
            </div>}
        </div>
    )
}
