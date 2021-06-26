import { useRef } from "react"

export type ToggleProps = {
  isOpen: boolean
  children: HTMLElement
}

const Toggle: React.FC<ToggleProps> = ({ children, isOpen }) => {
  const ref = useRef(null)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const toggleHeight: number =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-plus-operands
    ref && ref.current ? ref.current.scrollHeight + 20 : 0
  return (
    <div
      className={`w-full block transition-height duration-300 flex-grow lg:flex lg:items-center lg:w-auto overflow-hidden 
       lg:h-auto`}
      style={{ height: isOpen ? `${toggleHeight.toString()}px` : "0px" }}
    >
      <div ref={ref}>{children}</div>
    </div>
  )
}

export default Toggle
