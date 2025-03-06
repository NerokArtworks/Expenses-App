"use client"

import { useState } from "react"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Category, Prisma } from "@prisma/client"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"

const ExpenseForm = () => {
	const [amount, setAmount] = useState("")
	const [description, setDescription] = useState("")
	const [categoryId, setCategoryId] = useState<string | null>(null)
	const [tags] = useState<string[]>([])
	const router = useRouter()

	const { data: categories } = useQuery<Category[]>({
		queryKey: ['categories'],
		queryFn: async () => {
			const res = await fetch("/api/categories")
			return res.json()
		},
	})

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const expenseData: Prisma.ExpenseCreateInput = {
			amount: parseFloat(amount),
			description,
			categoryId,
			tags: tags.length > 0
				? { connect: tags.map((tagId) => ({ id: tagId })) }
				: undefined,
		}


		const res = await fetch("/api/expenses", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(expenseData),
		})

		if (res.ok) {
			router.push("/dashboard")
		} else {
			// Handle error
		}
	}

	return (
		<QueryClientProvider client={new QueryClient}>
		<form onSubmit={handleSubmit} className="space-y-4">
			<Input
				type="number"
				placeholder="Amount"
				value={amount}
				onChange={(e) => setAmount(e.target.value)}
				required
			/>

			<Input
				type="text"
				placeholder="Description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>

			<Select value={categoryId ?? ''} onValueChange={setCategoryId} required>
				<SelectTrigger>
					<SelectValue placeholder="Select Category" />
				</SelectTrigger>
				<SelectContent>
					{categories?.map((category) => (
						<SelectItem key={category.id} value={category.id}>
							{category.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			<Button type="submit">Create Expense</Button>
		</form>
		</QueryClientProvider>
	)
}

export default ExpenseForm
