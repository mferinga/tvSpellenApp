import { Post } from "@nestjs/common";

const API_BASE_URL = 'http://localhost:3333/api';

export class authService{

    static async login(formData: {email:string, wachtwoord:string}) {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        });
        
        console.log(response);

        if (!response.ok) {
            const errorText = await response.text();
            //if error 401 show invalid credentials
            throw new Error(errorText);
        }
    
        const data = (await response.json());
        return data;
    }

}
