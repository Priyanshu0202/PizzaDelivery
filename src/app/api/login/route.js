import { NextResponse } from "next/server";
import cookie from "cookie";

export async function POST(req) {
  const { username, password } = await req.json();

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const response = NextResponse.json({
      message: "Successful",
      token: process.env.TOKEN,
      isAdmin: true,
    });
    response.headers.set(
      "Set-Cookie",
      cookie.serialize("token", process.env.TOKEN, {
        maxAge: 60 * 60, // 1 hour
        sameSite: "strict",
        path: "/",
      })
    );
    return response;
  } else {
    return NextResponse.json(
      { message: "Wrong Credentials!" },
      { status: 400 }
    );
  }
}
