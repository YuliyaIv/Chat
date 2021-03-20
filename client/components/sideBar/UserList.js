import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getDataCard } from '../../redux/reducers/reducerDataCard'

const UserList = () => {
  const dispatch = useDispatch()
  const usersObjectData = useSelector((s) => s.reducerDataCard.cardOfUsers)

  useEffect(() => {
    dispatch(getDataCard())
  }, [usersObjectData])

  const reuserInfon = Object.keys(usersObjectData).map((id, index) => (
    <div key={index + 5}>
      <li className="border-gray-400 flex flex-row mb-2">
        <div className="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-cyan-500 text-gray-300 font-bold flex-shrink-0 mr-2">
            {usersObjectData[id].nameUser[0]}
          </div>
          <div className="flex-1 pl-1 mr-16">
            <div className="font-medium">{usersObjectData[id].nameUser}</div>
          </div>
          <div className="text-gray-600 text-xs">1:00 PM</div>
        </div>
      </li>
    </div>
  ))
  return (
    <div>
      <div className="flex flex-row items-center">
        <div className="text-xl font-semibold mb-5">Users</div>
      </div>
      <hr className="bg-cyan-900 h-0.5" />
      <div className="container flex mx-auto w-full items-center justify-center mt-2">
        <ul className="flex flex-col  p-2">{reuserInfon}</ul>
      </div>
    </div>
  )
}

UserList.propType = {}

export default UserList
