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

const registerSchema = z.object({
	name: z.string().min(3, "Username must be at least 3 characters"),
	email: z.string().email("Invalid email"),
	password: z.string().min(6, "Password must be at least 6 characters"),
	confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
}).refine(data => data.password === data.confirmPassword, {
	message: "Passwords don't match",
	path: ["confirmPassword"],
});

export default function Register() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: z.infer<typeof registerSchema>) => {
		setLoading(true);

		const res = await fetch("/api/auth/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});

		setLoading(false);

		if (res.ok) {
			router.push("/");
		} else {
			console.log(res)
			alert("Error registering user.");
		}
	};

	return (
		<div className="flex items-center justify-center">
			<Card className="w-full max-w-md p-6 shadow-lg animate-fadeIn">
				<CardHeader>
					<CardTitle className="text-center text-2xl">Register</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<div className="space-y-2">
							<Label htmlFor="name">Username</Label>
							<Input id="name" type="text" {...register("name")} />
							{errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
						</div>
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
						<div className="space-y-2">
							<Label htmlFor="confirmPassword">Confirm Password</Label>
							<Input id="confirmPassword" type="password" {...register("confirmPassword")} />
							{errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
						</div>
						<Button type="submit" className="w-full" disabled={loading}>
							{loading ? <Loader2 className="animate-spin" /> : "Register"}
						</Button>
					</form>
				</CardContent>
				<CardFooter className="text-center">
					<p className="text-sm text-gray-600 dark:text-gray-400">
						Already have an account?{" "}
						<Link href="/login" className="text-primary hover:underline">
							Login
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
