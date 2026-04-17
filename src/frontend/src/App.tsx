import { Layout } from "@/components/layout/Layout";
import { LoadingScreen } from "@/components/ui/LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

// Lazy-loaded pages
import { Suspense, lazy } from "react";

const LoginPage = lazy(() => import("@/pages/LoginPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const ReportLostPage = lazy(() => import("@/pages/ReportLostPage"));
const ReportFoundPage = lazy(() => import("@/pages/ReportFoundPage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const ItemDetailPage = lazy(() => import("@/pages/ItemDetailPage"));
const NotificationsPage = lazy(() => import("@/pages/NotificationsPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing)
    return <LoadingScreen label="Loading Campus Lost & Found..." />;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return <>{children}</>;
}

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <AuthGuard>
      <Layout>
        <HomePage />
      </Layout>
    </AuthGuard>
  ),
});

const reportLostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/report/lost",
  component: () => (
    <AuthGuard>
      <Layout>
        <ReportLostPage />
      </Layout>
    </AuthGuard>
  ),
});

const reportFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/report/found",
  component: () => (
    <AuthGuard>
      <Layout>
        <ReportFoundPage />
      </Layout>
    </AuthGuard>
  ),
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: () => (
    <AuthGuard>
      <Layout>
        <SearchPage />
      </Layout>
    </AuthGuard>
  ),
});

const itemDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/item/$id",
  component: () => (
    <AuthGuard>
      <Layout>
        <ItemDetailPage />
      </Layout>
    </AuthGuard>
  ),
});

const notificationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/notifications",
  component: () => (
    <AuthGuard>
      <Layout>
        <NotificationsPage />
      </Layout>
    </AuthGuard>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    <AuthGuard>
      <Layout>
        <ProfilePage />
      </Layout>
    </AuthGuard>
  ),
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  homeRoute,
  reportLostRoute,
  reportFoundRoute,
  searchRoute,
  itemDetailRoute,
  notificationsRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
