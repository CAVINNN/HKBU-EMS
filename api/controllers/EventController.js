/**
 * EventController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  // index
  index: async function (req, res) {

    return res.view('pages/index');

  },

  // detail
  detail: async function (req, res) {

    return res.view('pages/detail');

  },

  // create
  create: async function (req, res) {

    return res.view('pages/create');

  },

  // admin
  admin: async function (req, res) {

    return res.view('pages/admin');

  },

  // update
  update: async function (req, res) {

    return res.view('pages/update');

  },

  // delete
  delete: async function (req, res) {

    return res.view('pages/delete');

  },

  // search
  search: async function (req, res) {

    return res.view('pages/search');

  },

};

