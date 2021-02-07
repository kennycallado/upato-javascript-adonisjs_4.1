'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker) => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: faker.password(),
  }
})

Factory.blueprint('App/Models/Post', (faker) => {
  return {
    title: faker.sentence(),
    content: faker.paragraph(2),
  }
})

Factory.blueprint('App/Models/Comment', (faker) => {
  return {
    content: faker.sentence(),
  }
})
