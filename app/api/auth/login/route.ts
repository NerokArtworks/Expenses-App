import { generateToken } from "@/lib/auth"; // Función para generar el token
import { PrismaClient } from "@prisma/client"; // Prisma Client
import bcrypt from "bcrypt"; // Librería para comparar contraseñas
import { NextResponse } from "next/server"; // Respuesta HTTP para Next.js

export async function POST(req: Request) {
	const { email, password } = await req.json();

	if (!email || !password) {
		return NextResponse.json({ error: "Missing fields" }, { status: 400 });
	}

	try {
		const db = new PrismaClient();

		const user = await db.user.findUnique({
			where: { email },
		});

		if (!user) {
			return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
		}

		const token = generateToken(user.id);

		const response = NextResponse.json({ message: "Login successful!" }, { status: 200 });
		response.cookies.set("auth_token", token, { httpOnly: true, secure: true, path: "/" });

		return response;
	} catch (error) {
		console.log(error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
