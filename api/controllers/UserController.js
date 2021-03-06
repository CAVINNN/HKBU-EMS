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

      // res.cookie('role', user.role, { maxAge: (365*24*60*60*1000) });
      // res.cookie('username', user.username, { maxAge: (365*24*60*60*1000) });

      if (req.wantsJSON){
        return res.redirect('/');
      } else {
        return res.ok("Login successfully");
      }

    });

  },

  // logout
  logout: async function (req, res) {

    if( req.method === "GET" ){

      return res.forbidden();

    } else {

      req.session.destroy(function (err) {

        if (err) return res.serverError(err);

        if (req.wantsJSON){
          return res.redirect('/');
        } else {
          return res.ok("Logout successfully");
        }

      });

    }
  },

  // register
  register: async function (req, res) {
    if ( req.method === "GET" ) {
      return res.forbidden();
    } else {
      let event = await Event.findOne(req.params.id);
      if ( event.quota > 0 ){
        let user = await User.findOne({ username: req.session.username }).populate("register", {
          where: {
            id: req.params.id
          }
        });
        if ( user.register.length === 0 ){
          await User.addToCollection(req.session.userid, 'register').members(req.params.id);
          await Event.update(req.params.id).set({
            quota: (event.quota - 1)
          }).fetch();
          if (req.wantsJSON){
            return res.redirect('/registered');
          } else {
            return res.ok("Register successfully");
          }
        } else {
          return res.badRequest("You have already register this event!");
        }
      } else {
        return res.badRequest("quota is full!");
      }
    }
  },

  // cancel
  cancel: async function (req, res) {

    if ( req.method === "GET" ) {
      return res.forbidden();
    } else {

      await User.removeFromCollection(req.session.userid, 'register').members(req.params.id);

      let event = await Event.findOne(req.params.id);

      await Event.update(req.params.id).set({
        quota: (event.quota + 1)
      }).fetch();

      if (req.wantsJSON){
        return res.redirect('/registered');
      } else {
        return res.ok("Cancel successfully");
      }

    }

  },

  // mobileLogin
  mobileLogin: async function (req, res) {

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

      res.cookie('role', user.role, { maxAge: (365*24*60*60*1000) });
      res.cookie('userId', user.id, { maxAge: (365*24*60*60*1000) });
      res.cookie('username', user.username, { maxAge: (365*24*60*60*1000) });

      return res.ok("Login successfully");

    });

  },

  // mobileLogout
  mobileLogout: async function (req, res) {

    if( req.method === "GET" ){

      return res.forbidden();

    } else {

      req.session.destroy(function (err) {

        if (err) return res.serverError(err);

        res.clearCookie('role');
        res.clearCookie('userId');
        res.clearCookie('username');

        return res.ok("Logout successfully");

      });

    }
  },

  // mobileRegister
  mobileRegister: async function (req, res) {
    let event = await Event.findOne(req.params.id);
    if ( event.quota > 0 ){
      let user = await User.findOne({ username: req.session.username }).populate("register", {
        where: {
          id: req.params.id
        }
      });
      if ( user.register.length === 0 ){
        await User.addToCollection(req.session.userid, 'register').members(req.params.id);
        await Event.update(req.params.id).set({
          quota: (event.quota - 1)
        }).fetch();

        return res.ok("Register successfully");

      } else {
        return res.badRequest("You have already register this event!");
      }
    } else {
      return res.badRequest("quota is full!");
    }
  },

  // mobileCancel
  mobileCancel: async function (req, res) {
    await User.removeFromCollection(req.session.userid, 'register').members(req.params.id);

    let event = await Event.findOne(req.params.id);

    await Event.update(req.params.id).set({
      quota: (event.quota + 1)
    }).fetch();

    return res.ok("Cancel successfully");
  }


};

