import { createBrowserRouter } from 'react-router-dom';
import { App } from './app/App';
import { Admin } from './app/admin/Admin';
import { Main } from './app/Content/Main/Main';
import { Nda } from './app/Content/Nda/Nda';

export const appRouter = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		loader: (args): string | null => {
			const url = new URL(args.request.url);
			const id = url.searchParams.get('id');

			return id;
		},
		children: [
			{
				path: '/',
				element: <Main />
			},
			{
				path: 'nda',
				element: <Nda />
			}
		]
	},
	{
		path: 'admin',
		element: <Admin />
	}
]);
