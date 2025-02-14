import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import { useLocation } from "react-router-dom";

export function loader() {
  return null;
}

function Page() {
  const location = useLocation();
  const isSignIn = location.pathname === "/auth/sign-in";
  return isSignIn ? <SignIn /> : <SignUp />;
}

export const element = <Page />;
