import nc from "next-connect"
const passport = require('passport')

const failurePath = `/233/auth/github` // TODO: get [passportId]
console.info('failurePath:', failurePath)

// Handle GitHub response
const handler = nc()
  .get(
    passport.authenticate('github', {
      session: false,
      failureRedirect: failurePath
    }),
    (req: any, res: any) => {
      // Successful authentication
      console.info('Successful authentication')
      
      // Get GitHub username
      const username: string = req.user.username
      console.info('username', username)

      // Redirect to /[passportId]/auth/github-success
      res.redirect(`/233/auth/github-success?username=${username}`)
    }
  )

export default handler
