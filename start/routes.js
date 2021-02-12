'use strict'

const { route } = require('@adonisjs/framework/src/Route/Manager')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.get('/', 'UserController.index')
  Route.get('/:id', 'UserController.show')
  Route.post('/', 'UserController.store')
  Route.put('/:id', 'UserController.update')
  Route.delete('/:id', 'UserController.destroy')
}).prefix('users')
