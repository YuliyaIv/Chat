import React from 'react'

const InputSearch = ({ textPlaceholder }) => {
  return (
    <div className="flex ml-auto mb-2 bg-gray-200 text-gray-500 rounded-full py-1 px-2">
      <input
        type="search"
        className="flex-grow-0 bg-purple-white shadow rounded-full p-3 h-7 focus:outline-none "
        placeholder={textPlaceholder}
      />
      <button
        type="button"
        className="focus:outline-none flex flex-grow items-center justify-center  bg-gray-200 text-gray-500 rounded-full focus:outline-none"
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

export default InputSearch
