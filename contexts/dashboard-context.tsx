"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Expense } from "@prisma/client";

type DashboardContextType = {
	expenses: Expense[];
	isLoading: boolean;
	handleCreateExpense: (newExpense: CreateExpenseBody) => Promise<boolean>;
	deleteExpense: (id: string) => Promise<boolean>;
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
	const [expenses, setExpenses] = useState<Expense[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchExpenses = async () => {
			try {
				const res = await fetch("/api/expense");
				if (!res.ok) throw new Error("Failed to fetch");

				const data = await res.json();
				setExpenses(data);
			} catch (error) {
				console.error("Error fetching expenses:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchExpenses();
	}, []);

	const handleCreateExpense = async (newExpense: CreateExpenseBody) => {
		try {
			const res = await fetch("/api/expense/create", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newExpense),
			});

			if (!res.ok) throw new Error("Failed to create expense");

			const createdExpense = await res.json();
			setExpenses((prev) => [...prev, createdExpense]);
			return true
		} catch (error) {
			console.error("Error creating expense:", error);
			return false
		}
	};

	const deleteExpense = async (id: string) => {
		try {
			const res = await fetch(`/api/expense/${id}`, { method: 'DELETE' });

			if (!res.ok) throw new Error("Failed to delete expense");

			setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));

			return true
		} catch (error) {
			console.error('Failed to delete expense:', error);
			return false
		}
	};

	return (
		<DashboardContext.Provider value={{ expenses, isLoading, handleCreateExpense, deleteExpense }}>
			{children}
		</DashboardContext.Provider>
	);
};

export const useDashboard = () => {
	const context = useContext(DashboardContext);
	if (!context) throw new Error("useDashboard must be used within a DashboardProvider");
	return context;
};