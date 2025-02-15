import { setTitle } from "@/components/PageTitle";
import QuizCard from "@/components/QuizCard";
import { Button } from "@/components/ui/button";
import { QuizObject } from "@/lib/types";
import { PlusIcon } from "lucide-react";
import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
  const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/quizzes`, {
    credentials: "include",
  });
  if (resp.status === 200) return { quizzes: await resp.json() };
  return null;
}

function Page() {
  const { quizzes } = useLoaderData() as {
    quizzes: QuizObject[];
  };

  setTitle("Dashboard");

  return (
    <main className="mt-6 px-6 md:px-4 max-w-7xl mx-auto flex flex-col">
      <div className="flex justify-between">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 w-fit">
          My Quizzes
        </h2>
        <div>
          <Button className="[&_svg]:size-5" asChild>
            <Link to="/create-quiz">
              <PlusIcon />
              <span>Create New Quiz</span>
            </Link>
          </Button>
        </div>
      </div>
      <div className="my-6 grid gap-4 justify-center lg:grid-cols-4 md:grid-cols-3 grid-cols-1">
        {(!quizzes || quizzes.length === 0) && (
          <div className="h-[200px] col-span-4 flex justify-center items-center">
            <span className="text-secondary text-center text-xl md:text-3xl">
              No Quiz Avialable. Create one by clicking the button above.
            </span>
          </div>
        )}
        {Array.isArray(quizzes) &&
          quizzes.map(({ title, description, id, created_at }, index) => (
            <QuizCard
              title={title}
              created_at={new Date(Date.parse(created_at))}
              description={description}
              quizId={id}
              key={index}
            />
          ))}
      </div>
    </main>
  );
}

export const element = <Page />;
