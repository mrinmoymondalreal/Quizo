import Header from "@/components/Header";
import QuizCard from "@/components/QuizCard";
import { Button } from "@/components/ui/button";
import { userObject } from "@/lib/types";
import { PlusIcon } from "lucide-react";
import { Link, redirect, useLoaderData } from "react-router-dom";

export async function loader() {
  const resp = await fetch("http://localhost:3000/user", {
    credentials: "include",
  });
  if (resp.status === 200) return { user: await resp.json() };
  return redirect("/auth/sign-in");
}

function Page() {
  const quiz_data = Array.from({ length: 10 }, (_, index) => index);

  const loader_data = useLoaderData();
  const user = (loader_data as { user: userObject }).user;

  return (
    <>
      <Header user={user} />
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
        <div className="my-6 grid gap-4 justify-center lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {quiz_data.length === 0 && (
            <div className="h-[200px] col-span-4 flex justify-center items-center">
              <span className="text-secondary text-center text-xl md:text-3xl">
                No Quiz Avialable. Create one by clicking the button above.
              </span>
            </div>
          )}
          {quiz_data.map((_, index) => (
            <QuizCard
              title={"Simple Quiz #" + (index + 1)}
              created_at={new Date().getTime()}
              description="Simple example of description of the quiz"
              questions={9}
              quizId={(80).toString()}
              key={index}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export const element = <Page />;
