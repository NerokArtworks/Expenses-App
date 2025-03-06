import { SidebarTrigger } from "./ui/sidebar"

const Header = () => {
	return (
		<div className="bg-sidebar flex items-center">
			<SidebarTrigger className="w-12 h-12" />
		</div>
	)
}

export default Header