import { setTitle } from "@/components/PageTitle";
import Quiz from "@/components/Quiz";
import { QuizObject } from "@/lib/types";
import {
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useLocation,
} from "react-router-dom";

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id) {
    try {
      const resp = await fetch(`http://localhost:3000/quizzes/${params.id}`, {
        credentials: "include",
      });
      const status = resp.status;
      const json = await resp.json();
      if (status !== 200 || Array.isArray(json)) return redirect("/dashboard");
      return { quiz: json };
    } catch (err) {
      console.log(err);
      return redirect("/dashboard");
    }
  }

  return {};
}

function Page() {
  const location = useLocation();
  const isNewPage = location.pathname === "/create-quiz";
  const { quiz } = useLoaderData() as { quiz: QuizObject };
  setTitle(isNewPage ? "Create Quiz" : "Edit Quiz");
  return isNewPage ? <Quiz /> : <Quiz isEdit data={quiz} />;
}

export const element = <Page />;
