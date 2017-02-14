/**
  @module ember-ticketfly-toggle-button
 */
import Component from 'ember-component';
import layout from '../templates/components/tf-toggle-button';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import { tryInvoke } from 'ember-utils';
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
  classNameBindings: ['buttonCategory', 'disabled:c-tf-toggle-button--disabled', '_pressed:c-tf-toggle-button--pressed'],
  classNames: ['c-tf-toggle-button', 'u-pv-0', 'u-ph-xs'],

  hook: 'tf-toggle-button',

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
  }),

  /*
    `_pressed` is an internal state of the toggle button. `_pressed` will be set to the passed in `pressed` param. 
    Clicking the component will update `_pressed`, but it won't mutate `pressed`. It will send an action with the 
    updated value of `_pressed`.

    This is to ensure that the toggle button doesn't mutate the passed in value of `pressed`. Only
    the consumer can do that, in accordance with DDAU. This also allows the component to function on its own, 
    without requiring the consumer to define and update its pressed state every time it is used.
  */ 
  didReceiveAttrs() {
    this._super(...arguments);
    const pressed = get(this, 'pressed');
    set(this, '_pressed', !!pressed);
  },

  // aria-pressed is not a boolean value, but a string token of 'true' or 'false'
  'aria-pressed': computed('_pressed', {
    get() {
      return get(this, '_pressed') ? 'true' : 'false';
    }
  }).readOnly(),

  click(/* event */) {
    this.toggleProperty('_pressed');
    const _pressed = get(this, '_pressed');
    tryInvoke(this, 'action', [_pressed]);
  }
});
