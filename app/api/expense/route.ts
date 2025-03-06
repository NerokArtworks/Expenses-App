import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET() {
	try {
		const token = (await cookies()).get("auth_token")?.value;
		if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

		const expenses = await prisma.expense.findMany({
			where: { userId: decoded.userId },
			include: {
				tags: true
			}
		});

		console.log(expenses)

		return NextResponse.json(expenses);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
	}
}