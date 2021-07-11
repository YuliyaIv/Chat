/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { Provider, useSelector } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, Redirect, StaticRouter } from 'react-router-dom'
import store, { history } from '../redux'
import App from '../components/App'

import NotFound from '../components/404'
import Startup from './startup'
import RegisterWrapper from '../components/loginAndRegister/RegisterWrapper'
import LoginWrapper from '../components/loginAndRegister/LoginWrapper'

// const Register = React.lazy(() => import('../components/loginAndRegister/RegisterWrapper'))
// const Test = (
//   <Suspense fallback={<h1>Loading profile...</h1>}>
//     <Register />
//   </Suspense>
// )

const OnlyAnonymousRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((s) => s.reducerAuth)
  const func = (props) =>
    !!auth.user && !!auth.token ? (
      <Redirect to={{ pathname: '/private' }} />
    ) : (
      <Component {...props} />
    )
  return <Route {...rest} render={func} />
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((s) => s.reducerAuth)
  const func = (props) =>
    !!auth.user && !!auth.token ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login'
        }}
      />
    )
  return <Route {...rest} render={func} />
}

const types = {
  component: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string
  }),
  token: PropTypes.string
}

const defaults = {
  location: {
    pathname: ''
  },
  user: null,
  token: ''
}

OnlyAnonymousRoute.propTypes = types
PrivateRoute.propTypes = types

PrivateRoute.defaultProps = defaults
OnlyAnonymousRoute.defaultProps = defaults

const RouterSelector = (props) =>
  typeof window !== 'undefined' ? <ConnectedRouter {...props} /> : <StaticRouter {...props} />

const RootComponent = (props) => {
  return (
    <Provider store={store}>
      <RouterSelector history={history} location={props.location} context={props.context}>
        <Startup>
          <Switch>
            {/* <Route exact path="/" component={() => <LoginWrapper />} />
            <Route exact path="/dashboard" component={() => <App />} />
            <Route exact path="/regis" component={() => <RegisterWrapper />} />
            <Route exact path="/auth" component={() => <LoginWrapper />} />
            <OnlyAnonymousRoute exact path="/login" component={() => <LoginWrapper />} />
            <PrivateRoute exact path="/private" component={() => <App />} />
            <Route component={() => <NotFound />} /> */}
            <Route exact path="/" component={() => <App />} />
            <Route exact path="/dashboard" component={() => <App />} />
            <Route exact path="/regis" component={() => <App />} />
            <Route exact path="/auth" component={() => <App />} />
            <OnlyAnonymousRoute exact path="/login" component={() => <App />} />
            <PrivateRoute exact path="/private" component={() => <App />} />
            <Route component={() => <NotFound />} />
          </Switch>
        </Startup>
      </RouterSelector>
    </Provider>
  )
}

export default RootComponent
