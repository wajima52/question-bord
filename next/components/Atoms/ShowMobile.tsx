import React from "react"

const ShowMobile: React.FC = ({ children }) => (
  <div className={"inline-block lg:hidden"}>{children}</div>
)

export default ShowMobile
