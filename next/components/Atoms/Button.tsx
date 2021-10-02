import React from "react"

export type ButtonProps = {
  text: string
  type: "button" | "submit" | "reset"
  onClick?: () => void
}
const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      type={props.type}
      className="group w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  )
}

export default Button
