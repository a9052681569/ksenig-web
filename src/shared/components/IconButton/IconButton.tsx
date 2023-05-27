import { FC } from 'react';
import './IconButton.scss';
import { IconButtonProps } from './IconButton.types';

export const IconButton: FC<IconButtonProps> = ({ children, className, ...props }) => (
	<button className={`icon-button ${className}`} {...props}>
		{children}
	</button>
);
