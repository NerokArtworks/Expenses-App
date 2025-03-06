import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
	const token = req.cookies.get("auth_token")?.value;

	console.error(token);

	if (!token) return NextResponse.redirect(new URL("/login", req.url));

	return NextResponse.next();
}

export const config = {
	matcher: ["/"],
};
