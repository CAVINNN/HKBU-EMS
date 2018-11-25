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


  // EventController

  'GET /' : 'EventController.index',

  'GET /index' : 'EventController.index',

  'GET /registered' : 'EventController.registered',

  'GET /registration/:id' : 'EventController.registration',

  'GET /detail/:id': 'EventController.detail',

  'GET /create' : 'EventController.create',
  'POST /create' : 'EventController.create',

  'GET /admin' : 'EventController.admin',

  'GET /update/:id': 'EventController.update',
  'PUT /update/:id': 'EventController.update',

  'GET /delete/:id': 'EventController.delete',
  'DELETE /delete/:id': 'EventController.delete',

  'GET /search' : 'EventController.search',

  'GET /getEventsByOrgan/:organizer' : 'EventController.getEventsByOrgan',

  'GET /getEventsByVenue/:venue' : 'EventController.getEventsByVenue',

  // UserController

  'GET /login' : 'UserController.login',
  'POST /login' : 'UserController.login',

  'POST /logout' : 'UserController.logout',

  'POST /register/:id' : 'UserController.register',

  'DELETE /cancel/:id' : 'UserController.cancel',

  'POST /mobileLogin' : 'UserController.mobileLogin',

  'POST /mobileLogout' : 'UserController.mobileLogout',

  'POST /mobileRegister/:id' : 'UserController.mobileRegister',

  'DELETE /mobileCancel/:id' : 'UserController.mobileCancel'

};
