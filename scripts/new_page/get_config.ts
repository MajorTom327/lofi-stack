import path from "path";

export type Config = {
  projectPath: string;
  pageName: string;
  pageClass: string;
};

export const clean_pagename = (pageName: string): string => {
  return pageName.replace(/ /g, "-").replace(/:/g, "$").replace(/\//g, ".");
};

export const pagename_to_classname = (
  pageName: string,
  charList = ["-", ".", "$"],
): string => {
  if (charList.length === 0) {
    return pageName;
  }
  const charToHandle = charList[0];
  const cleanName = pageName
    .split(charToHandle)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
  return pagename_to_classname(cleanName, charList.slice(1));
};

export const get_config = (): Config => {
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    console.error("Usage: new_page <page_name>");
    process.exit(1);
  }

  const projectPath = path.resolve(process.cwd(), "app");
  const pageName = clean_pagename(args[0]);
  const pageClass = pagename_to_classname(pageName);

  return {
    projectPath,
    pageName,
    pageClass,
  };
};
