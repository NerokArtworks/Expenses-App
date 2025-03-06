"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
	const { setTheme, theme } = useTheme()

	const isDarkMode = theme === "dark"

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="relative flex items-center justify-center p-2 rounded-full transition-all hover:bg-primary/10"
				>
					{/* Sol */}
					<Sun
						className={`h-6 w-6 transition-all duration-300 transform ${
							isDarkMode ? "opacity-0 scale-0" : "opacity-100 scale-100"
						}`}
					/>
					{/* Luna */}
					<Moon
						className={`h-6 w-6 transition-all duration-300 transform absolute ${
							isDarkMode ? "opacity-100 scale-100" : "opacity-0 scale-0"
						}`}
					/>
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="center" className="bg-background shadow-lg rounded-md">
				<DropdownMenuItem onClick={() => setTheme("light")}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
