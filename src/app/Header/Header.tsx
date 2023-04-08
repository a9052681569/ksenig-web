import { FC, HTMLAttributes } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';
import { bemClasses } from '../../shared/helpers/bem';

const [headerClass, , headerModifier] = bemClasses('header');
const [navItemClass] = headerModifier('nav-item');

export const Header: FC<HTMLAttributes<HTMLDivElement>> = () => (
	<div className={headerClass}>
		<NavLink to="/" className={navItemClass}>
			main
		</NavLink>
		<NavLink to="nda" className={navItemClass}>
			nda
		</NavLink>
	</div>
);
