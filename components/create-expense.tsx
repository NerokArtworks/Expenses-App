"use client"

import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Plus } from "lucide-react"

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { toast } from "sonner"
import { useDashboard } from "@/contexts/dashboard-context"

const CreateExpense = () => {
	const { handleCreateExpense } = useDashboard();
	const [amount, setAmount] = useState("")
	const [tag, setTag] = useState("")
	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	const submitExpense = async (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!amount || !tag) {
			toast.error("Please fill in all fields.")
			return
		}

		setLoading(true)

		const newExpense: CreateExpenseBody = {
			amount,
			tag
		}

		const response = await handleCreateExpense(newExpense);

		if (!response) {
			toast.error("Something went wrong. Try again.")
			return
		}

		toast.success("Expense has been created.")
		setAmount("")
		setTag("")
		setOpen(false)
		setLoading(false)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="w-full flex items-center justify-between cursor-pointer space-x-2 py-6 rounded-lg hover:rounded-r-[32px] text-primary bg-primary hover:bg-primary/90 transition-all group">
					<span className="text-secondary group-hover:translate-x-2 transition-transform duration-300">
						Create expense
					</span>
					<Plus className="group-hover:rotate-180 transition-transform duration-300 text-secondary" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create expense</DialogTitle>
					<DialogDescription>
						Submit the amount of the expense. You can tag it by selecting it.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="amount" className="text-right">
							Amount
						</Label>
						<Input
							id="amount"
							placeholder="$"
							className="col-span-3"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="tag">Tag</Label>
						<Select value={tag} onValueChange={setTag}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Select a tag" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="transport">Transport</SelectItem>
									<SelectItem value="food">Food</SelectItem>
									<SelectItem value="games">Games</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div>
				<DialogFooter>
						<Button 
							type="submit" 
							onClick={submitExpense} 
							className="w-full cursor-pointer"
							disabled={loading}
						>
							{loading ? <Loader2 className="animate-spin" /> : "Submit expense!"}
						</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default CreateExpense