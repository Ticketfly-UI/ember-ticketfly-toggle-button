/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-ticketfly-toggle-button',

  included: function(app) {

    app.import('app/styles/ember-ticketfly-toggle-button.css');

    this._super.included.call(this, app);

  }
};
