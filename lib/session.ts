import { User } from "@prisma/client";

export const fetchUser = async (): Promise<User | null> => {
	const res = await fetch('/api/auth/user');

	if (!res.ok) {
		return null
	}

	const user = await res.json();
	return user;
};
