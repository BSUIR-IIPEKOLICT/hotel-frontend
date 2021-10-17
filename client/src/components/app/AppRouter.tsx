import React, {useContext} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {authRoutes, publicRoutes} from '../../shared/routes'
import {mainRoute} from '../../shared/constants'
import {Context} from '../../index'

export const AppRouter: React.FC = () => {
    const {user} = useContext(Context)

    return (
        <Switch>
            {user.isAuth && authRoutes.map(({path, component}) => (
                <Route key={path} path={path} component={component} exact />
            ))}

            {publicRoutes.map(({path, component}) => (
                <Route key={path} path={path} component={component} exact />
            ))}
            
            <Redirect to={mainRoute} />
        </Switch>
    )
}
