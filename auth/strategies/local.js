const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const User = require('../../store/users')

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false
    },
    async (username, password, done) => {
      try {
        const user = await User.getByMail(username)
        if (user.length === 0) { return done(null, false) } else {
          const validUser = await bcrypt.compare(password, user[0].password)
          if (!validUser) { return done(null, false) }
          delete user[0].password
          return done(null, user[0])
        }
      } catch (error) {
        return done(error)
      }
    }
  )
)
