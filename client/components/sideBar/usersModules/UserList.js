import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setFlagRenderModalWindow } from '../../../redux/reducers/reducerSetFlagRender'
import UserDataCardInfo from './UserDataCardInfo'
import UserDataCard from './UserDataCard'

import SideBarViewRenderList from '../SideBarViewRenderList'
import ModalWindow from '../../reuseComponent/ModalWindow'
import InputSearch from '../../reuseComponent/InputSearch'

const UserList = () => {
  const dispatch = useDispatch()
  const { cardOfUsers } = useSelector((s) => s.reducerDataCard)
  const { flagRenderModalWindow } = useSelector((s) => s.reducerSetFlagRender)
  const [idForRenderDataCardInfo, setIdForRenderDataCardInfo] = useState()

  const changeFlagModal = () => {
    dispatch(setFlagRenderModalWindow(!flagRenderModalWindow.flag, 'userList'))
  }

  const rerenderUsersInfo = Object.keys(cardOfUsers).map((id) => {
    return (
      <UserDataCard
        key={id}
        nameUser={cardOfUsers[id].nameUser}
        metaDate={cardOfUsers[id].userMetaDate}
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
        <div className="text-xl font-semibold text-gray-700 mb-5">Users</div>
      </div>
      <hr className="bg-cyan-900 h-0.5" />
      <SideBarViewRenderList forRender={rerenderUsersInfo} />
      {flagRenderModalWindow.flag && flagRenderModalWindow.whatOpen === 'userList' && (
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
