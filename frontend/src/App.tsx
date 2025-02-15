import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { rootLoader } from "./lib/utils";
import ProtectedRoot from "./routes/ProtectedRoot";
import PageTitle from "./components/PageTitle";

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    lazy: () => import("./routes/Home"),
  },
  {
    path: "/",
    loader: rootLoader,
    element: <ProtectedRoot />,
    children: [
      {
        path: "/dashboard",
        lazy: () => import("./routes/Dashboard"),
      },
      {
        path: "/create-quiz",
        lazy: () => import("./routes/EditPage"),
      },
      {
        path: "/edit-quiz/:id",
        lazy: () => import("./routes/EditPage"),
      },
    ],
  },
  {
    path: "/auth/sign-in",
    lazy: () => import("./routes/AuthPage"),
  },
  {
    path: "/auth/sign-up",
    lazy: () => import("./routes/AuthPage"),
  },
]);

function App() {
  PageTitle();
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
