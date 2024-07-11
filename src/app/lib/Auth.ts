'use client'
export const isAuthenticated = async () => {
    try {
        const token = window.localStorage.getItem('weya-userToken');
        if (!token) {
            return null;
        } 
        return token;
    } catch (error) {
        console.error('Error fetching user role:', error);
        throw error;
    }
};
