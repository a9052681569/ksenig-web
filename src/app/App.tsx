import { FC, useEffect } from 'react';
import { Link, Outlet, useLoaderData } from 'react-router-dom';
import { useLoginMutation } from '../api/apiSlice';
import './App.scss';
import { Header } from './Header/Header';
import { Content } from './Content/Content';

export const App: FC = () => {
	const id = useLoaderData();

	console.log('hello vebonar');

	useEffect(() => {
		if (typeof id === 'string') {
			localStorage.setItem('tempId', id);
		}
	}, [id]);

	return (
		<div className="app">
			<Header className="app__header" />
			<Content className="app__content">
				<Outlet />
			</Content>
		</div>
	);
};
