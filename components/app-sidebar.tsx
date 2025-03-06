"use client"

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"

import { Home, LogOut, Settings, TrendingUp, UserCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import CreateExpense from "./create-expense"
import { ModeToggle } from "./mode-toggle"
import { Separator } from "./ui/separator"

const items = [
	{ title: "Dashboard", url: "/", icon: Home },
	{ title: "Overview", url: "/overview", icon: TrendingUp },
	{ title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
	const router = useRouter()

	const handleLogout = async () => {
		const res = await fetch("/api/auth/logout", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
		})
		if (res.ok) {
			router.push("/login")
		}
	}

	return (
		<Sidebar className="bg-sidebar flex flex-col space-y-4 rounded-r-2xl">
			<SidebarHeader>
				<div className="flex flex-col items-center space-y-4">
					<h1 className="text-2xl font-medium text-primary">ExpenseTracker</h1>
					<div className="flex items-center gap-4">
						<UserCircle className="w-12 h-12 stroke-1 rounded-full" />
						<ModeToggle />
					</div>
				</div>
			</SidebarHeader>

			<SidebarContent className="py-4 px-6">
				<CreateExpense />
				<Separator className="border-t border-primary/20 my-4" />

				<SidebarGroup>
					<SidebarGroupLabel>Navigation</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url} className="flex items-center space-x-2 p-2 rounded-lg text-primary hover:bg-primary/5 transition-all">
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<Separator className="border-t border-primary/20 my-4" />
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenuButton asChild>
					<button 
						className="w-full flex items-center space-x-2 p-2 rounded-lg text-primary hover:bg-primary/5 transition-all cursor-pointer"
						onClick={handleLogout}
					>
						<LogOut />
						<span>Logout</span>
					</button>
				</SidebarMenuButton>

				<div className="mt-6 text-center text-sm text-primary/60">
					<p>Graph or statistics here</p>
				</div>

				<div className="bg-primary/10 text-primary p-4 rounded-lg mt-4">
					<h3 className="text-lg font-medium">Your Budget</h3>
					<p className="text-sm mt-2">Track your expenses and set your monthly budget goals!</p>
				</div>
			</SidebarFooter>
		</Sidebar>
	)
}