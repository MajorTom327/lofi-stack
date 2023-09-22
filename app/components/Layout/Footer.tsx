import classNames from "classnames";
import React from "react";

import { useEnvValue } from "~/hooks/useEnv";

import { Separator } from "../ui/separator";

type Props = {
  className?: string;
};

export const Footer: React.FC<Props> = ({ className }) => {
  const footerClasses = classNames(
    "bg-primary text-primary-foreground p-4",
    className
  );

  const appName = useEnvValue("APP_NAME");

  return (
    <>
      <footer className={footerClasses}>
        <div className="container mx-auto my-2">
          <div className="flex justify-center gap-6">
            <div>
              {appName} &copy; 2023 - {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

Footer.defaultProps = {};

export default Footer;
