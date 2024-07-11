export async function loginUser(payload: { email: string; password: string }) {
    try {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (!response.ok) {
            return { 
                error: { 
                    status: response.status, 
                    message: data.error?.message || 'An error occurred',
                    path: data.error?.path
                }
            };
        }
        return { token: data.token };
    } catch (error: any) {
        console.error('Login failed:', error);
        return { error: { message: error.message || 'Network error occurred' } };
    }
}
