import { NextApiRequest, NextApiResponse } from "next"
import { get } from "../../../../../utils/helpers/client"

type EmailVerificationQuery = {
  id: string
  hash: string
  expires: string
  signature: string
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query = <EmailVerificationQuery>req.query
    const apiResponse = await get(
      process.env.BACKEND_URL +
        `/email/verification/${query.id}/${query.hash}?expires=${query.expires}&signature=${query.signature}`
    )

    res.redirect("/email/verify/success")
  } catch (error: Error) {
    res.redirect("/email/verify/error")
  }
}
