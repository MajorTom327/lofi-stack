import type { LoaderArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }: LoaderArgs) => {
  await authenticator.isAuthenticated(request, { failureRedirect: "/login" });

  return null;
};

export const Index = () => {
  return (
    <>
      <div className="container mx-auto">
        <Outlet />
      </div>
    </>
  );
};

export default Index;
