import { ReactElement } from "react"

export type ToggleProps = {
  isOpen: boolean
  children: ReactElement
}

const ToggleMenu: React.FC<ToggleProps> = ({ children, isOpen }) => {
  return (
    <div
      className={`w-full block transition-height flex-grow lg:flex lg:items-center lg:w-auto overflow-hidden 
       h-${isOpen ? "auto" : "0"} lg:h-auto`}
    >
      {children}
    </div>
  )
}

export default ToggleMenu
