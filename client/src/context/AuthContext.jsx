import { createContext, useState, useEffect, useContext } from 'react';
import api, { setAccessToken } from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await api.post('/auth/refresh');
                setAccessToken(data.accessToken);
                const profileRes = await api.get('/auth/profile');
                setUser(profileRes.data);
            } catch (error) {
                console.log('Not authenticated');
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        setAccessToken(data.accessToken);
        setUser({
            _id: data._id,
            name: data.name,
            email: data.email,
            role: data.role
        });
        // Fetch full profile
        const profileRes = await api.get('/auth/profile');
        setUser(profileRes.data);
    };

    const register = async (userData) => {
        const { data } = await api.post('/auth/register', userData);
        setAccessToken(data.accessToken);
        setUser({
            _id: data._id,
            name: data.name,
            email: data.email,
            role: data.role
        });
        // Fetch full profile to ensure consistent state
        const profileRes = await api.get('/auth/profile');
        setUser(profileRes.data);
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout API failed:', error);
        } finally {
            setAccessToken(null);
            setUser(null);
        }
    };

    const refreshProfile = async () => {
        try {
            const profileRes = await api.get('/auth/profile');
            setUser(profileRes.data);
        } catch (error) {
            console.error('Error refreshing profile:', error);
        }
    };

    const forgotPassword = async (email) => {
        return await api.post('/auth/forgot-password', { email });
    };

    const resetPassword = async (token, password) => {
        return await api.put(`/auth/reset-password/${token}`, { password });
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, refreshProfile, forgotPassword, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
};