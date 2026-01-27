import { Home } from "./components/home";
import { DefaultLayout } from "./components/layouts/default";

export function App() {
    return (
        <DefaultLayout>
            <div className="absolute top-0 h-screen overflow-y-auto w-full mx-auto pb-16">
                <Home /> 
            </div>
        </DefaultLayout>
    );
}

export default App;