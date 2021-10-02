import type { NextApiRequest, NextApiResponse } from "next"
import { get } from "../../utils/helpers/client"
import { User } from "../../utils/interfaces/User"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const headers = new Headers()
    headers.append("Authorization", req.headers.authorization)
    const user = await get<User>(process.env.BACKEND_URL + "/user", {
      headers: headers,
    })
    res.status(200).json({ isLoggedIn: true, ...user })
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(Number(error.message)).json({ isLoggedIn: false })
  }
}
