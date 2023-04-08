import { FC, HTMLAttributes } from 'react';
import './Content.scss';

export const Content: FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => <div className="content">{children}</div>;
