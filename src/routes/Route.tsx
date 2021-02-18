import React from 'react';
import { RouteProps as ReactRoutrerProps, Route as ReactRoute, Redirect } from 'react-router-dom';

import { useAuth } from '../hooks/AuthContext';

interface IRouteProps extends ReactRoutrerProps {
    isPrivite?: boolean;
    component: React.ComponentType;
}

const Route: React.FC<IRouteProps> = ({ isPrivite = false, component: Component, ...rest }) => {
    const { user } = useAuth();
    console.log(user);
    console.log(isPrivite);
    return (
        <ReactRoute
            {...rest}
            render={({ location }) => {
                return isPrivite === !!user ?
                    (<Component />) : (<Redirect to={{
                        pathname: isPrivite ? '/' : '/dashboard',
                        state: { from: location },
                    }} />)
            }}
        />
    )
};

export default Route;