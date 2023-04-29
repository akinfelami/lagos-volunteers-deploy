import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import { Button, Grid, Stack } from '@mui/material';
import { useAuth } from '@/utils/AuthContext';
import Login from '@/components/Login';
import { BASE_URL } from '@/utils/constants';
import { auth } from '@/utils/firebase';

const Home = () => {
	const { user, loading, error, signOutUser } = useAuth();
	const [userDetails, setUserDetails] = useState<any>(null);

	const handleSignOut = async () => {
		await signOutUser();
	};

	const fetchUserDetails = async () => {
		try {
			const url = BASE_URL as string;
			const fetchUrl = `${url}/users/search/?email=asu284@cornell.edu`; // Note that this is bound to change based on a fix we are making to the backend

			// Get the user's token. Notice that auth is imported from firebase file
			const userToken = await auth.currentUser?.getIdToken();
			const response = await fetch(fetchUrl, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			});
			const data = await response.json();
			console.log(data)
			setUserDetails(data);
		} catch (error) {
			console.log(error);
		}
	};

	if (!user) {
		return <Login />;
	}

	// Temporary fetch request to test if the backend is running
	useEffect(() => {
		try {
			// Note how BASE_URL is imported from a constants file and type casted to a string
			const url = BASE_URL as string;
			fetch(url).then((data) => console.log(data));
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<>
			<Head>
				<title>Volunteer Platform</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<Grid
					container
					height='100vh'
					alignItems='center'
					justifyContent='center'
					direction='column'>
					<h1 className='text-blue-300'>Using Material UI with Next.js</h1>
					<Stack direction='row' columnGap={1}>
						<Button variant='text'>Text</Button>
						<Button variant='contained' onClick={() => console.log(user)}>
							Contained
						</Button>
						<Button onClick={handleSignOut} variant='outlined'>
							Click to Sign out
						</Button>
						<Button variant='contained' onClick={fetchUserDetails}>
							Get a user's details from Custom Backend
						</Button>
					</Stack>
					<div>
						{userDetails === null ? (
							<p>Nothing yet!</p>
						) : (
							<p>
								Hi, this data was fetched from the backend. My name is{' '}
								{userDetails['data'][0]['profile']['firstName']}
							</p>
						)}
					</div>
				</Grid>
			</main>
		</>
	);
};

export default Home;
