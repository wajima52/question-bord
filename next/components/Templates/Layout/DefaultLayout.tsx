import React from "react"
import { Header, HeaderProps } from "../../Organisms/Header/Header"

type Props = HeaderProps

const DefaultLayout: React.FC<Props> = ({ children, ...headerProps }) => {
  return (
    <>
      <Header {...headerProps} />
      <div
        className={
          "pt-20 min-h-0 lg:min-h-screen flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8"
        }
      >
        {children}
      </div>
    </>
  )
}

export default DefaultLayout
