import { FC, useEffect, useMemo, useState } from 'react';
import { useGetTemoraryUsersQuery } from '../../../api/apiSlice';
import './TempUsersList.scss';
import { TempUserListItem } from './TempUserListItem/TempUserListItem';
import { TemporaryUserData } from '../../../models/temp-user';

export const TempUsersList: FC = () => {
	const [currentTime, setCurrentTime] = useState<number>(Date.now());
	const { data, isFetching } = useGetTemoraryUsersQuery();

	useEffect(() => {
		setInterval(() => {
			setCurrentTime(Date.now());
		}, 1000);
	}, []);

	const sortedData = useMemo<TemporaryUserData[]>(() => {
		if (data) {
			return data.slice().sort((aVar, bVar) => bVar.expiresAt - aVar.expiresAt);
		}

		return [];
	}, [data]);

	if (!data && !isFetching) {
		return <span>нет данных</span>;
	}

	return (
		<div className="temp-users-list">
			{!isFetching &&
				sortedData.map(tempData => (
					<TempUserListItem key={tempData.id} {...tempData} currentTime={currentTime} />
				))}
		</div>
	);
};
