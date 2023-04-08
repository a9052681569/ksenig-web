import { FC } from 'react';
import { useLoginMutation } from '../../../api/apiSlice';

export const LoginForm: FC = () => {
	const [login] = useLoginMutation();

	const handleClick = (): void => {
		login({
			username: 'aasereb',
			password: 'Bioware9'
		});
	};

	return <div onClick={handleClick}>hello login</div>;
};
