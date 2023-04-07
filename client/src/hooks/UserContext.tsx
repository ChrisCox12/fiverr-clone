/** UserContext exists to help manage user state across the app */

import { useState, useContext, createContext, useReducer } from 'react';
import { UserContextType } from '../types/types';

/* type UserContextType = {
    username: string,
    userId: string,
    image: string,
    isSeller: boolean,
    country: string
} */

export const UserContext = createContext<UserContextType | null>(null); // UserContext is going to be of either type UserContextType or null
export const UserDispatchContext = createContext<React.Dispatch<any> | null>(null); // UserDispatchContext is going to be of either type Dispatch or null

const initialUser = null; // initial state for context

// function that will wrap around other components (children) and provide them with the state and dispatch functionality
export function CurrentUserProvider({ children }) {
    const [user, dispatch] = useReducer(userReducer, initialUser);
    
    return (
        <UserContext.Provider value={user}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    )
}

// reducer function used to define how to update state based on the actions provided
function userReducer(user: any, action: any) {
    switch(action.type) {
        case 'login': {
            return {
                ...user,
                username: action.username,
                userId: action.userId,
                image: action.image,
                isSeller: action.isSeller,
                country: action.country
            };
        }
        case 'logout': {
            return null;
        }
        default: {
            throw Error('Unknown action');
            break;
        }
    }
}

