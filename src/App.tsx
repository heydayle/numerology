import { Home } from "./components/home";
import Particles from './components/bits/Particles';
import GradualBlur from './components/bits/GradualBlur';
import { Toaster } from "@/components/ui/sonner"

export function App() {
    return (
        <>
            <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
                <Toaster position="top-center" />
                <Particles
                    particleColors={['#ffffff', '#6e47fcff']}
                    particleCount={500}
                    particleSpread={20}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                    disableRotation={false}
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