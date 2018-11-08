/**
 * EventController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  // index
  index: async function (req, res) {
    let highlightedEvents = await Event.find( {isHighlight: true} );
    if( highlightedEvents.length > 4 ){
      let deleteItem = highlightedEvents.length - 4;
      highlightedEvents.splice(0, deleteItem);
    }
    return res.view('pages/index', { events: highlightedEvents });
  },

  // registered
  registered: async function (req, res) {

    const registered = await User.findOne({ username: req.session.username }).populate("register");

    return res.view('pages/registered', { registeredArr : registered.register });

  },

  // detail
  detail: async function (req, res) {

    let message = Event.getInvalidIdMsg(req.params);
    if (message){
      return res.badRequest(message);
    }
    let event = await Event.findOne(req.params.id);
    if (!event){
      return res.notFound();
    }
    event.isRegistered = false;

    if ( req.session.role === "student" ){
      let user = await User.findOne({ username: req.session.username }).populate("register", {
        where: {
          id: req.params.id
        }
      });
      if( user.register.length !== 0 ){
        event.isRegistered = true;
      }
      return res.view('pages/detail', { event: event });
    } else {
      return res.view('pages/detail', { event: event });
    }

  },

  // create
  create: async function (req, res) {
    if (req.method == "GET"){
      let Obj = {};
      Obj.allOrganizers = Event.getAllOrganizers();
      Obj.allVenue = Event.getAllVenue();
      Obj.allQuota = Event.getAllQuota();
      return res.view('pages/create', { allOption: Obj });
    }else {
      if (typeof req.body.Event === "undefined"){
        return res.badRequest("Form-data not received.");
      }
      let event = req.body.Event;
      event.eventDate = new Date(event.eventDate);
      await Event.create(event);
      return res.ok("Successfully created!");
    }
    return res.badRequest("BadRequest!");
  },

  // admin
  admin: async function (req, res) {
    let allEvents = await Event.find();
    return res.view('pages/admin', { events: allEvents });
  },

  // update
  update: async function (req, res) {
    let message = Event.getInvalidIdMsg(req.params);
    if (message) {
      return res.badRequest(message);
    }
    if (req.method == "GET") {
      let event = await Event.findOne(req.params.id);
      if (!event) {
        return res.notFound();
      }
      let data = {};
      data.allOrganizers = Event.getAllOrganizers();
      data.allVenue = Event.getAllVenue();
      data.allQuota = Event.getAllQuota();
      data.event = event;
      return res.view('pages/update', { data: data });
    } else {
      if (typeof req.body.Event === "undefined") {
        return res.badRequest("Form-data not received.");
      }
      let isHighLighted = false;
      if (typeof req.body.Event.isHighlight !== "undefined") {
        isHighLighted = true;
      }
      let models = await Event.update(req.params.id).set({
        eventName: req.body.Event.eventName,
        shortDesc: req.body.Event.shortDesc,
        fullDesc: req.body.Event.fullDesc,
        imageURL: req.body.Event.imageURL,
        organizer: req.body.Event.organizer,
        eventDate: new Date(req.body.Event.eventDate),
        time: req.body.Event.time,
        venue: req.body.Event.venue,
        quota: req.body.Event.quota,
        isHighlight: isHighLighted
      }).fetch();
      if (models.length == 0) {
        return res.notFound();
      }
      return res.ok("Record updated");
    }
  },

  // delete
  delete: async function (req, res) {
    if (req.method == "GET") {
      return res.forbidden();
    }
    let message = Event.getInvalidIdMsg(req.params);
    if (message) {
      return res.badRequest(message);
    }
    let models = await Event.destroy(req.params.id).fetch();
    if (models.length == 0) {
      return res.notFound();
    }
    return res.ok("Event Deleted.");
  },

  // search
  search: async function (req, res) {

    if( req.method == "GET" ){

      const eventName = req.query.eventName || "";
      const organizer = req.query.organizer || "";
      const startDateStr = req.query.startDate || "";
      const endDateStr = req.query.endDate || "";
      const venue = req.query.venue || "";

      const qPage = Math.max(req.query.page - 1, 0) || 0;
      const numOfEventsPerPage = 2;

      let startDate = new Date(startDateStr.replace(/-/g, '/'));
      let endDate = new Date(endDateStr.replace(/-/g, '/'));

      let events = await Event.find({
        eventName: { 'contains': eventName },
        organizer: organizer,
        eventDate: { '>=':startDate,'<=':endDate },
        venue: venue
      });

      let numOfPage = Math.ceil( events.length / numOfEventsPerPage);

      events = await Event.find({
        eventName: { 'contains': eventName },
        organizer: organizer,
        eventDate: { '>=':startDate,'<=':endDate },
        venue: venue
      }).limit(numOfEventsPerPage).skip(numOfEventsPerPage * qPage);

      let searchCondition = {};
      searchCondition.eventName = eventName;
      searchCondition.organizer = organizer;
      searchCondition.startDateStr = startDateStr;
      searchCondition.endDateStr = endDateStr;
      searchCondition.venue = venue;

      let Obj = {};
      Obj.allOrganizers = Event.getAllOrganizers();
      Obj.allVenue = Event.getAllVenue();

      return res.view('pages/search', { events: events, allOption: Obj, condition: searchCondition, count: numOfPage });

    }

  },

};

