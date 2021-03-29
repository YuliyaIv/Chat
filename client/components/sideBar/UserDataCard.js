import React from 'react'

const UserDataCard = ({
  cardOfUsers,
  colorStyle,
  id,
  setflagModalWindow,
  flagModalWindow,
  setIdForRenderDataCardInfo
}) => {
  return (
    <button
      type="button"
      className="focus:outline-none"
      key={id}
      onClick={() => {
        setIdForRenderDataCardInfo(id)
        setflagModalWindow(!flagModalWindow)
      }}
    >
      <li className="border-gray-400 flex flex-row mb-2">
        <div className="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
          <div className={colorStyle(cardOfUsers[id].userMetaDate.defaultAvatar)}>
            {cardOfUsers[id].nameUser[0]}
          </div>
          <div className="flex-1 pl-1 mr-16">
            <div className="font-medium">{cardOfUsers[id].nameUser}</div>
          </div>
          <div className="text-gray-600 text-xs">
            <nobr>1:00 PM</nobr>
          </div>
        </div>
      </li>
    </button>
  )
}

UserDataCard.propType = {}

export default React.memo(UserDataCard)
