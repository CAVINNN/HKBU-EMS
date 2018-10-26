/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  '/' : 'EventController.index',

  'GET /detail/:id': 'EventController.detail',

  '/create' : 'EventController.create',

  '/admin' : 'EventController.admin',

  'GET /update/:id': 'EventController.update',
  'POST /update/:id': 'EventController.update',

  'GET /delete/:id': 'EventController.delete',
  'POST /delete/:id': 'EventController.delete',

  '/search' : 'EventController.search'

};
