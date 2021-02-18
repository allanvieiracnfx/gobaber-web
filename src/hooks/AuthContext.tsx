import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface AuthState {
    token: string;
    user: object;
}

interface ISignInCredetials {
    email: string;
    password: string;
}

interface IAuthContext {
    user: object;
    signIn(credentials: ISignInCredetials): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {

    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@GoBaber:token');
        const user = localStorage.getItem('@GoBaber:user');
    
        if(token && user){
            return { token, user: JSON.parse(user) }
        }

        return {} as AuthState;
    });

    const signIn = useCallback( async ({ email, password }) => {
        const response = await api.post('sessions', {
            email,
            password
        });

        const { token, user } = response.data;

        localStorage.setItem('@GoBaber:token', token);
        localStorage.setItem('@GoBaber:user', JSON.stringify(user));

        setData({ token, user});
    }, []);

    const signOut = useCallback(async () => {
        localStorage.removeItem('@GoBaber:token');
        localStorage.removeItem('@GoBaber:user');
    
        setData({} as AuthState)
    }, []);

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): IAuthContext {
    const context = useContext(AuthContext);

    if(!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth };