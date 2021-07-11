import React, { useState } from 'react'
import PropTypes from 'prop-types'

const FormAddChannel = ({ runDispatchFromAcceptButton, triggerModal, triggerChannel }) => {
  const [nameChannel, setNameChannel] = useState('')
  const [description, setDescription] = useState('')

  const changeNameChannel = (e) => {
    setNameChannel(e.target.value)
  }
  const changeDescription = (e) => {
    setDescription(e.target.value)
  }

  const clearForm = (e) => {
    e.preventDefault()
    setNameChannel('')
    setDescription('')
    triggerModal()
    triggerChannel()
  }
  const createNewChannel = (event) => {
    runDispatchFromAcceptButton(nameChannel, description)
    clearForm(event)
  }
  const closeForm = (event) => {
    clearForm(event)
  }

  return (
    <div className="font-sans container mx-auto px-4">
      <div className="relative flex flex-col sm:justify-center items-center bg-opacity-100 ">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-teal-600 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6" />
          <div className="card bg-lime-600 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6" />
          <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
            <div className="block text-sm text-gray-700 text-center font-semibold">
              Create channel
            </div>
            <form onSubmit={createNewChannel} method="#" action="#" className="mt-10">
              <div>
                <input
                  value={nameChannel}
                  type="text"
                  onChange={changeNameChannel}
                  placeholder=" Channel name"
                  className="focus:outline-none mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>

              <div className="mt-7">
                <input
                  value={description}
                  onChange={changeDescription}
                  type="text"
                  placeholder=" Description"
                  className="focus:outline-none mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>

              <div className="flex mt-7 items-center text-center">
                <hr className="border-gray-300 border-1 w-full rounded-md" />
              </div>

              <div className="flex mt-7 justify-center w-full">
                <button
                  onClick={createNewChannel}
                  type="button"
                  className="focus:outline-none  mr-5 bg-teal-600 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                >
                  Accept
                </button>

                <button
                  onClick={closeForm}
                  type="button"
                  className="focus:outline-none bg-lime-600 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                >
                  Сancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

FormAddChannel.propTypes = {
  runDispatchFromAcceptButton: PropTypes.func.isRequired,
  triggerModal: PropTypes.func.isRequired,
  triggerChannel: PropTypes.func.isRequired
}
export default React.memo(FormAddChannel)
