import { Links, Meta } from "@remix-run/react";
import type { ErrorResponse } from "@remix-run/router";
import React from "react";
import { Card } from "react-daisyui";

import { ButtonLink } from "../ButtonLink";
import errorImage from "./error.jpeg";

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
              <Card.Image
                src={errorImage}
                alt="Obi-Wan Kenobi saying 'I feel a disturbance in the force'"
              />
              <Card.Body>
                <Card.Title className="text-2xl">
                  I feel a disturbance in the force
                </Card.Title>

                <h1 className="text-4xl">{error.status}</h1>
                <h2 className="text-2xl">{error.statusText}</h2>
                <Card.Actions>
                  <ButtonLink color="ghost" to="/">
                    Go back to the home page
                  </ButtonLink>
                </Card.Actions>
              </Card.Body>
            </Card>
          </div>
        </body>
      </html>
    </>
  );
};

RouteErrorHandler.defaultProps = {};

export default RouteErrorHandler;
