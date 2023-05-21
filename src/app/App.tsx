import { FC, useEffect } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import './App.scss';
import { Content } from './Content/Content';
import { Header } from './Header/Header';
import { tempIdLocalStorageKey } from './constants';

import { useRegisterSW } from 'virtual:pwa-register/react';

export const App: FC = () => {
	const id = useLoaderData();

	useEffect(() => {
		if (typeof id === 'string') {
			localStorage.setItem(tempIdLocalStorageKey, id);
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
