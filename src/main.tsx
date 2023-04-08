import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { appRouter } from './router';
import { Provider } from 'react-redux';
import { store } from './store/store';

createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={appRouter} />
		</Provider>
	</StrictMode>
);
