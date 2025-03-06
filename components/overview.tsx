"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
import { ArrowDown, ArrowUp } from "lucide-react"

const chartData = [
	{ month: "January", income: 186, expenses: 80 },
	{ month: "February", income: 305, expenses: 200 },
	{ month: "March", income: 237, expenses: 120 },
	{ month: "April", income: 73, expenses: 190 },
	{ month: "May", income: 209, expenses: 130 },
	{ month: "June", income: 214, expenses: 140 },
]

const chartConfig = {
	income: {
		label: "Income",
		color: "#2563eb",
		icon: ArrowUp
	},
	expenses: {
		label: "Expenses",
		color: "#60a5fa",
		icon: ArrowDown
	},
} satisfies ChartConfig

const Overview = () => {
	return (
		<article className="w-full p-6">
			<h2 className="text-xl mb-4">Status</h2>
			<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
				<BarChart accessibilityLayer data={chartData}>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="month"
						tickLine={false}
						tickMargin={10}
						axisLine={false}
						tickFormatter={(value) => value.slice(0, 3)}
					/>
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Bar dataKey="income" fill="var(--color-income)" radius={4} />
					<Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
				</BarChart>
			</ChartContainer>
		</article>
	)
}

export default Overview