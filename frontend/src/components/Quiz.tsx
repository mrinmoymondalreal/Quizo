import { Link } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "./InputField";
import { QuizBasicSchema } from "@/lib/schemas";
import { ArrowLeft } from "lucide-react";

const FormSchema = QuizBasicSchema;

function QuizForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Handle the submit event
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <InputField
          control={form.control}
          name="title"
          placeholder="Title"
          label="Enter Title of the quiz"
        />
        <InputField
          control={form.control}
          name="description"
          placeholder="Description"
          label="Enter Description of the quiz"
          type="textarea"
        />
        <Button type="submit" size="lg">
          Submit
        </Button>
      </form>
    </Form>
  );
}

function Quiz() {
  return (
    <div className="flex px-7 md:px-4 min-h-screen justify-center md:items-center max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 gap-x-12 w-full">
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
              Create New Quiz
            </h1>
          </div>
          <p className="text-secondary leading-7 [&:not(:first-child)]:mt-6">
            Enter the details to create a new quiz
          </p>
        </div>
        <div className="w-full md:flex-[1] flex justify-center">
          <QuizForm />
        </div>
      </div>
    </div>
  );
}

export default Quiz;
