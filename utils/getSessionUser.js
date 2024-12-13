import { authOptions } from "./authOptions.js";
import { getServerSession } from "next-auth/next";

export const getSessionUser = async (req, res) => {
	const session = await getServerSession(req, res, authOptions);

	if (!session || !session.user) {
		return null;
	}

	return {
		user: session.user,
		userId: session.user.id,
	};
};
