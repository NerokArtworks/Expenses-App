"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const loginSchema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: z.infer<typeof loginSchema>) => {
		setLoading(true);

		const res = await fetch("/api/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});

		setLoading(false);

		if (res.ok) {
			router.push("/");
		} else {
			alert("Invalid credentials.");
		}
	};

	return (
		<div className="flex items-center justify-center">
			<Card className="w-full max-w-md p-6 shadow-lg animate-fadeIn">
				<CardHeader>
					<CardTitle className="text-center text-2xl">Login</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" type="email" {...register("email")} />
							{errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input id="password" type="password" {...register("password")} />
							{errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
						</div>
						<Button type="submit" className="w-full cursor-pointer" disabled={loading}>
							{loading ? <Loader2 className="animate-spin" /> : "Login"}
						</Button>
					</form>
				</CardContent>
				<CardFooter className="text-center">
					<p className="text-sm text-gray-600 dark:text-gray-400">
						Don&apos;t have an account?{" "}
						<Link href="/register" className="text-primary hover:underline">
							Sign up
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
