import nc from "next-connect"
import { useRouter } from "next/router"
const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy

// const router = useRouter()
// const passportId = router.query.passportId
// console.info('passportId:', passportId)

// Configure strategy
const callbackBaseUrl = process.env['GITHUB_CALLBACK_BASE_URL']
console.info('callbackBaseUrl:', callbackBaseUrl)
const callbackUrl = `${callbackBaseUrl}/api/233/auth/github-callback` // TODO: get [passportId]
console.info('callbackUrl:', callbackUrl)
passport.use(new GitHubStrategy(
  {
    clientID: process.env['GITHUB_CLIENT_ID'],
    clientSecret: process.env['GITHUB_CLIENT_SECRET'],
    callbackURL: callbackUrl
  },
  function(accessToken: any, refreshToken: any, profile: any, done: any) {
    console.info('accessToken:', accessToken)
    console.info('refreshToken:', refreshToken)
    console.info('profile.username:', profile.username)
    return done(null, profile)
  }
))

// Redirect to GitHub authentication
const handler = nc()
  .get(
    passport.authenticate('github', {})
  )

export default handler
