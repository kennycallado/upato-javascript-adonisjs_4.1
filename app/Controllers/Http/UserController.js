'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')}  */
const User = use('App/Models/User')

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const users = await User.all()

    return response.json(users)
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const { username, email, password } = request.all()

    if (username && email && password) {
      if (await User.findBy('username', username))
        return response.json({ message: 'Error, Username already exist.' })
      else if (await User.findBy('email', email))
        return response.json({ message: 'Error, Email already exist.' })
      else {
        const user = await User.create({ username, email, password })

        return response.json(user)
      }
    } else return response.json({ message: 'Error, you should to complete the from.' })
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const user = await User.find(params.id)

    return response.json(user)
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const user = await User.find(params.id)

    if (user) {
      const { username, email, password } = request.all()

      if (username && (await User.findBy('username', username)))
        return response.json({ message: 'Error, username already exist.' })
      else if (email && (await User.findBy('email', email)))
        return response.json({ message: 'Error, email already exist.' })
      else {
        user.username = username
        user.email = email
        user.password = password

        await user.save()
      }

      return response.json(user)
    } else return response.json({ message: 'Error, User not exist.' })
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const user = await User.find(params.id)

    await user.delete()

    return response.json({ message: `User ${user.username} was deleted.` })
  }
}

module.exports = UserController
