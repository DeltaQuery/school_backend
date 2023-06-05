const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find()

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  })
})

exports.getMyProfile = catchAsync(async (req, res, next) => {
  const myUser = await User.findById(req.user.id)

  if(!myUser) return next(new AppError('No user found with that ID', 404))

  res.status(200).json({
    status: 'success',
    data: {
      user: myUser
    }
  })
})

/*
exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body)

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser
    }
  })
})*/

/*exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    )
  }

  const filteredBody = filterObj(req.body, "name", "email")

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  })

  if(!updatedUser) return next(new AppError('The user could not be updated', 400))


  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  })
})*/

/*exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false })

  res.status(204).json({
    status: 'success',
    data: null
  })
})*/

/*exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(new AppError('No user found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})*/

/*exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  if (!user) {
    return next(new AppError('No user found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})*/

/*exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(new AppError('No user found with that ID', 404))
  }

  if (req.user.role === "admin" && user.role === "admin") {
    return next(new AppError('You cannot delete an user with this role!', 404))
  }

  if (req.user.role === "coordinator" && (user.role === "coordinator") || user.role === "admin") {
    return next(new AppError('You cannot delete an user with this role!', 404))
  }

  const deletedUser = await User.deleteOne({ _id: req.params.id })

  if (!deletedUser) {
    return next(new AppError('The user could not be deleted.', 404))
  }

  res.status(204).json({
    status: 'success',
    data: null
  })
})*/




