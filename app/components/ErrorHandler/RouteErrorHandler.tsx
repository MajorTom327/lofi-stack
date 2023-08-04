import Button from "../Button";
import errorImage from "./error.jpeg";
import { Links, Meta } from "@remix-run/react";
import type { ErrorResponse } from "@remix-run/router";
import React from "react";
import Card from "~/components/Card";

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
            <Card
              className="-mt-32"
              imgSrc={errorImage}
              imgAlt="Obi-Wan Kenobi saying 'I feel a disturbance in the force'"
            >
              <Card.Title center>I feel a disturbance in the force</Card.Title>

              <h1 className="text-4xl">{error.status}</h1>
              <h2 className="text-2xl">{error.statusText}</h2>
              <Card.Actions>
                {error.status === 401 ? (
                  <Button color="primary" to="/login">
                    Login
                  </Button>
                ) : (
                  <Button color="primary" to="/">
                    Go back to the home page
                  </Button>
                )}
              </Card.Actions>
            </Card>
          </div>
        </body>
      </html>
    </>
  );
};

RouteErrorHandler.defaultProps = {};

export default RouteErrorHandler;
