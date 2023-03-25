import { FC } from 'react';
import './App.scss';
import catPic from './assets/cat.jpg';

export const App: FC = () => (
	<div className="App">
		<h1>Ты котик</h1>
		<img src={catPic} />
	</div>
);
