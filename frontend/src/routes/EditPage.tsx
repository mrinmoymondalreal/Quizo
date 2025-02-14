import Quiz from "@/components/Quiz";
import { QuizObject } from "@/lib/types";
import {
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useLocation,
} from "react-router-dom";

export async function loader({ params }: LoaderFunctionArgs) {
  const userObjResp = await fetch("http://localhost:3000/user", {
    credentials: "include",
  });
  if (userObjResp.status === 200 && params.id) {
    const quizObjResp = await fetch(
      `http://localhost:3000/quizzes/${params.id}`,
      {
        credentials: "include",
      }
    );
    return { user: await userObjResp.json(), quiz: await quizObjResp.json() };
  }
  if (userObjResp.status === 200) return {};
  return redirect("/auth/sign-in");
}

function Page() {
  const location = useLocation();
  const isNewPage = location.pathname === "/create-quiz";
  const { quiz } = useLoaderData() as { quiz: QuizObject };
  return isNewPage ? <Quiz /> : <Quiz isEdit data={quiz} />;
}

export const element = <Page />;
