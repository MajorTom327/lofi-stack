import { zodResolver } from "@hookform/resolvers/zod";
import type { LoaderArgs } from "@remix-run/node";
import { Form, useFetcher } from "@remix-run/react";
import { Github } from "lucide-react";
import { RemixFormProvider, useRemixForm } from "remix-hook-form";
import z from "zod";
import BaseInput from "~/components/Input";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { authenticator } from "~/services/auth.server";
import { AuthStrategies } from "~/services/auth_strategies";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

export const formLoginResolver = zodResolver(schema);

export const loader = async ({ request }: LoaderArgs) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
  return null;
};

export default function LoginRoute() {
  const formMethods = useRemixForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
    submitConfig: {
      action: `/auth/${AuthStrategies.FORM}`,
      method: "POST",
    },
    resolver: formLoginResolver,
  });

  return (
    <>
      <div className="container mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <RemixFormProvider {...formMethods}>
            <Form
              onSubmit={formMethods.handleSubmit}
              className="flex flex-col gap-2"
            >
              <CardContent>
                <BaseInput required name="email" type="email" label="Email" />
                <BaseInput.Password
                  required
                  name="password"
                  label="Password"
                  togglable
                />
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button to="/signup" variant="secondary">
                  Sign up
                </Button>
                <Button type="submit">Let's do it</Button>
              </CardFooter>
            </Form>
          </RemixFormProvider>
        </Card>
      </div>
    </>
  );
}
