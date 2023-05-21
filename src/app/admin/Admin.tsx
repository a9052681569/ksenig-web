import { FC } from 'react';
import { useGetUserQuery } from '../../api/apiSlice';
import { AdminProps } from './Admin.types';
import { LoginForm } from './LoginForm/LoginForm';

export const Admin: FC<AdminProps> = () => {
	const { data, isFetching } = useGetUserQuery();

	if (!data && !isFetching) {
		return <LoginForm />;
	}

	return <div>hello admin</div>;
};
