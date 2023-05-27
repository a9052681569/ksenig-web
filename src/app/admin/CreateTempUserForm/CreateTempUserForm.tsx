import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';

import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { useCreateTemporaryUserMutation } from '../../../api/apiSlice';
import { Button } from '../../../shared/components/Button/Button';
import { Input } from '../../../shared/components/Input/Input';
import { CreateTempUserFormData } from './CreateTempUserForm.types';

import './CreateTempUserForm.scss';

export const schema = object<CreateTempUserFormData>({
	comment: string().default('')
}).required();

export const CreateTempUserForm: FC = () => {
	const [createTemp, { isLoading, isError }] = useCreateTemporaryUserMutation();

	const { handleSubmit, control } = useForm<CreateTempUserFormData>({
		resolver: yupResolver(schema),
		defaultValues: schema.getDefault()
	});

	const onSubmit = (data: CreateTempUserFormData): void => {
		createTemp(data);
	};

	return (
		<div className="temp-user-form-container">
			<h4>Создать временный доступ</h4>
			<form onSubmit={handleSubmit(onSubmit)} className="temp-user-form">
				{isError && <span className="temp-user-form__error">Что-то пошло не так</span>}

				<Input<CreateTempUserFormData>
					name="comment"
					disabled={isLoading}
					control={control}
					placeholder="коммент"
				/>

				<Button disabled={isLoading}>{isLoading ? 'Загрузка...' : 'Создать'}</Button>
			</form>
		</div>
	);
};
