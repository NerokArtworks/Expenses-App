import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
	try {
		const token = (await cookies()).get("auth_token")?.value;
		if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

		const url = new URL(req.url);
		const id = url.pathname.split("/").pop();

		console.log(url, id)

		if (!id) {
			return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
		}

		const expense = await prisma.expense.delete({
			where: { id: id, userId: decoded.userId },
		});

		return NextResponse.json({ message: "Transaction deleted successfully", expense });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
	}
}