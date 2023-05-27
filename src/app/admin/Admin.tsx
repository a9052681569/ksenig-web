import { FC } from 'react';
import { useGetUserQuery } from '../../api/apiSlice';
import { AdminProps } from './Admin.types';
import { LoginForm } from './LoginForm/LoginForm';

import './Admin.scss';
import { CreateTempUserForm } from './CreateTempUserForm/CreateTempUserForm';
import { TempUsersList } from './TempUsersList/TempUsersList';

export const Admin: FC<AdminProps> = () => {
	const { data, isFetching } = useGetUserQuery();

	if (!data && !isFetching) {
		return (
			<div className="container container--login">
				<LoginForm />
			</div>
		);
	}

	return (
		<div className="container">
			<CreateTempUserForm />

			<TempUsersList />
		</div>
	);
};
