/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  // login
  login: async function (req, res) {

    if (req.method === "GET") {

      if( typeof(req.session.username) !== 'undefined' ){
        let highlightedEvents = await Event.find( {isHighlight: true} );
        if( highlightedEvents.length > 4 ){
          let deleteItem = highlightedEvents.length - 4;
          highlightedEvents.splice(0, deleteItem);
        }
        return res.view('pages/index', { events: highlightedEvents });
      }

      return res.view('pages/login', {layout: 'layouts/loginLayout'});
    }

    if (!req.body.username) return res.badRequest();
    if (!req.body.password) return res.badRequest();

    var user = await User.findOne({ username: req.body.username });

    if (!user) {
      res.status(401);
      return res.send("User not found");
    }

    const match = await sails.bcryptjs.compare(req.body.password, user.password);

    if (!match) {
      res.status(401);
      return res.send("Wrong Password");
    }

    req.session.regenerate(function (err) {

      if (err) return res.serverError(err);

      req.session.role = user.role;
      req.session.userid = user.id;
      req.session.username = user.username;

      sails.log("Session: " + JSON.stringify(req.session));

      // return res.json(req.session);

      return res.ok("Login successfully");

    });

  },

  // logout
  logout: async function (req, res) {

    req.session.destroy(function (err) {

      if (err) return res.serverError(err);

      return res.ok("Log out successfully");

    });
  },

};

