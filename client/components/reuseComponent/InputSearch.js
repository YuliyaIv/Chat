import React from 'react'

const InputSearch = ({ textPlaceholder }) => {
  return (
    <div className="flex flex-row items-center py-1 px-1 rounded-2xl mb-5 shadow bg-gray-100  ">
      <input
        type="search"
        className="flex flex-grow-0 w-4/5 bg-purple-white shadow py-1 px-1  rounded-2xl  focus:outline-none "
        placeholder={textPlaceholder}
      />
      <button
        type="button"
        className="focus:outline-none h-full w-1/5 mr-2 ml-1 flex flex-grow items-center justify-center   bg-gray-200 text-gray-500 rounded-full focus:outline-none "
      >
        <svg
          className="w-4 h-4 stroke-current"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  )
}
InputSearch.propType = {}

export default React.memo(InputSearch)
