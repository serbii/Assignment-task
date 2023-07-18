const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
const repeatingPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*(.)\1\1).+$/;
module.exports.register = async (req, res, next) => {
    if (req.body.name == undefined || req.body.name == null || req.body.name == '')
      res.status(201).send({ status: false, code: 400, message: 'Name  is required' })
    else if (req.body.password == undefined || req.body.password == null || req.body.password == '')
      res.status(201).send({ status: false, code: 400, message: 'Password is required' })
    else if (req.body.password.length < 6 || req.body.password.length > 20)
      res.status(201).send({ status: false, code: 400, message: 'Password should be 6-20 characters only' })
    else if (!passwordPattern.test(req.body.password))
    res.status(201).send({ status: false, code: 400, message: 'least one lowercase ,least one uppercase and least one digit' })
    else if (!repeatingPattern.test(req.body.password))
    res.status(201).send({ status: false, code: 400, message: 'your password is week ,please enter strong password' })
    else
      next()
  }