/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { MainLayout } from "../shared/components/layout/MainLayout";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ location }) => {
    const isAuthenticated = !!localStorage.getItem("auth_token");

    if (!isAuthenticated) {
      throw redirect({ to: "/login", search: { redirect: location.pathname } });
    }
  },
  component: AuthenticatedLayout,
  
});

function AuthenticatedLayout() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
