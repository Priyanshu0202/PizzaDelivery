import { NextResponse } from "next/server";

export function middleware(req) {
  console.log("Middleware executed");
  const token = req.cookies.get("token");
  if (typeof window != "undefined") {
    const test = localStorage.getItem("priyanshu");
    console.log(test);
  }
  if (!token) {
    console.log("No token found, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log("Token found, proceeding to admin");
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin"],
};
