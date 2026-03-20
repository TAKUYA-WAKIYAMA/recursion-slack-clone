import React, { useEffect, useState } from 'react';
import SideBar from "./components/SideBar";
import ChatContainer from "./components/ChatContainer";
import Login from "./components/Login";
import {useAppSelector, useAppDispatch} from "./app/hooks";
import { auth } from "./features/auth/Auth";
import { login, logout } from "./features/user/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { getOrCreateUser } from "./features/user/userAPI";

function App() {
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.user.userId);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                await getOrCreateUser(uid, {
                    email: email ?? "",
                    displayName: displayName ?? "",
                    profile_picture: photoURL ?? "",
                });
                dispatch(login(uid));
            } else {
                dispatch(logout());
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [dispatch]);

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    return (
        <div className="flex">
            {userId ? (
                <>
                <SideBar/>
                <ChatContainer/>
                </>
            ) : (
                <Login/>
            )}
        </div>
    );
}

export default App;