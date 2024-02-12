import Image from "../Image/Image";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import errorImage from "./error.jpeg";
import { Links, Meta } from "@remix-run/react";
import type { ErrorResponse } from "@remix-run/router";
import React from "react";

type Props = {
  error: ErrorResponse;
};

export const RouteErrorHandler: React.FC<Props> = ({ error }) => {
  return (
    <>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <div className="flex justify-center items-center w-scree h-screen">
            <Card className="-mt-32">
              <CardHeader>
                <Image
                  src={errorImage}
                  className="rounded-lg"
                  alt="Obi-Wan Kenobi saying 'I feel a disturbance in the force'"
                />
                <CardTitle className="text-center !mt-3">
                  I feel a disturbance in the force
                </CardTitle>
                <Separator />
              </CardHeader>

              <CardContent>
                <h1 className="text-4xl">{error.status}</h1>
                <h2 className="text-2xl">{error.statusText}</h2>
              </CardContent>
              <CardFooter>
                {error.status === 401 ? (
                  <Button color="primary" to="/login">
                    Login
                  </Button>
                ) : (
                  <Button color="primary" to="/">
                    Go back to the home page
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </body>
      </html>
    </>
  );
};

RouteErrorHandler.defaultProps = {};

export default RouteErrorHandler;
