import ENVIRONMENT from "../config/environment.config";

const API_URL = ENVIRONMENT.API_URL;

const authService = {
    login: async ({email, password}) => {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message);
        }

        return responseData;
    },

    register: async (data) => {
        // data es un objeto con toda la información del formulario
        console.log(data)
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message);
        }

        return responseData;
    },

    logout: async () => {
        const response = await fetch(`${API_URL}/api/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    },

    verifyEmail: async ({verify_email_token}) => {
        const response = await fetch(`${API_URL}/api/auth/verify-email?verify_email_token=${verify_email_token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message);
        }

        return responseData;
    },

    refreshToken: async () => {
        const response = await fetch(`${API_URL}/api/auth/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message);
        }

        return responseData;
    },
}

export default authService;