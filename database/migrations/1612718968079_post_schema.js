'use strict'

/** @typedef {import('knex/types/knex').TableBuilder} Knex */

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up() {
    this.create(
      'posts',

      /**
       *
       * @param {Knex} table
       */
      (table) => {
        table.increments()
        table.string('title', 128)
        table.text('content')
        table.integer('starts')
        table.integer('user_id').unsigned()
        table.foreign('user_id').references('id').inTable('users').onDelete('cascade')
        table.timestamps()
      }
    )
  }

  down() {
    this.drop('posts')
  }
}

module.exports = PostSchema
