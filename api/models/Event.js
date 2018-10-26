/**
 * Event.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    eventName: {
      type: 'string'
    },

    shortDesc: {
      type: 'string'
    },

    fullDesc: {
      type: 'string'
    },

    imageURL: {
      type: 'string'
    },

    organizer: {
      type: 'string'
    },

    eventDate: {
      type: 'string',
      columnType: 'date'
    },

    time: {
      type: 'string'
    },

    venue: {
      type: 'string'
    },

    quota: {
      type: 'number'
    },

    isHighlight: {
      type: 'boolean'
    }

  },

  getInvalidIdMsg: function (opts) {
    if (typeof opts.id === "undefined" || isNaN(parseInt(opts.id)))
      return "Person id not specified or with incorrect type.";

    return null;        // falsy
  },

  getAllOrganizers: function () {
    let allOrganizers = ["Government and International Studies", "IT and Data Analysis Studies", "Art and Performance Studies", "Culture and History Studies"];
    return allOrganizers;
  },

  getAllVenue: function() {
    let allVenue = ["SWT 501", "SWT 502", "SWT 503", "SWT 504", "SWT 505", "SWT 601", "SWT 602", "SWT 603"];
    return allVenue;
  },

  getAllQuota: function() {
    let allQuota = ["50", "80", "120", "150", "200"];
    return allQuota;
  }

};

