import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET() {
	const cookieStore = await cookies();
	const token = cookieStore.get("auth_token")?.value;

	if (!token) {
		return new Response("Unauthorized", { status: 401 });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
		const user = await prisma.user.findUnique({
			where: { id: decoded.userId },
		});

		if (!user) {
			return new Response("User not found", { status: 404 });
		}

		return new Response(JSON.stringify(user), { status: 200 });
	} catch (error) {
		console.log(error)
		return new Response("Invalid or expired token", { status: 401 });
	}
}
