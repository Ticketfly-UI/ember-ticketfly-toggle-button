/**
  @module ember-ticketfly-toggle-button
 */
import Component from 'ember-component';
import layout from '../templates/components/tf-toggle-button';
import get from 'ember-metal/get';
import computed from 'ember-computed';

/**
  colorGroup options: 'neutral'
  sizeGroup options: 'primary', 'secondary'

  @public
  @class TfToggleButton
  @extends Ember.Component
 */
export default Component.extend({
  layout,

  tagName: 'button',
  type: 'button',
  attributeBindings: ['disabled', 'aria-label', 'aria-pressed', 'type'],
  classNameBindings: ['buttonCategory', 'disabled:c-tf-toggle-button--disabled', 'pressed:c-tf-toggle-button--pressed'],
  classNames: ['c-tf-toggle-button', 'u-pv-0', 'u-ph-xs'],

  hook: 'tf-toggle-button',

  onClick() { return this; }, //noop

  click() {
    this.toggleProperty('pressed');
    const pressed = get(this, 'pressed');
    get(this, 'onClick')(pressed);
  },

  pressed: false,

  // aria-pressed is not a boolean value, but a string token of 'true' or 'false'
  "aria-pressed": computed('pressed', {
    get() {
      return get(this, 'pressed') ? 'true' : 'false';
    }
  }).readOnly(),

  colorGroup: '',
  sizeGroup: 'primary',

  buttonCategory: computed('colorGroup','sizeGroup', {
    get() {
      const sizeGroup = get(this, 'sizeGroup');

      let buttonCategory = `c-tf-toggle-button--${sizeGroup}`;

      const colorGroup = get(this, 'colorGroup');
      if (colorGroup === 'neutral') { 
        buttonCategory += ' c-tf-toggle-button--neutral';
      }

      return buttonCategory;
    }
  }),

  innerCircleCategory: computed('sizeGroup', {
    get() {
      const sizeGroup = get(this, 'sizeGroup');
      return `c-tf-toggle-button__inner-circle--${sizeGroup}`;
    }
  })
});
