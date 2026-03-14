import React, { useEffect } from 'react';
import {signInWithGoogle, getGoogleRedirectResult} from "../features/auth/Auth";
import {getOrCreateUser} from "../features/user/userAPI";

const Login = () => {
    useEffect(() => {
        const handleRedirectResult = async () => {
            try {
                const result = await getGoogleRedirectResult();
                if (result) {
                    const { uid, email, displayName, photoURL } = result.user;
                    const user = await getOrCreateUser(uid, {
                        email: email ?? "",
                        displayName: displayName ?? "",
                        profile_picture: photoURL ?? "",
                    });
                    console.log("ログイン成功:", user);
                }
            } catch (error) {
                console.error('Login failed:', error);
            }
        };
        handleRedirectResult();
    }, []);

    const handleLogin = () => {
        signInWithGoogle();
    };

    return (
        <div className="fixed flex inset-0 items-center justify-center bg-gray-500">
            <div className="w-full max-w-xs">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-8">
                        <h1 className="text-3xl text-center text-gray-700 mt-4">Slackにログイン</h1>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleLogin}>
                        ログイン
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;