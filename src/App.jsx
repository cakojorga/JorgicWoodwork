import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import RootLayout from "./pages/RootLayout";
import Privatnost from "./pages/Privatnost";
import UsloviKoriscenja from "./pages/UsloviKoriscenja";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
