export default function AuthLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="bg-sidebar p-12 h-screen max-h-screen flex items-center justify-center">
			{children}
		</main>
	)
}