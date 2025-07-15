import { defineAction } from "astro:actions";
import { z } from "astro:schema";

import { signInWithEmailAndPassword } from 'firebase/auth';
import type { AuthError } from 'firebase/auth';

import { firebase } from '../../firebase/config';

export const loginUser = defineAction({
    accept: "form",
    input: z.object({
        email: z.string().email(),
        password: z.string().min(6),
        remember_me: z.boolean().optional()
    }),
    handler: async ({ email, password, remember_me}, { cookies }) => {

        // Cookies
        if (remember_me) {
            cookies.set("email", email, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 AÑO PARA EXPIRAR LA COOKIE
                path: "/"
            });
        } else {
            cookies.delete("email", {
                path: "/"
            });
        }

        try {

            const user = await signInWithEmailAndPassword(firebase.auth, email, password);

            return user.user.displayName;
            
        } catch (error) {

            const firebaseError = error as AuthError;

            if (firebaseError.code === "auth/invalid-credential") {
                throw new Error("Credenciales invalidas");
            }

            throw new Error("Error al crear el usuario");
            
        }

        return;
    }
});