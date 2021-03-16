import React from 'react'

const ButtonTheme = () => {
  return (
    <div>
      <button
        type="button"
        className="mt-auto flex items-center justify-center hover:text-indigo-100 text-indigo-500 h-10 w-10"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </button>
    </div>
  )
}

ButtonTheme.propType = {}

export default ButtonTheme
