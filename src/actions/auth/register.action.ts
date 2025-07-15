import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import type { AuthError } from 'firebase/auth';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';

import { firebase } from '../../firebase/config';

export const registerUser = defineAction({
    accept: "form",
    input: z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6),
        remember_me: z.boolean().optional()
    }),
    handler: async ({ name, email, password, remember_me }, { cookies }) => {

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

        // Creacion de usuario
        try {

            const user = await createUserWithEmailAndPassword(firebase.auth, email, password);

            if (!firebase.auth.currentUser) {
                throw new Error("Error al crear el usuario");
            }

            // Actualizar el nombre (displayName)
            await updateProfile(firebase.auth.currentUser,{
                displayName: name,
            });

            // Verificar el email
            await sendEmailVerification(firebase.auth.currentUser, {
                url: `${import.meta.env.WEBSITE_URL}/protected?emailVerified=true`,
            });


            return user.user.displayName;

        } catch (error) {
            const firebaseError = error as AuthError;

            if (firebaseError.code === "auth/email-already-in-use") {
                throw new Error("El email ya esta en uso");
            }

            throw new Error("Error al crear el usuario");
        }
    }
});