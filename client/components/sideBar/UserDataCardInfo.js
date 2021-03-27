import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserActivityStatus } from '../../redux/reducers/reducerDataCard'

const UserDataCardInfo = ({ info, setflagModalWindow, flagModalWindow, idOfUser }) => {
  const dispatch = useDispatch()
  const { userActivityStatus } = useSelector((s) => s.reducerDataCard)
  useEffect(() => {
    const modal = document.querySelector('#modal')
    const childModal = document.querySelector('#childModal')

    const handleClickOutside = (e) => {
      if (!e.path.includes(childModal)) {
        setflagModalWindow(!flagModalWindow)
      }
    }
    
    modal.addEventListener('click', (e) => handleClickOutside(e))
    return () => {
      return modal.removeEventListener('click', (e) => handleClickOutside(e))
    }
  }, [])

  useEffect(() => {
    dispatch(getUserActivityStatus(idOfUser))
  }, [])

  const statusOfUser = (status) => {
    switch (status) {
      case 'Online':
        return 'green'
      case 'Offline':
        return 'gray'
      case 'Not disturb':
        return 'red'
      default:
        return 'yellow'
    }
  }

  const stylesOfActivityStatus = `bg-${statusOfUser(
    userActivityStatus
  )}-500 rounded-full w-2.5 h-2.5 block mx-2`
  return (
    <div
      id="modal"
      className="z-100 absolute w-screen h-screen top-0 left-0 flex items-center justify-center  bg-gray-200 bg-opacity-80"
    >
      <div
        id="childModal"
        className="max-w-sm bg-blueGray-300 shadow-lg rounded-lg overflow-hidden my-4  "
      >
        <img
          className="w-full h-56 object-cover object-center"
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
          alt="avatar"
        />
        <div className="flex items-center justify-center px-6 py-3 bg-blueGray-800">
          <h1 className="mx-3 text-white font-semibold text-lg">
            <button
              type="button"
              className=" focus:outline-none focus:outline-none rounded-md bg-cyan-800 hover:bg-cyan-700 text-sm text-blueGray-50 font-bold pt-1 mt-1 pb-2 px-4 inline rounded-lg"
            >
              Send a message
            </button>
          </h1>
        </div>
        <div className="py-4 px-6">
          <div className="flex flex-wrap items-center">
            <h2 className="text-xl font-semibold text-gray-800 flex justify-center mr-3">
              {info.nameUser}
            </h2>
            <span className="flex items-center justify-center content-center border rounded-full h-5 pr-2">
              <div className={stylesOfActivityStatus} />
              {userActivityStatus}
            </span>
          </div>

          <p className="py-2 text-lg text-gray-700">{info.aboutUser}</p>
          <div className="flex items-center mt-4 text-gray-700">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
              <path d="M239.208 343.937c-17.78 10.103-38.342 15.876-60.255 15.876-21.909 0-42.467-5.771-60.246-15.87C71.544 358.331 42.643 406 32 448h293.912c-10.639-42-39.537-89.683-86.704-104.063zM178.953 120.035c-58.479 0-105.886 47.394-105.886 105.858 0 58.464 47.407 105.857 105.886 105.857s105.886-47.394 105.886-105.857c0-58.464-47.408-105.858-105.886-105.858zm0 186.488c-33.671 0-62.445-22.513-73.997-50.523H252.95c-11.554 28.011-40.326 50.523-73.997 50.523z" />
              <g>
                <path d="M322.602 384H480c-10.638-42-39.537-81.691-86.703-96.072-17.781 10.104-38.343 15.873-60.256 15.873-14.823 0-29.024-2.654-42.168-7.49-7.445 12.47-16.927 25.592-27.974 34.906C289.245 341.354 309.146 364 322.602 384zM306.545 200h100.493c-11.554 28-40.327 50.293-73.997 50.293-8.875 0-17.404-1.692-25.375-4.51a128.411 128.411 0 0 1-6.52 25.118c10.066 3.174 20.779 4.862 31.895 4.862 58.479 0 105.886-47.41 105.886-105.872 0-58.465-47.407-105.866-105.886-105.866-37.49 0-70.427 19.703-89.243 49.09C275.607 131.383 298.961 163 306.545 200z" />
              </g>
            </svg>
            <h1 className="px-2 text-sm">MerakiTeam</h1>
          </div>
          <div className="flex items-center mt-4 text-gray-700">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
              <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z" />
            </svg>
            <h1 className="px-2 text-sm">California</h1>
          </div>
          <div className="flex items-center mt-4 text-gray-700">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
              <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z" />
            </svg>
            <h1 className="px-2 text-sm">{info.email}</h1>
          </div>
          <div className="flex items-center mt-4 text-gray-700">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </svg>
            <h1 className="px-2 text-sm">{info.phone}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

UserDataCardInfo.propType = {}

export default UserDataCardInfo
