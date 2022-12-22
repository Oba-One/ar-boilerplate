import {
  Route,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Suspense, lazy } from "react";

import { Nav } from "./components/Nav";
import FullScreenLoader from "./components/Loader";

const Home = lazy(() => import("./views/Home"));
const Explore = lazy(() => import("./views/Explore"));

const AppLayout = () => (
  <>
    <Nav />
    <main
      className={`view [grid-area:content] overflow-hidden h-full w-full xl:max-w-screen-2xl px-4 md:px-6 xl:px-8`}
    >
      <Suspense fallback={<FullScreenLoader />}>
        <Outlet />
      </Suspense>
    </main>
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
