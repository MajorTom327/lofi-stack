import type { LoaderArgs } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import Button from "~/components/Button";
import Card from "~/components/Card";
import Input from "~/components/Input";
import { authenticator } from "~/services/auth.server";
import { AuthStrategies } from "~/services/auth_strategies";

export const loader = async ({ request }: LoaderArgs) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });
  return null;
};

export default function LoginRoute() {
  const fetcher = useFetcher();

  return (
    <>
      <div className="container mx-auto">
        <Card>
          <Card.Title>Login</Card.Title>
          <fetcher.Form
            action={`/auth/${AuthStrategies.FORM}`}
            method="POST"
            className="flex flex-col gap-2"
          >
            <Input required name="email" type="email" label="Email" />
            <Input.Password required name="password" label="Password" />

            <Card.Actions>
              <Button color="primary" type="submit">
                Connect
              </Button>
            </Card.Actions>
          </fetcher.Form>
        </Card>
      </div>
    </>
  );
}
