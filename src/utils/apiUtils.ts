export const prepareHeaders = (headers: Headers ) => {
    const userData: any = localStorage.getItem('token');
    const token = JSON.parse(userData)?.access_token;

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
};
