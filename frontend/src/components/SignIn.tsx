import { Link } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "./InputField";
import { SignInSchema } from "@/lib/schemas";

const FormSchema = SignInSchema;

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

function SignIn() {
  return (
    <div className="flex flex-col md:flex-row gap-8 gap-x-12 px-7 md:px-4 min-h-screen justify-center md:items-center max-w-5xl mx-auto">
      <div className="md:flex-1 text-left ">
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Sign In
          </h1>
        </div>
        <p className="text-secondary leading-7 [&:not(:first-child)]:mt-6">
          Enter your email and password to sign in to your account. and Continue
          to Dashboard
        </p>
        <p className="text-secondary leading-7 [&:not(:first-child)]:mt-6">
          New to us?{" "}
          <Link to="/auth/sign-up" className="text-primary underline">
            Create an account
          </Link>
        </p>
      </div>
      <div className="w-full md:flex-[1] flex justify-center">
        <SignInForm />
      </div>
    </div>
  );
}

export default SignIn;
