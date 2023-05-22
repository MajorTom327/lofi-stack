import { isNotNilOrEmpty } from "ramda-adjunct";
import React from "react";
import { CodeMockup } from "react-daisyui";

import { isDevelopment } from "~/lib/isEnv";

type Props = {
  error: any;
};

export const GeneralErrorHandler: React.FC<Props> = ({ error }) => {
  return (
    <>
      <div className="w-full h-full bg-error/75 text-error-content rounded-xl border border-error shadow p-12">
        <div className="flex flex-col justify-center items-center h-full gap-4">
          <div className="flex flex-col gap-2 items-center">
            <h1 className="text-4xl font-bold ">Error</h1>
            <h2 className="text-2xl">
              {error.message || "Something goes wrong !"}
            </h2>
          </div>
          {isDevelopment() && isNotNilOrEmpty(error.stack) && (
            <CodeMockup>
              <CodeMockup.Line>
                {error.stack.replace(/ {2,}/gi, "        ")}
              </CodeMockup.Line>
              {/* {error.stack.split("\n").map((line: string, index: number) => (
                <CodeMockup.Line key={index}>{line}</CodeMockup.Line>
              ))} */}
            </CodeMockup>
          )}
        </div>
      </div>
    </>
  );
};

GeneralErrorHandler.defaultProps = {};

export default GeneralErrorHandler;
