import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { $hook, initialize } from 'ember-hook';

moduleForComponent('tf-toggle-button', 'Integration | Component | tf toggle button', {
  beforeEach() {
    initialize();
  },
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{tf-toggle-button}}`);

  assert.ok($hook('tf-toggle-button').length, "button renders");
  assert.ok($hook('tf-toggle-button__inner-circle').length, "inner circle renders");
});

test('receives aria-label attribute', function(assert) {
  this.render(hbs`{{tf-toggle-button aria-label="Awesome button"}}`);

  assert.equal($hook('tf-toggle-button').attr('aria-label'), "Awesome button", "aria-label is passed into component");
});

test('receives disabled attribute', function(assert) {
  this.render(hbs`{{tf-toggle-button disabled=disabled}}`);

  assert.notOk($hook('tf-toggle-button').is(':disabled'), 'Button is not disabled');
  assert.notOk($hook('tf-toggle-button').hasClass('c-tf-toggle-button--disabled'), 'Button does not have disabled class');

  this.set('disabled', true);

  assert.ok($hook('tf-toggle-button').is(':disabled'), 'Button is disabled');
  assert.ok($hook('tf-toggle-button').hasClass('c-tf-toggle-button--disabled'), 'Button has disabled class');
});

test('receives pressed attribute', function(assert) {
  this.render(hbs`{{tf-toggle-button pressed=pressed}}`);

  assert.notOk($hook('tf-toggle-button').hasClass('c-tf-toggle-button--pressed'), 'Button does not have pressed class');
  assert.equal($hook('tf-toggle-button').attr('aria-pressed'), 'false', 'aria-pressed is "false"');

  this.set('pressed', true);

  assert.equal($hook('tf-toggle-button').attr('aria-pressed'), 'true', 'aria-pressed is "true"');
  assert.ok($hook('tf-toggle-button').hasClass('c-tf-toggle-button--pressed'), 'Button has pressed class');
});

test('receives colorGroup', function(assert) {
  this.render(hbs`{{tf-toggle-button colorGroup=colorGroup}}`);

  assert.notOk($hook('tf-toggle-button').hasClass('c-tf-toggle-button--neutral'), 'Button does not have neutral color class');

  this.set('colorGroup', 'neutral');

  assert.ok($hook('tf-toggle-button').hasClass('c-tf-toggle-button--neutral'), 'Button has neutral color class');
});

test('default sizeGroup', function(assert) {
  this.render(hbs`{{tf-toggle-button}}`);

  assert.ok($hook('tf-toggle-button').hasClass('c-tf-toggle-button--primary'), 'Button defaults to primary size class');
  assert.ok($hook('tf-toggle-button__inner-circle').hasClass('c-tf-toggle-button__inner-circle--primary'), 'Inner circle defaults to primary size class');
});

test('receives sizeGroup', function(assert) {
  this.render(hbs`{{tf-toggle-button sizeGroup='secondary'}}`);

  assert.ok($hook('tf-toggle-button').hasClass('c-tf-toggle-button--secondary'), 'Button has secondary size class');
  assert.ok($hook('tf-toggle-button__inner-circle').hasClass('c-tf-toggle-button__inner-circle--secondary'), 'Inner circle has secondary size class');
});
