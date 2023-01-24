// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type Data = {
  success: boolean,
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const result = await axios.post("https://formbold.com/s/" + process.env.FORM_URL, req.body)

    if(result && result.status === 201) {
        res.status(201).json({ success: true })
    } else {
        console.log(result?.status)
        res.status(400).json({ success: false })
    }
}
