import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import InputSearch from '../reuseComponent/InputSearch'
import { setFlagRenderModalWindow } from '../../redux/reducers/reducerSetFlagRender'
import UserDataCardInfo from './UserDataCardInfo'
import UserDataCard from './UserDataCard'
import ModalWindow from '../reuseComponent/ModalWindow'
import SideBarViewRenderList from './SideBarViewRenderList'

const UserList = () => {
  const dispatch = useDispatch()
  const { cardOfUsers } = useSelector((s) => s.reducerDataCard)
  const { flagRenderModalWindow } = useSelector((s) => s.reducerSetFlagRender)
  const [idForRenderDataCardInfo, setIdForRenderDataCardInfo] = useState()

  const changeFlagModal = () => {
    dispatch(setFlagRenderModalWindow(!flagRenderModalWindow))
  }

  const rerenderUsersInfo = Object.keys(cardOfUsers).map((id) => {
    const colorStyle = (data) =>
      `flex items-center justify-center w-1/5 h-10 rounded-full bg-${data}-700 text-gray-300 font-bold flex-shrink-0 mr-2`
    return (
      <UserDataCard
        key={id}
        cardOfUsers={cardOfUsers}
        colorStyle={colorStyle}
        id={id}
        changeFlagModal={changeFlagModal}
        setIdForRenderDataCardInfo={setIdForRenderDataCardInfo}
      />
    )
  })

  return (
    <div className="flex flex-col h-full w-full">
      <InputSearch textPlaceholder="Search by name..." />
      <div className="flex flex-row items-center">
        <div className="text-xl font-semibold mb-5">Users</div>
      </div>
      <hr className="bg-cyan-900 h-0.5" />
      <SideBarViewRenderList forRender={rerenderUsersInfo} />
      {flagRenderModalWindow && (
        <ModalWindow>
          <UserDataCardInfo
            idOfUser={idForRenderDataCardInfo}
            info={cardOfUsers[idForRenderDataCardInfo]}
          />
        </ModalWindow>
      )}
    </div>
  )
}

UserList.propType = {}

export default UserList
