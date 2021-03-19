import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getDataCard } from '../../redux/reducers/reducerDataCard'

const UserList = () => {
  const dispatch = useDispatch()
  const usersObjectData = useSelector((s) => s.reducerDataCard.cardOfUsers)

  useEffect(() => {
    dispatch(getDataCard())
  }, [usersObjectData])

  const ren = Object.keys(usersObjectData).map((id, index) => (
    <div key={index}>{usersObjectData[id].nameUser}</div>
  ))
  return <div>{ren}</div>
}

UserList.propType = {}

export default UserList
