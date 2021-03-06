import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7NavLeft from './nav-left';
import F7NavTitle from './nav-title';
import F7NavRight from './nav-right';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Navbar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    (() => {
      Utils.bindMethods(this, ['onBackClick']);
    })();
  }

  hide(animate) {
    const self = this;
    if (!self.$f7) return;
    self.$f7.navbar.hide(self.refs.el, animate);
  }

  show(animate) {
    const self = this;
    if (!self.$f7) return;
    self.$f7.navbar.show(self.refs.el, animate);
  }

  size() {
    const self = this;
    if (!self.$f7) return;
    self.$f7.navbar.size(self.refs.el);
  }

  onBackClick(event) {
    this.dispatchEvent('back-click backClick click:back clickBack', event);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      backLink,
      backLinkUrl,
      backLinkForce,
      sliding,
      title,
      subtitle,
      inner,
      innerClass,
      innerClassName,
      className,
      id,
      style,
      hidden,
      noShadow,
      noHairline,
      large,
      titleLarge
    } = props;
    let innerEl;
    let leftEl;
    let titleEl;
    let rightEl;
    let titleLargeEl;
    const iosLeftTitle = self.$theme && self.$theme.ios && self.$f7 && !self.$f7.params.navbar.iosCenterTitle;
    const mdCenterTitle = self.$theme && self.$theme.md && self.$f7 && self.$f7.params.navbar.mdCenterTitle;
    const slots = self.slots;

    if (inner) {
      if (backLink || slots['nav-left']) {
        leftEl = React.createElement(F7NavLeft, {
          backLink: backLink,
          backLinkUrl: backLinkUrl,
          backLinkForce: backLinkForce,
          onBackClick: self.onBackClick
        }, slots['nav-left']);
      }

      if (title || subtitle || slots.title) {
        titleEl = React.createElement(F7NavTitle, {
          title: title,
          subtitle: subtitle
        }, slots.title);
      }

      if (slots['nav-right']) {
        rightEl = React.createElement(F7NavRight, null, slots['nav-right']);
      }

      let largeTitle = titleLarge;
      if (!largeTitle && large && title) largeTitle = title;

      if (largeTitle) {
        titleLargeEl = React.createElement('div', {
          className: 'title-large'
        }, React.createElement('div', {
          className: 'title-large-text'
        }, largeTitle));
      }

      innerEl = React.createElement('div', {
        ref: __reactNode => {
          this.__reactRefs['inner'] = __reactNode;
        },
        className: Utils.classNames('navbar-inner', innerClass, innerClassName, {
          sliding,
          'navbar-inner-left-title': iosLeftTitle,
          'navbar-inner-centered-title': mdCenterTitle,
          'navbar-inner-large': large
        })
      }, leftEl, titleEl, rightEl, titleLargeEl, this.slots['default']);
    }

    const classes = Utils.classNames(className, 'navbar', {
      'navbar-hidden': hidden,
      'no-shadow': noShadow,
      'no-hairline': noHairline,
      'navbar-large': large
    }, Mixins.colorClasses(props));
    return React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: classes
    }, this.slots['before-inner'], innerEl, this.slots['after-inner']);
  }

  componentDidUpdate() {
    const self = this;
    if (!self.$f7) return;
    const el = self.refs.el;

    if (el && el.children && el.children.length) {
      self.$f7.navbar.size(el);
    } else if (self.refs.inner) {
      self.$f7.navbar.size(self.refs.inner);
    }
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }

  get refs() {
    return this.__reactRefs;
  }

  set refs(refs) {}

}

__reactComponentSetProps(F7Navbar, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  backLink: [Boolean, String],
  backLinkUrl: String,
  backLinkForce: Boolean,
  sliding: {
    type: Boolean,
    default: true
  },
  title: String,
  subtitle: String,
  hidden: Boolean,
  noShadow: Boolean,
  noHairline: Boolean,
  inner: {
    type: Boolean,
    default: true
  },
  innerClass: String,
  innerClassName: String,
  large: Boolean,
  titleLarge: String
}, Mixins.colorProps));

F7Navbar.displayName = 'f7-navbar';
export default F7Navbar;