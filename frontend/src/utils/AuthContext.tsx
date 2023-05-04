import React, {
	createContext,
	useState,
	useContext,
	useEffect,
	ReactNode,
} from 'react';
import { auth } from './firebase';
import { User, AuthError, signOut, signInWithCustomToken } from 'firebase/auth';
import {
	useAuthState,
	useSignInWithEmailAndPassword,
	useCreateUserWithEmailAndPassword,
	useSignOut,
} from 'react-firebase-hooks/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';

// Define types for authentication context value
type AuthContextValue = {
	user: User | null | undefined;
	loading: boolean;
	error?: AuthError | Error | null | undefined;
	signInUser: (email: string, password: string) => Promise<void>;
	signOutUser: () => Promise<void>;
	signInUserWithCustomToken: (token: string) => Promise<void>;
	createFirebaseUser: (email: string, password: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue>({
	user: undefined,
	loading: true,
	signInUser: async () => {},
	signInUserWithCustomToken: async () => {},
	signOutUser: async () => {},
	createFirebaseUser: async () => {},
});

// Define props type for authentication provider
type AuthProviderProps = {
	children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, loading, error] = useAuthState(auth);
	const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
	const [createUserWithEmailAndPassword] =
		useCreateUserWithEmailAndPassword(auth);
	const [signOut] = useSignOut(auth);

	const router = useRouter();

	const createFirebaseUser = async (email: string, password: string) => {
		try {
			await createUserWithEmailAndPassword(email, password);
		} catch (error) {
			//TODO: Handle Different Auth Errors
			console.log(error);
		}
	};

	const signInUserWithCustomToken = async (token: string) => {
		try {
			const result = await signInWithCustomToken(auth, token);
		} catch (error) {
			console.log(error);
		}
	};

	const signInUser = async (email: string, password: string) => {
		try {
			const result = await signInWithEmailAndPassword(email, password);
			console.log(result);
		} catch (error) {
			// TODO: Handle Different Auth Errors
			console.log(error);
		}
	};

	const signOutUser = async () => {
		try {
			await signOut();
		} catch (error) {
			console.log(error);
		}
	};

	const value = {
		user,
		loading,
		error,
		signInUser,
		signOutUser,
		signInUserWithCustomToken,
		createFirebaseUser,
	};


	// Note: Authentication works. If a user tries to access a protected route, there are 
	// redirects to the login page. However, the page flashes for a second before the redirect
	// happens. This is because the user is initially undefined, and then the user is set to null
	// and then the redirect happens. This is not ideal, but it works for now.



	useEffect(() => {

		const unsub = onAuthStateChanged(auth, (authUser) => {
			if (!authUser) {
				router.replace('/login');
			}
		});
		return unsub;
	}, [user]);

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
