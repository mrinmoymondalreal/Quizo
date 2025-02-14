import Quiz from "@/components/Quiz";
import { useLocation } from "react-router-dom";

export function loader() {
  return null;
}

function Page() {
  const location = useLocation();
  const isNewPage = location.pathname === "/create-quiz";
  return isNewPage ? <Quiz /> : "edit existing quiz";
}

export const element = <Page />;
