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
    (req, res) => {
      // Successful authentication, redirect to /[passportId]/auth/github-success
      // TODO
      console.info('req:', req)
      console.info('res:', res)
    }
  )

export default handler
