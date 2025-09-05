import React from "react"

const Button = ({ 
  children, 
  className = "", 
  onClick, 
  disabled = false, 
  type = "button", 
  variant = "default",
  size = "default",
  ...props 
}) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2 whitespace-nowrap
    font-medium transition-all
    disabled:pointer-events-none disabled:opacity-50
    focus:outline-none focus-visible:ring-2 focus-visible:ring-ring
    hover:scale-105 active:scale-95
  `

  const variants = {
    default: `
      bg-primary text-primary-foreground shadow-xs
      rounded-md text-sm h-9 px-4 py-2
    `,
    primary: `
      bg-gray-900 hover:bg-gray-800 text-white
      rounded-lg text-base h-12 px-8
    `,
    secondary: `
      bg-gray-100 hover:bg-gray-200 text-gray-900
      rounded-lg text-base h-12 px-8
    `,
    outline: `
      border-2 border-gray-900 bg-transparent hover:bg-gray-900 
      text-gray-900 hover:text-white
      rounded-lg text-base h-12 px-8
    `,
    pill: `
      bg-primary hover:bg-primary/90 hover:scale text-white font-bold text-lg
      h-10 px-14  rounded-full transition-all duration-300
    `
  }

  const sizes = {
    sm: "h-8 px-3 text-sm",
    default: "", 
    lg: "h-14 px-10 text-lg"
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={` 
        ${baseStyles}
        ${variants[variant]}
        ${size !== "default" ? sizes[size] : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button