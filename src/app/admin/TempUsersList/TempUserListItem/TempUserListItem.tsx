import { FC, useMemo, useRef, useState } from 'react';
import { Card } from '../../../../shared/components/Card/Card';
import { TempUserListItemProps } from './TempUserListItem.types';
import { IconButton } from '../../../../shared/components/IconButton/IconButton';
import { useDeleteTemporaryUserMutation, useRefreshTemporaryUserMutation } from '../../../../api/apiSlice';
import { pluralize } from '../../../../shared/helpers/pluralizer';
import { ReactComponent as CopyIcon } from '../../../../assets/icons/copy.svg';
import { ReactComponent as RefreshIcon } from '../../../../assets/icons/refresh.svg';
import { ReactComponent as TrashIcon } from '../../../../assets/icons/trash.svg';
import { ReactComponent as CopySuccessIcon } from '../../../../assets/icons/copy-success.svg';

import './TempUserListItem.scss';

const MILLISECONDS_IN_HOUR = 1000 * 60 * 60;
const MILLISECONDS_IN_MINUTE = 1000 * 60;

export const TempUserListItem: FC<TempUserListItemProps> = ({ id, expiresAt, currentTime, comment }) => {
	const copyTimeoutRef = useRef<number | null>(null);
	const [copied, setCopied] = useState(false);

	const [deleteTemp, deleteStatus] = useDeleteTemporaryUserMutation();
	const [refreshTemp, refreshStatus] = useRefreshTemporaryUserMutation();

	const remainingTimeString = useMemo<string>(() => {
		const remainingMilliseconds = expiresAt - currentTime;

		if (remainingMilliseconds < 0) {
			return 'Время истекло';
		}

		const remainingHours = Math.floor(remainingMilliseconds / MILLISECONDS_IN_HOUR);

		const remainingMillisecondsWithoutHours = remainingMilliseconds - MILLISECONDS_IN_HOUR * remainingHours;

		const remainingMinutes = Math.floor(remainingMillisecondsWithoutHours / MILLISECONDS_IN_MINUTE);

		const remainingHoursString = remainingHours > 0 ? `${remainingHours}ч ` : '';

		const remainingMinutesString = remainingMinutes + 'м';

		const remainsString =
			remainingHours > 0
				? pluralize(remainingHours, ['Остался ', 'Осталось ', 'Осталось '])
				: pluralize(remainingMinutes, ['Осталась ', 'Осталось ', 'Осталось ']);

		return remainsString + remainingHoursString + remainingMinutesString;
	}, [expiresAt, currentTime]);

	const handleDelete = (): void => {
		deleteTemp(id);
	};

	const handleRefresh = (): void => {
		refreshTemp(id);
	};

	const handleCopy = (): void => {
		const url = `${window.origin}/?id=${id}`;

		navigator.clipboard.writeText(url);

		setCopied(true);

		if (copyTimeoutRef.current) {
			clearTimeout(copyTimeoutRef.current);
		}

		copyTimeoutRef.current = setTimeout(() => {
			setCopied(false);
			copyTimeoutRef.current = null;
		}, 800) as unknown as number;
	};

	return (
		<Card className="temp-user-list-item">
			{comment && (
				<div>
					<h5>Комментарий</h5>
					<span>{comment}</span>
				</div>
			)}

			<div>
				<h5>Срок жизни</h5>
				<span>{remainingTimeString}</span>
			</div>

			<div className="">
				<IconButton onClick={handleDelete} disabled={deleteStatus.isLoading}>
					<TrashIcon />
				</IconButton>

				<IconButton onClick={handleRefresh} disabled={refreshStatus.isLoading}>
					<RefreshIcon />
				</IconButton>

				<IconButton onClick={handleCopy}>{copied ? <CopySuccessIcon /> : <CopyIcon />}</IconButton>
			</div>
		</Card>
	);
};
