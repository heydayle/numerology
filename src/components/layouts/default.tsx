
import LightRays from '../bits/LightRays';
import GradualBlur from '../bits/GradualBlur';
import { Toaster } from "@/components/ui/sonner";

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
                <Toaster position="top-center" />
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#ffffff"
                    raysSpeed={1.2}
                    lightSpread={0.7}
                    rayLength={0.5}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0.1}
                    distortion={0.05}
                />
                {children}
                <GradualBlur
                    target="parent"
                    position="bottom"
                    height="6rem"
                    strength={2}
                    divCount={5}
                    curve="bezier"
                    exponential={true}
                    opacity={1}
                />
            </div>
    )
}