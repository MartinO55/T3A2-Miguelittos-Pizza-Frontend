import apiUrl from '../config/api';

export async function signUp(data) {
	const response = await apiUrl.post('/api/auth/sign_up', data)  

    return response.data
}
export async function signIn(data) {
    const response = await apiUrl.post('/api/auth/sign_in', data)  

    return response.data
}
export async function signOut(data) {
	// sign in on server
	return data.username
}