import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { userObject } from "@/lib/types";
import { getTitle } from "./PageTitle";
import { ChevronLeft } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

function HeaderTitle() {
  const { headerTitle } = getTitle();
  return headerTitle;
}

function BackButton() {
  const { headerTitle } = getTitle();
  const navigate = useNavigate();
  return (
    headerTitle !== "Dashboard" && (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => navigate("/dashboard")}
              className="bg-white text-black-700"
              size={"icon"}
            >
              <ChevronLeft />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Back</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  );
}

function Header({ user }: { user: userObject }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row gap-8 gap-x-12 md:py-8 py-4 px-6 md:px-4 justify-between items-center max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
        <BackButton />
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Quzio
        </h1>
        <span>|</span>
        <h2 className="text-lg md:text-xl font-semibold tracking-tight">
          <HeaderTitle />
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:block">Welcome, {user.username}</div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"link"}
                className="bg-white text-black-700"
                onClick={async (e) => {
                  e.preventDefault();
                  await fetch("http://localhost:3000/logout", {
                    credentials: "include",
                  });
                  navigate("/auth/sign-in");
                }}
              >
                Logout
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Logout from Quizo</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default Header;
