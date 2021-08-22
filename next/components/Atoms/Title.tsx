import React from "react"

export type TitleProps = {
  text: string
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <h3 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
      {text}
    </h3>
  )
}

export default Title
