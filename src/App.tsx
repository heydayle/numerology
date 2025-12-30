import { Home } from "./components/home";
import Particles from './components/bits/Particles';

export function App() {
    return (
        <>
            <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
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
                <div className="absolute top-0 h-screen overflow-y-auto w-full mx-auto">
                    <Home /> 
                </div>
            </div>
        </>
    );
}

export default App;