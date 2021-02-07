'use strict'

/** @typedef {import('knex/types/knex').TableBuilder} Knex */

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentSchema extends Schema {
  up() {
    this.create(
      'comments',

      /**
       *
       * @param {Knex} table
       */
      (table) => {
        table.increments()
        table.string('content')
        table.integer('likes')
        table.integer('user_id').unsigned()
        table.foreign('user_id').references('id').inTable('users').onDelete('cascade')
        table.integer('post_id').unsigned()
        table.foreign('post_id').references('id').inTable('posts').onDelete('cascade')
        table.timestamps()
      }
    )
  }

  down() {
    this.drop('comments')
  }
}

module.exports = CommentSchema
