import { FC } from 'react';
import { useGetTemoraryUsersQuery, useGetUserQuery } from '../../api/apiSlice';
import { AdminProps } from './Admin.types';
import { LoginForm } from './LoginForm/LoginForm';

export const Admin: FC<AdminProps> = () => {
	const { data, isFetching } = useGetUserQuery();

	const { data: tempUsers } = useGetTemoraryUsersQuery();

	console.log(tempUsers);

	if (!data && !isFetching) {
		return <LoginForm />;
	}

	return <div>hello admin</div>;
};
