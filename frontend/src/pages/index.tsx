import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Button, Grid, Stack } from '@mui/material';
import { useAuth } from '@/utils/AuthContext';
import { BASE_URL } from '@/utils/constants';
import { auth } from '@/utils/firebase';
import { useRouter } from 'next/router';

const Home = () => {
	const { user, loading, error, signOutUser } = useAuth();
	const [userDetails, setUserDetails] = useState<any>(null);

	const router = useRouter();

	const handleSignOut = async () => {
		try {
			await signOutUser();
			router.replace('/login');
		} catch (error) {
			console.log(error);
		}
	};

	const fetchUserDetails = async () => {
		try {
			const url = BASE_URL as string;

			// Get the user's token. Notice that auth is imported from firebase file
			const userId = auth.currentUser?.uid;
			const token = await auth.currentUser?.getIdToken();
			const fetchUrl = `${url}/users/${userId}`;

			const response = await fetch(fetchUrl, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();
			setUserDetails(data);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

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

						{/* <Button onClick={featureTest}>test</Button> */}
					</Stack>
				</Grid>
			</main>
		</>
	);
};

export default Home;
