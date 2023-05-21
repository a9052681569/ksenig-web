import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			workbox: {
				globPatterns: ['**/*.{js,css,html,jpg,png,svg}']
			},
			manifest: {
				name: 'ksenig',
				short_name: 'ks',
				description: 'ksenig portfolio app',
				theme_color: '#ffffff',
				icons: [
					{
						src: 'pwa-144x144.png',
						sizes: '144x144',
						type: 'image/png'
					},
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			}
		})
	],
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:3000/',
				changeOrigin: true
			}
		},
		cors: true,
		host: '0.0.0.0'
	}
});
