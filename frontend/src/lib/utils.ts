import { clsx, type ClassValue } from "clsx";
import { redirect } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${date.getDate()} ${month[date.getMonth()]}, ${date.getFullYear()}`;
}

export async function rootLoader() {
  const resp = await fetch("http://localhost:3000/user", {
    credentials: "include",
  });
  if (resp.status === 200) return { user: await resp.json() };
  return redirect("/auth/sign-in");
}
