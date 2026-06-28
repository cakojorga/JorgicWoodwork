import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import RootLayout from "./pages/RootLayout";
import Privatnost from "./pages/Privatnost";
import UsloviKoriscenja from "./pages/UsloviKoriscenja";
import Galerija from "./pages/Galerija";
import ErrorPage from "./pages/ErrorPage";
import { Analytics } from "@vercel/analytics/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/privatnost",
        element: <Privatnost />,
      },
      {
        path: "/uslovi-koriscenja",
        element: <UsloviKoriscenja />,
      },
      {
        path: "/Galerija/:title",
        element: <Galerija />,
      },
    ],
  },
]);

function App() {
return (
  <>
    <Analytics />
    <RouterProvider router={router} />;
  </>
);}

export default App;
