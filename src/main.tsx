import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import "./index.css"
import App from "./App.tsx"
import './i18n';
import { UserProvider } from "./contexts/useUser.tsx"
import { StepsProvider } from "./contexts/useSteps.tsx"
import { SidebarProvider } from "@/components/ui/sidebar"

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <SidebarProvider>
        <UserProvider>
          <StepsProvider>
              <App />
          </StepsProvider>
        </UserProvider>
      </SidebarProvider>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
)
