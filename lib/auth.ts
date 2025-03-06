import { PrismaClient, User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.JWT_SECRET || "super-secret-key";

export function generateToken(userId: string) {
	return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "7d" });
}

export async function getSession(): Promise<User | null> {
	const cookieStore = await cookies();
	const token = cookieStore.get("auth_token")?.value;

	if (!token) return null;

	try {
		const db = new PrismaClient()

		const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };
		const user = await db.user.findUnique({ where: { id: decoded.userId } });

		if (!user) return null;

		return user;
	} catch {
		return null;
	}
}
