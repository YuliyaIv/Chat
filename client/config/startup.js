import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { trySignIn, tryGetUserInfo } from '../redux/reducers/reducerAuth'

const Startup = (props) => {
  const dispatch = useDispatch()
  const { token } = useSelector((s) => s.reducerAuth)
  useEffect(() => {
    if (token) {
      dispatch(trySignIn())
    }
    dispatch(tryGetUserInfo())
  }, [dispatch, token])

  return props.children
}

Startup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
}

export default Startup
