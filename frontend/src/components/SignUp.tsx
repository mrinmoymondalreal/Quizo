import { Link } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "./InputField";
import { SignUpSchema } from "@/lib/schemas";

const FormSchema = SignUpSchema;

function SignInForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
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
          name="name"
          placeholder="Full Name"
          label="Full Name"
        />
        <InputField
          control={form.control}
          name="email"
          placeholder="Email"
          label="Email Address"
        />
        <InputField
          control={form.control}
          name="password"
          placeholder="Password"
          label="Password"
          type="password"
        />
        <Button type="submit" size="lg">
          Submit
        </Button>
      </form>
    </Form>
  );
}

function SignUp() {
  return (
    <div className="flex flex-col md:flex-row gap-8 gap-x-12 px-7 md:px-4 min-h-screen justify-center md:items-center max-w-5xl mx-auto">
      <div className="md:flex-1 text-left ">
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Sign Up
          </h1>
        </div>
        <p className="text-secondary leading-7 [&:not(:first-child)]:mt-6">
          Create a new account to get started.
        </p>
        <p className="text-secondary leading-7 [&:not(:first-child)]:mt-6">
          Already a user?{" "}
          <Link to="/auth/sign-in" className="text-primary underline">
            Sign In
          </Link>
        </p>
      </div>
      <div className="w-full md:flex-[1] flex justify-center">
        <SignInForm />
      </div>
    </div>
  );
}

export default SignUp;
