const bcrypt = require('bcrypt')
const prompt = require('prompt')

prompt.start()
const saltRounds = 10

prompt.get(['password'], (error, result) => {
  if (error) { return console.error(error) }
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) { return console.error(err) }
    bcrypt.hash(result.password, salt, function (err, hash) {
      if (err) { return console.error(err) }
      console.log('Hash', hash)
    })
  })
})
