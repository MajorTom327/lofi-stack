import {
  Links,
  Meta,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import React from "react";

import GeneralErrorHandler from "./GeneralErrorHandler";
import { RouteErrorHandler } from "./RouteErrorHandler";

type Props = {};

export const ErrorHandler: React.FC<Props> = ({}) => {
  const error = useRouteError();

  return isRouteErrorResponse(error) ? (
    <RouteErrorHandler error={error} />
  ) : (
    <GeneralErrorHandler error={error} />
  );
};

ErrorHandler.defaultProps = {};

export default ErrorHandler;
