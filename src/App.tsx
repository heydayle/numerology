import { Home } from "./components/home";
import LightRays from './components/bits/LightRays';
import GradualBlur from './components/bits/GradualBlur';
import { Toaster } from "@/components/ui/sonner"

export function App() {
    return (
        <>
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
                <div className="absolute top-0 h-screen overflow-y-auto w-full mx-auto pb-16">
                    <Home /> 
                </div>
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
        </>
    );
}

export default App;