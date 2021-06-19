import type { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const apiResponse = await fetch(process.env.BACKEND_URL + "/signIn", {
    method: "POST",
    body: JSON.stringify(req.body),
    headers: {
      "Content-Type": "application/json",
    },
  })
  res.status(apiResponse.status).json(apiResponse.json())
}
