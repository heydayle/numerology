import { STEPS, useSteps } from '../contexts/useSteps'
import { Button } from './ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { UserForm } from './userForm';

export function Home() {
    const { step, currentStep } = useSteps();

    return (
        <div className='p-6 max-w-5xl mx-auto relative'>
            <h1 className='text-lg'>Numberology</h1>
            {currentStep.component}
            {step === STEPS.InputForm && <div className='w-[500px] mx-auto text-center'>
                <Button
                    disabled={!currentStep.canNextStep}
                    onClick={currentStep.onNextStep}
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
