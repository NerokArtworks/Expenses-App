"use client";

import { useDashboard } from "@/contexts/dashboard-context";
import { Expense } from "@prisma/client";
import { Loader2, Trash } from "lucide-react";
import { toast } from "sonner";

const Transactions = () => {
	const { expenses, isLoading, deleteExpense } = useDashboard();

	const handleDelete = async (id: string) => {
		const response = await deleteExpense(id);

		if (!response) {
			toast.error("Error when deleting the expense.")
			return false
		}

		toast.success("Expense has been deleted.")
	};

	return (
		<article className="w-full p-6">
			<h2 className="text-xl mb-4">Transactions</h2>
			{isLoading ? (
				<article className="w-full p-6 flex justify-center items-center">
					<Loader2 className="animate-spin" />
				</article>
			) : (
				<div className="flex flex-col space-y-4">
					{expenses.length === 0 ? (
						<span className="text-sm">You haven't registered any transactions yet!</span>
					) : (
						expenses.map((expense: Expense) => (
							<div key={expense.id} className="flex justify-between items-center bg-secondary p-4 rounded-lg space-x-4 shadow hover:shadow-md hover:bg-secondary/80 transition-all duration-150">
								<div className="w-full flex justify-between items-center">
									<div className="flex items-end space-x-2">
										<span>$</span>
										<span className="text-2xl font-bold">
											{expense.amount.toString()}
										</span>
									</div>
									{/* <p>{expense.categoryId ?? 'Unknown'}</p>  */}
									<p>Date: {new Date(expense.createdAt).toLocaleDateString()}</p>
								</div>
								<button
									onClick={() => handleDelete(expense.id)}
									className="text-red-500 hover:text-red-700"
									aria-label={`Delete transaction ${expense.id}`}
								>
									<div className="p-2 bg-red-100 border border-red-300 rounded-md cursor-pointer">
										<Trash />
									</div>
								</button>
							</div>
						))
					)}
				</div>
			)}
		</article>
	);
};

export default Transactions;
