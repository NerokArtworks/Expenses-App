import { getSession } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const session = await getSession();
		if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

		const { amount, categoryId, description, date, tags } = await req.json();

		if (!amount || isNaN(parseFloat(amount))) {
			return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
		}

		const db = new PrismaClient();

		const expense = await db.expense.create({
			data: {
				amount: parseFloat(amount),
				categoryId: categoryId || null,
				description: description || null,
				date: date ? new Date(date) : new Date(),
				userId: session.id,
				tags: tags ? { create: tags.map((tag: string) => ({ tag })) } : undefined,
			},
			include: { tags: true },
		});

		return NextResponse.json(expense, { status: 201 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
	}
}
