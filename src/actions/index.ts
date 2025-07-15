import { loginUser, loginWithGoogle, logout, registerUser } from "./auth";

export const server = {

    //? AUTH
    registerUser,
    logout,
    loginUser,
    loginWithGoogle,
};