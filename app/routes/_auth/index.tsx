import { Outlet } from "@remix-run/react";
import ErrorHandler from "~/components/ErrorHandler";

export const Auth = () => {
  return (
    <>
      <div className="container mx-auto py-4">
        <Outlet />
      </div>
    </>
  );
};

export const ErrorBoundary = ErrorHandler;

export default Auth;
