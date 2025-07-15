import { defineAction} from "astro:actions";
import { z } from "astro:schema";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { firebase } from "src/firebase/config";

export const loginWithGoogle = defineAction({
    accept: 'json',
    input: z.any(),
    handler: async (credentials) => {

        const credential = GoogleAuthProvider.credentialFromResult(credentials);

        if (!credential) {
            throw new Error("GoogleSignIn falló");
        }

        await signInWithCredential(firebase.auth, credential);

        return {ok: true};
    }
});