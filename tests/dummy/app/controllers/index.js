/* globals alert */

import Controller from 'ember-controller';

export default Controller.extend({
  // BEGIN-SNIPPET alert-hello
  actions: {
    alertHello(isPressed) {
      alert(`Hello, friend! Toggle button is pressed: ${isPressed}`);
    }
  }
  // END-SNIPPET
});
