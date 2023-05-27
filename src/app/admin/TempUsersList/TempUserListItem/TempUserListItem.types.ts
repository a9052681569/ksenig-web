import { TemporaryUserData } from '../../../../models/temp-user';

export interface TempUserListItemProps extends TemporaryUserData {
	currentTime: number;
}
