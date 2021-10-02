import type { NextApiRequest, NextApiResponse } from "next"
import { post } from "../../utils/helpers/client"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const apiResponse = await post(process.env.BACKEND_URL + "/login", req.body)

    res.status(200).json(apiResponse)
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(Number(error.message)).json("login error")
  }
}
