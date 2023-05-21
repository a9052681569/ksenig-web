import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserData } from '../models/user';
import { LoginData } from '../app/admin/LoginForm/LoginForm.types';
import { TemporaryUserData } from '../models/temp-user';

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
	tagTypes: ['User'],
	endpoints: builder => ({
		getUser: builder.query<UserData, void>({
			query: () => ({
				url: '/auth/profile'
			})
		}),
		login: builder.mutation<UserData, LoginData>({
			query: (data: LoginData) => ({
				url: '/auth/login',
				method: 'POST',
				body: data
			}),
			// запрос логина возвращает данные пользователя, сразу кладем их в кэш запроса данных пользователя
			onCacheEntryAdded: (reqData, { dispatch, cacheDataLoaded }) => {
				cacheDataLoaded.then(({ data }) => {
					const upcertUserAction = apiSlice.util.upsertQueryData<'getUser'>('getUser', undefined, data);

					dispatch(upcertUserAction);
				});
			}
		}),
		getTemoraryUser: builder.query<TemporaryUserData, string>({
			query: (id: string) => '/temporary/' + id
			// // запрос логина возвращает данные пользователя, сразу кладем их в кэш запроса данных пользователя
			// onCacheEntryAdded: reqData => {
			// 	if (reqData) {
			// 		localStorage.setItem('tempId', reqData);
			// 	}
			// }
		}),
		getTemoraryUsers: builder.query<TemporaryUserData[], void>({
			query: () => '/temporary'
		}),
		createTemporaryUser: builder.mutation<TemporaryUserData, void>({
			query: () => ({
				url: '/temporary',
				method: 'POST'
			})
		})
	})
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
	useGetUserQuery,
	useLoginMutation,
	useCreateTemporaryUserMutation,
	useGetTemoraryUserQuery,
	useGetTemoraryUsersQuery
} = apiSlice;
