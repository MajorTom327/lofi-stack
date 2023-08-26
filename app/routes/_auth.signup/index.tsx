import { zodResolver } from "@hookform/resolvers/zod";
import { json, type ActionArgs, redirect } from "@remix-run/node";
import { Form, useNavigate } from "@remix-run/react";
import { Loader2 } from "lucide-react";
import {
  RemixFormProvider,
  getValidatedFormData,
  useRemixForm,
} from "remix-hook-form";
import z from "zod";
import ErrorHandler from "~/components/ErrorHandler";
import Input from "~/components/Input";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Users } from "~/models";

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
  })
  .superRefine((data) => {
    return data.password === data.password_confirmation;
  });

type FormData = z.infer<typeof schema>;

const resolver = zodResolver(schema);

export const AuthSignup = () => {
  const formMethods = useRemixForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      password_confirmation: "",
    },
    resolver,
  });

  const state = formMethods.formState;

  const isSubmitting = state.isSubmitting || state.isLoading;

  return (
    <>
      <div className="flex justify-center">
        <Card>
          <CardHeader>
            <CardTitle>
              <h1 className="text-2xl font-bold">Sign Up</h1>
            </CardTitle>
            <CardDescription>
              So you want to create your account ? Here we go !
            </CardDescription>
          </CardHeader>
          <RemixFormProvider {...formMethods}>
            <Form
              onSubmit={formMethods.handleSubmit}
              className="flex flex-col gap-2"
            >
              <CardContent>
                <Input.Email name="email" required label="Email" />
                <Input.Password required name="password" label="Password" />
                <Input.Password
                  required
                  name="password_confirmation"
                  label="Password confirmation"
                />
              </CardContent>
              <CardFooter className="flex justify-evenly">
                <Button size="lg" variant="ghost" to="/login">
                  let me login
                </Button>
                <Button size="lg" type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <span className="animate-spin">
                      <Loader2 />
                    </span>
                  )}
                  Signup
                </Button>
              </CardFooter>
            </Form>
          </RemixFormProvider>
        </Card>
      </div>
    </>
  );
};

export const ErrorBoundary = ErrorHandler;

export const action = async ({ request }: ActionArgs) => {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<FormData>(request, resolver);
  if (errors) {
    return json({ errors, defaultValues });
  }
  // Do something with the data

  const user = Users.create(data);
  return redirect("/login");
};

export default AuthSignup;
