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
        return response.json();
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
                lastName: data.lastName,
                phone: data.phone,
                birthDate: data.birthDate,
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword,
                address: {
                    street: data.street,
                    number: data.number,
                    floor: data.floor,
                    department: data.department,
                    city: data.city,
                    zipCode: data.zipCode,
                    province: data.province,
                    country: data.country
                }
            }),
        });
        return response.json();
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

    refreshToken: async () => {
        const response = await fetch(`${API_URL}/api/auth/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    },
}

export default authService;