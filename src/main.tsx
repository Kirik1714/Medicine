import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { NotFoundComponent } from "./shared/components/NotFoundComponent";

// Initialization TanStack Query
const queryClient = new QueryClient();

// Initialization TanStack Router
const router = createRouter({ routeTree ,defaultNotFoundComponent:NotFoundComponent });

// Say our TS router has routes that generated in ./routeTree.gen
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
