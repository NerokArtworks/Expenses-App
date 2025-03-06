import { generateToken } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { name, email, password } = await req.json();

	if (!name || !email || !password) {
		return NextResponse.json({ error: "Missing fields" }, { status: 400 });
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const db = new PrismaClient();

		const user = await db.user.create({
			data: { name, email, password: hashedPassword },
		});

		const token = generateToken(user.id);

		const response = NextResponse.json({ message: "User registered!" }, { status: 201 });
		response.cookies.set("auth_token", token, { httpOnly: true, secure: true, path: "/" });

		return response;
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error: "Email already in use" }, { status: 400 });
	}
}
