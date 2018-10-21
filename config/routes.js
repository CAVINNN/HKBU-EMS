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

  '/detail' : 'EventController.detail',

  '/create' : 'EventController.create',

  '/update' : 'EventController.update',

  '/admin' : 'EventController.admin',

  '/search' : 'EventController.search'

  // '/': {
  //   view: 'pages/homepage'
  // },

};
