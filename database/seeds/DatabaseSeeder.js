'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Post = use('App/Models/Post')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Comment = use('App/Models/Comment')

class DatabaseSeeder {
  async run() {
    const numeroUsers = 5
    const numeroPosts = 20
    const numeroComme = 100

    await Factory.model('App/Models/User').createMany(numeroUsers)

    for (let i = 0; i < numeroPosts; i++) {
      const user = await User.find(this.aleatorio(numeroUsers))

      const post = await Factory.model('App/Models/Post').make()

      await user.posts().save(post)
    }

    for(let i = 0; i < numeroComme; i++) {
      const user = await User.find(this.aleatorio(numeroUsers))
      const post = await Post.find(this.aleatorio(numeroPosts))

      const comment = await Factory.model('App/Models/Comment').make()

      await comment.user().associate(user)
      await post.comments().save(comment)

    }
  }

  aleatorio(max) {
    return Math.floor(Math.random() * max) + 1
  }
}

module.exports = DatabaseSeeder
