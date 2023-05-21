import { FC } from 'react';
import { useGetTemoraryUserQuery, useGetUserQuery } from '../../../api/apiSlice';
import blackImg from '../../../assets/black.jpeg';
import { tempIdLocalStorageKey } from '../../constants';

export const Nda: FC = () => {
	const { data: tempUserData } = useGetTemoraryUserQuery(localStorage.getItem(tempIdLocalStorageKey) || '');

	const { data: userData } = useGetUserQuery();

	// если есть данные временного пользователя и его время еще не истекло
	if ((tempUserData && tempUserData.expiresAt - Date.now() > 0) || (userData && userData.roles.includes('Admin'))) {
		return (
			<div>
				<h4>Привет сладкий</h4>
				<img src={blackImg} />
			</div>
		);
		// если есть данные временного пользователя, но он уже не может смотреть
	} else if (tempUserData) {
		return (
			<div>
				<h4>Твой доступ истек, сладкий</h4>
			</div>
		);
	}

	return <div>сорян, нет доступа</div>;
};
