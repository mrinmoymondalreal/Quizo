import { Link } from "react-router-dom";
import { Button } from "./ui/button";

function Header() {
  const name = "John Doe";
  return (
    <div className="flex flex-row gap-8 gap-x-12 md:py-8 py-4 px-6 md:px-4 justify-between items-center max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Quzio
        </h1>
        |
        <h2 className="text-lg md:text-2xl font-semibold tracking-tight lg:text-3xl">
          Dashboard
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:block">Welcome, {name}</div>
        <Button variant={"link"} className="bg-white text-black-700" asChild>
          <Link to="auth/sign-in">Login</Link>
        </Button>
      </div>
    </div>
  );
}

export default Header;
