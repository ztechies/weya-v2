import { regFormData } from "@/types/Type";

export async function regUser(payload: regFormData) {
    try {
        const response = await fetch('/api/user/reg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        if (!response.ok) {
            return { error: { status: response.status, message: data.error?.message || 'An error occurred', path: data.error?.path } };
        }else if(data?.error?.message){
            return { error: { status: response.status, message: data.error?.message || 'An error occurred', path: data.error?.path } };
        }
        return data;
    } catch (error: any) {
        console.error('Registration failed:', error);
        // Return a structured error response for network or unexpected errors
        return { error: { message: error.message || 'Network error occurred' } };
    }
}
