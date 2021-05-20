import PcHeader from "./PcHeader"

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

export const Header: React.FC<Props> = (Props) => (
  <div className="relative bg-white">
    <PcHeader menuItems={Props.menuItems} />

    <div className="absolute inset-x-0 top-0 p-2 transition origin-top-right transform md:hidden">
      <div className="bg-white divide-y-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-gray-50">
        <div className="px-5 pt-5 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <img
                className="w-auto h-8"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
            </div>
            <div className="-mr-2">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Close menu</span>
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-6">
            <nav className="grid gap-y-8">
              <a className="flex items-center p-3 -m-3 rounded-md hover:bg-gray-50">
                <svg
                  className="flex-shrink-0 w-6 h-6 text-indigo-600"
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span className="ml-3 text-base font-medium text-gray-900">
                  Analytics
                </span>
              </a>

              <a className="flex items-center p-3 -m-3 rounded-md hover:bg-gray-50">
                <svg
                  className="flex-shrink-0 w-6 h-6 text-indigo-600"
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
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
                <span className="ml-3 text-base font-medium text-gray-900">
                  Engagement
                </span>
              </a>

              <a className="flex items-center p-3 -m-3 rounded-md hover:bg-gray-50">
                <svg
                  className="flex-shrink-0 w-6 h-6 text-indigo-600"
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className="ml-3 text-base font-medium text-gray-900">
                  Security
                </span>
              </a>

              <a className="flex items-center p-3 -m-3 rounded-md hover:bg-gray-50">
                <svg
                  className="flex-shrink-0 w-6 h-6 text-indigo-600"
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
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                <span className="ml-3 text-base font-medium text-gray-900">
                  Integrations
                </span>
              </a>

              <a className="flex items-center p-3 -m-3 rounded-md hover:bg-gray-50">
                <svg
                  className="flex-shrink-0 w-6 h-6 text-indigo-600"
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span className="ml-3 text-base font-medium text-gray-900">
                  Automations
                </span>
              </a>
            </nav>
          </div>
        </div>
        <div className="px-5 py-6 space-y-6">
          <div className="grid grid-cols-2 gap-y-4 gap-x-8">
            <a className="text-base font-medium text-gray-900 hover:text-gray-700">
              Pricing
            </a>

            <a className="text-base font-medium text-gray-900 hover:text-gray-700">
              Docs
            </a>

            <a className="text-base font-medium text-gray-900 hover:text-gray-700">
              Enterprise
            </a>

            <a className="text-base font-medium text-gray-900 hover:text-gray-700">
              Blog
            </a>

            <a className="text-base font-medium text-gray-900 hover:text-gray-700">
              Help Center
            </a>

            <a className="text-base font-medium text-gray-900 hover:text-gray-700">
              Guides
            </a>

            <a className="text-base font-medium text-gray-900 hover:text-gray-700">
              Security
            </a>

            <a className="text-base font-medium text-gray-900 hover:text-gray-700">
              Events
            </a>
          </div>
          <div>
            <a className="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700">
              Sign up
            </a>
            <p className="mt-6 text-base font-medium text-center text-gray-500">
              Existing customer?
              <a className="text-indigo-600 hover:text-indigo-500">Sign in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)
