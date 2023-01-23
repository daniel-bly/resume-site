// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type Data = {
  success: boolean,
  error?: string
}

type Repo = {
  name: string,
  password: string
}

const validRepos: Repo[]  = []

validRepos.push(
  {
    name: 'flicka',
    password: process.env.FLICKA_PASS || 'test1234'
  },
  {
    name: 'dataset',
    password: process.env.DATASET_PASS || 'test1234'
  },
  {
    name: 'commute-v2',
    password: process.env.COMMUTE_V2_PASS || 'test1234'
  },
  {
    name: 'commute-v3',
    password: process.env.COMMUTE_V3_PASS || 'test1234'
  }
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { repo, username, pass } = req.body
  console.log(req.body)

  const validRepo = validRepos.filter(obj => {
    return (obj.name === repo)
  })

  if(validRepo && validRepo[0].password === pass) {
    const result = await axios.put(`https://api.github.com/repos/${process.env.GITHUB_OWNER}/${repo}/collaborators/${username}`, { permission: "read" }, {
      headers: {
        "Authorization": "Bearer " + process.env.GITHUB_SECRET,
        "X-GitHub-Api-Version": "2022-11-28",
        "Accept": "application/vnd.github+json"
      }
    })

    if(result.status == 201) {
      res.status(201).json({ success: true })
    } else {
      res.status(400).json({ success: false, error: result.data.message })
    }

  } else {
    res.status(401).json({ success: false, error: 'Password incorrect.'}) // Repo should always be valid unless someone is calling this from outside of the application
  }
}
