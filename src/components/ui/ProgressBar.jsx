import React from "react"

const ProgressBar = ({ value = 0, className = "", ...props }) => {
  return (
    <div
      className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`}
      {...props}
    >
      <div
        className="bg-primary h-full transition-all duration-300"
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  )
}

export default ProgressBar