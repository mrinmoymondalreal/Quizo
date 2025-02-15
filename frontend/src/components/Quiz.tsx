import { Link, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "./InputField";
import { QuizBasicSchema } from "@/lib/schemas";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { QuizObject } from "@/lib/types";
import { toast } from "sonner";

const FormSchema = QuizBasicSchema;

function QuizForm({
  isEdit = false,
  data,
}: {
  isEdit: boolean;
  data?: QuizObject;
}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
    },
  });

  async function createQuiz(data: z.infer<typeof FormSchema>) {
    const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/quizzes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (resp.status == 200) {
      console.log("quiz added successfully");
      toast.success("Quiz created successfully!");
      return navigate("/dashboard");
    }

    toast.error("Failed to create quiz. Try again later.");
    setIsLoading(false);
  }

  async function editQuiz(d: z.infer<typeof FormSchema>) {
    const resp = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/quizzes/` + data?.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(d),
        credentials: "include",
      }
    );

    if (resp.status == 200) {
      console.log("quiz edited successfully");
      toast.success("Quiz edited successfully!");
      return navigate("/dashboard");
    }

    toast.error("Failed to edit quiz. Try again later.");
    setIsLoading(false);
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    // Handle the submit event
    if (isEdit) editQuiz(data);
    else createQuiz(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <InputField
          control={form.control}
          name="title"
          placeholder="Title"
          label={(isEdit ? "Edit" : "Enter") + " Title of the quiz"}
          disabled={isLoading}
        />
        <InputField
          control={form.control}
          name="description"
          placeholder="Description"
          label={(isEdit ? "Edit" : "Enter") + " Description of the quiz"}
          type="textarea"
          disabled={isLoading}
        />
        <Button isLoading={isLoading} type="submit" size="lg">
          {isEdit ? "Save Changes" : "Create Quiz"}
        </Button>
      </form>
    </Form>
  );
}

function Quiz({
  isEdit = false,
  data,
}: {
  isEdit?: boolean;
  data?: QuizObject;
}) {
  return (
    <div className="flex px-7 md:px-4 my-6 md:my-0 h-[70vh] justify-center md:items-center max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 gap-x-12 w-full h-fit">
        <div className="md:flex-1 text-left h-full">
          <p className="text-secondary leading-7 [&:not(:first-child)]:mt-6">
            <Button variant={"ghost"} asChild>
              <Link to="/dashboard">
                <ArrowLeft />
                <span>Back</span>
              </Link>
            </Button>
          </p>
          <div>
            <h1 className="mt-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              {isEdit ? "Edit Quiz" : "Create New Quiz"}
            </h1>
          </div>
          <p className="text-secondary leading-7 [&:not(:first-child)]:mt-6">
            {isEdit
              ? "Edit the quiz details"
              : "Create a new quiz by filling out the form"}
          </p>
        </div>
        <div className="w-full md:flex-1 flex justify-center">
          <QuizForm isEdit={isEdit} data={data} />
        </div>
      </div>
    </div>
  );
}

export default Quiz;
