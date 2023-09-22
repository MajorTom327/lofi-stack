import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { isNil } from "ramda";
import { useEffect } from "react";

import { SessionStore } from "~/services/session.server";

import { useToast } from "~/components/ui/use-toast";

type Toast = {
  message: string;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await new SessionStore(request).load();

  const toast = session.get<Toast>("toast");

  return json(
    {
      toast,
    },
    {
      headers: await session.withCookieHeader({}),
    }
  );
};

export const App = () => {
  const { toast } = useLoaderData<typeof loader>();
  const toaster = useToast();

  useEffect(() => {
    if (isNil(toast)) return;

    const { message } = toast;

    toaster.toast({
      title: message,
    });
  }, [toast, toaster]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
