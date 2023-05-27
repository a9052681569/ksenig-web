import { FC } from 'react';
import { CardProps } from './Card.types';

import './Card.scss';

export const Card: FC<CardProps> = ({ className, ...props }) => <div className={`card ${className}`} {...props}></div>;
