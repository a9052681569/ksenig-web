import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { useLoginMutation } from '../../../api/apiSlice';
import { Button } from '../../../shared/components/Button/Button';
import { Input } from '../../../shared/components/Input/Input';
import { LoginData } from './LoginForm.types';

import './LoginForm.scss';

export const schema = object({
	username: string().default('').required('а как без имени?').min(3, 'имя минимум из трех символов, такие правила'),
	password: string().default('').required('сорян, без пароля не выйдет')
}).required();

export const LoginForm: FC = () => {
	const [login, { isLoading, isError }] = useLoginMutation();

	const { handleSubmit, control } = useForm<LoginData>({
		resolver: yupResolver(schema),
		defaultValues: schema.getDefault()
	});

	const onSubmit = (loginData: LoginData): void => {
		login(loginData);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="login-form">
			<Input<LoginData> name="username" disabled={isLoading} control={control} placeholder="логин" />

			<Input<LoginData>
				name="password"
				disabled={isLoading}
				control={control}
				placeholder="пароль"
				type="password"
			/>

			{isError && <span className="login-form__error">Косячные данные, подумай еще</span>}

			<Button disabled={isLoading}>{isLoading ? 'Загрузка...' : 'Войти'}</Button>
		</form>
	);
};
