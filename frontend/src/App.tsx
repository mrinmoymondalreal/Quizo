import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    lazy: () => import("./routes/Home"),
  },
  {
    path: "/dashboard",
    lazy: () => import("./routes/Dashboard"),
  },
  {
    path: "/",
    lazy: () => import("./routes/EditPage"),
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
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
