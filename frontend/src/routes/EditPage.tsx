import Quiz from "@/components/Quiz";
import { LoaderFunctionArgs, redirect, useLocation } from "react-router-dom";

export async function loader({ params }: LoaderFunctionArgs) {
  console.log(params);
  const userObjResp = await fetch("http://localhost:3000/user", {
    credentials: "include",
  });
  if (userObjResp.status === 200) return { user: await userObjResp.json() };
  return redirect("/auth/sign-in");
}

function Page() {
  const location = useLocation();
  const isNewPage = location.pathname === "/create-quiz";
  return isNewPage ? <Quiz /> : "edit existing quiz";
}

export const element = <Page />;
