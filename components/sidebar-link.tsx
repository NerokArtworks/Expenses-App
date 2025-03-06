"use client"

import Link from "next/link"

interface SidebarLinkProps {
	href: string
	icon: React.ReactNode
	label: string
	active: boolean
	onClick: () => void
}

const SidebarLink = ({ href, icon, label, active, onClick }: SidebarLinkProps) => {
	return (
		<Link
			href={href}
			className={`flex items-center space-x-2 p-2 rounded-lg text-primary hover:bg-primary/5 transition-all ${active ? "bg-primary/10 hover:bg-primary/20" : ""}`}
			onClick={onClick}
		>
			{icon}
			<span>{label}</span>
		</Link>
	)
}

export default SidebarLink
