import { FC, useMemo } from 'react';
import { useGetTemoraryUserQuery } from '../../../api/apiSlice';
import { TemporaryUserData } from '../../../models/temp-user';
import blackImg from '../../../assets/black.jpeg';

export const Nda: FC = () => {
	const { data: tempUserData } = useGetTemoraryUserQuery(localStorage.getItem('tempId') as string);

	const canSee = useMemo(() => {
		if (tempUserData) {
			return (tempUserData as unknown as TemporaryUserData).expiresAt - Date.now() > 0;
		}

		return null;
	}, [tempUserData]);

	if (canSee) {
		return (
			<div>
				<h4>Привет сладкий</h4>
				<img src={blackImg} />
			</div>
		);
	} else if (canSee !== null) {
		return (
			<div>
				<h4>Твой доступ истек, сладкий</h4>
			</div>
		);
	}

	return <div>сорян, нет доступа</div>;
};
