import { useState } from "react";
import { auth } from "../firebaseConfig";
import {  signInWithEmailAndPassword } from "firebase/auth";

// @ts-ignore
const AuthModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleAuth = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } 
            onClose();
        } catch (err) {
            // @ts-ignore
            setError(err.message);
        }
    };

    return isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold mb-4">{"Login"}</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleAuth}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mb-4">
                        Login
                    </button>
                </form>
                <button
                    onClick={onClose}
                    className="mt-0 w-full p-2 bg-gray-500 text-white rounded"
                >
                    Close
                </button>
            </div>
        </div>
    ) : null;
};

export default AuthModal;
