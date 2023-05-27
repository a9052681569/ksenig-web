import { FC } from 'react';
import './Button.scss';
import { ButtonProps } from './Button.types';

export const Button: FC<ButtonProps> = ({ children, className, ...props }) => (
	<button className={`button ${className}`} {...props}>
		{children}
	</button>
);
