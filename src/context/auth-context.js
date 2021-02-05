import { createContext } from "react";

export const AuthContext = createContext({
	userName: null,
	userImage: null,
	isLoggedIn: false,
	userId: null,
	token: null,
	login: () => {},
	logout: () => {},
});
