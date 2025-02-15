import Header from "@/components/Header";
import { userObject } from "@/lib/types";
import { Outlet, useLoaderData } from "react-router-dom";

function ProtectedRoot() {
  const { user } = useLoaderData() as {
    user: userObject;
  };

  return (
    <>
      <Header user={user} />
      <Outlet />
    </>
  );
}

export default ProtectedRoot;
