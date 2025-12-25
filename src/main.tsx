import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import './i18n';
import { UserProvider } from "./contexts/useUser.tsx"
import { StepsProvider } from "./contexts/useSteps.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <StepsProvider>
        <App />
      </StepsProvider>
    </UserProvider>
  </StrictMode>
)
