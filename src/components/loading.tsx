import { useSteps } from "@/contexts/useSteps"
import { useEffect } from "react";

export function Loading() {
    const { currentStep } = useSteps();
    const onSetTimeout = () => {
        setTimeout(() => {
            currentStep.onNextStep?.()
        }, 2000);
    }
    useEffect(() => {
        onSetTimeout();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
            <div className="relative w-48 h-48">
                {/* Sun */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/70 animate-pulse" />
                
                {/* Earth */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 animate-spin" style={{ animationDuration: '4s' }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-md shadow-blue-500/50" />
                </div>
            </div>
        </div>
    )
}