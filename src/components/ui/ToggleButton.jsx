import React from "react"

const ToggleButton = ({ value, selectedValue, onValueChange, children, className = "", disabled = false, ...props }) => {
  const isSelected = selectedValue === value

  const handleClick = () => {
    if (!disabled) {
      onValueChange?.(value)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`
        w-full p-4 md:p-6 rounded-xl border-2 transition-all duration-200
        flex items-center justify-between text-left
        focus:outline-none
        ${isSelected
          ? "border-gray-900 bg-gray-50"
          : "border-gray-200 bg-white hover:border-gray-300"}
        ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
        ${className}
      `}
      {...props}
    >
      <span className="text-lg md:text-xl font-medium text-gray-900">{children}</span>
      <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center ${
        isSelected ? "border-gray-900 bg-gray-900" : "border-gray-300"
      }`}>
        {isSelected && <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white" />}
      </div>
    </button>
  )
}

export default ToggleButton