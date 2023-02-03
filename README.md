## About

This is the source code for my site [danielbly.dev](https://danielbly.dev). It utilizes [Next.js](https://nextjs.org/) for generating the site, features an interactive [ts-particles](https://particles.js.org/) background and leverages the GitHub API for programatically giving read access to private repositories. [FormBold](https://formbold.com/) is also used to handle form submissions.

## Getting Started

First, [generate a GitHub api key](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) for the relevant account and [create a form via FormBold](https://app.formbold.com/login).

Next, create a `.env.local` file in the root of the project. Inside this, set up the following enviroment variables:

```
GITHUB_OWNER=<Your GitHub Username>
GITHUB_SECRET=<GitHub API Key>

# Passwords for programatic access to private repositories. E.g.:
FLICKA_PASS=<Password>
DATASET_PASS=<Password>
COMMUTE_V2_PASS=<Password>
COMMUTE_V3_PASS=<Password>

FORM_URL=<FormBold URL>
```

Finally, update the `validRepos` array at the top of `pages/api/add-github-collaborator.ts` to match the repositories you wish to grant access to.

**Note:** You do not need to do setup for the GitHub API ***if you are not linking to private repositories***. Simply remove the `onClick` call from the *Live App* anchor tags in `pages/index.tsx` and replace it with a `href` linking to your public repository.


To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
