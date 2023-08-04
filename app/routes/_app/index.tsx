import type { LoaderArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import React from "react";
import { authenticator } from "~/services/auth.server";

type Props = {};

export const loader = async ({ request }: LoaderArgs) => {
  await authenticator.isAuthenticated(request, { failureRedirect: "/login" });

  return null;
};

export const Index: React.FC<Props> = ({}) => {
  return (
    <>
      <div className="container mx-auto">
        <Outlet />
      </div>
    </>
  );
};

Index.defaultProps = {};

export default Index;
