import { NavDropDownMenu } from "components/Molecules/Header/NavDropDownMenu"

type Props = {
  menuItems: {
    itemName: string
    type: "dropDown" | "button"
    itemList?: {
      name: string
      description: string
    }[]
  }[]
}

const PcHeader: React.FC<Props> = (Props) => {
  return (
    <div className="px-4 mx-auto max-w-7xl sm:px-6">
      <div className="flex items-center justify-between py-6 border-b-2 border-gray-100 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <a>
            <span className="sr-only">Workflow</span>
            <img
              className="w-auto h-8 sm:h-10"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt=""
            />
          </a>
        </div>
        <div className="-my-2 -mr-2 md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            aria-expanded="false"
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <nav className="hidden space-x-10 md:flex">
          {Props.menuItems.map((item, index) => {
            return item.type == "dropDown" ? (
              <NavDropDownMenu
                menuName={item.itemName}
                menuList={item.itemList}
              />
            ) : (
              <a
                className="text-base font-medium text-gray-500 hover:text-gray-900"
                key={index}
              >
                {item.itemName}
              </a>
            )
          })}
        </nav>
        <div className="items-center justify-end hidden md:flex md:flex-1 lg:w-0">
          <a className="text-base font-medium text-gray-500 whitespace-nowrap hover:text-gray-900">
            Sign in
          </a>
          <a className="inline-flex items-center justify-center px-4 py-2 ml-8 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm whitespace-nowrap hover:bg-indigo-700">
            Sign up
          </a>
        </div>
      </div>
    </div>
  )
}

export default PcHeader
