import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import InputSearch from '../reuseComponent/InputSearch'
import UserDataCard from './UserDataCard'
import ModalWindow from '../reuseComponent/ModalWindow'
import UserDataCardInfo from './UserDataCardInfo'

const UserList = () => {
  const { cardOfUsers } = useSelector((s) => s.reducerDataCard)
  const [flagModalWindow, setflagModalWindow] = useState(false)

  const colorStyle = (data) =>
    `flex items-center justify-center h-10 w-10 rounded-full bg-${data}-700 text-gray-300 font-bold flex-shrink-0 mr-2`

  const rerenderUsersInfo = Object.keys(cardOfUsers).map((id) => {
    return (
      <UserDataCard
        key={id}
        cardOfUsers={cardOfUsers}
        colorStyle={colorStyle}
        id={id}
        setflagModalWindow={setflagModalWindow}
        flagModalWindow={flagModalWindow}
      />
    )
  })

  return (
    <div>
      <InputSearch textPlaceholder="Search by name..." />
      <div className="flex flex-row items-center">
        <div className="text-xl font-semibold mb-5">Users</div>
      </div>
      <hr className="bg-cyan-900 h-0.5" />
      <div className="container flex mx-auto w-full items-center justify-center mt-2">
        <ul className="flex flex-col  p-2">{rerenderUsersInfo}</ul>
      </div>
      {flagModalWindow && <ModalWindow comp={<UserDataCardInfo />} />}
    </div>
  )
}

UserList.propType = {}
export default UserList
