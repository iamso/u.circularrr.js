/*!
 * u.circularrr.js - Version 0.3.0
 * plugin for circular progress
 * Author: Steve Ottoz <so@dev.so>
 * Build date: 2017-02-15
 * Copyright (c) 2017 Steve Ottoz
 * Released under the MIT license
 */
;(function (factory) {
  'use strict';

  if (/^f/.test(typeof define) && define.amd) {
    define(['jquery'], factory);
  }
  else if (/^o/.test(typeof exports)) {
    factory(require('jquery'));
  }
  else {
    factory(jQuery);
  }
})(function ($) {


  'use strict';

  var pluginName = 'circularrr',
      defaults = {
        size: 40,
        border: 3,
        bg: 'ghostwhite',
        progress: 'lightgreen',
        duration: 1500,
      };

  function Circularrr(element, options) {
    this.el = element;
    this.$el = $(element);
    this.options = $.extend({}, defaults, /^o/.test(typeof options) ? options : {});
    this._defaults = defaults;
    this._name = pluginName;
    this.ns = "http://www.w3.org/2000/svg";

    this.$svg = this.$el.find('.' + pluginName);
    this.$bg = this.$el.find('.' + pluginName + '-bg');
    this.$progress = this.$el.find('.' + pluginName + '-progress');

    if (!this.$svg.length) {
      this.$svg = $(document.createElementNS(this.ns, 'svg'));
      this.$el.append(this.$svg);
    }
    if (!this.$bg.length) {
      this.$bg = $(document.createElementNS(this.ns, 'circle'));
      this.$svg.append(this.$bg);
    }
    if (!this.$progress.length) {
      this.$progress = $(document.createElementNS(this.ns, 'circle'));
      this.$svg.append(this.$progress);
    }

    this.$svg
      .attr('class', pluginName)
      .attr('viewBox', '0 0 ' + this.options.size + ' ' + this.options.size)
      .css({
        transform: 'rotate(-90deg)'
      });
    this.$bg
      .attr('class', pluginName + '-bg')
      .attr('cx', (this.options.size / 2))
      .attr('cy', (this.options.size / 2))
      .attr('r', Math.floor((this.options.size - this.options.border) / 2))
      .css({
        fill: 'transparent',
        opacity: 1,
        stroke: this.options.bg,
        strokeWidth: this.options.border,
      });
    this.$progress
      .attr('class', pluginName + '-progress')
      .attr('cx', (this.options.size / 2))
      .attr('cy', (this.options.size / 2))
      .attr('r', Math.floor((this.options.size - this.options.border) / 2))
      .css({
        fill: 'transparent',
        opacity: 0,
        stroke: this.options.progress,
        strokeWidth: this.options.border,
      });

    this.init();
  }

  Circularrr.prototype = {

    init: function() {
      this.radius = this.$progress.attr('r');
      this.totalLength = Math.PI*(this.radius*2);
      this.current = 0;
      this.from = 0;
      this.to = 0;
      this.start = 0;
      this.frame = 0;
      this.$progress.css({
        strokeDasharray: this.totalLength,
        strokeDashoffset: this.totalLength,
      });
    },

    set: function(val) {
      this.from = Math.max(this.current, 0);
      this.to = Math.min(+val, 100);
      this.duration = (this.to - this.from) * (this.options.duration / 100);
      this.start = new Date();
      this.$el.addClass('loading');
      cancelAnimationFrame(this.frame);
      this._animate();
    },

    _animate: function() {
      var now = new Date();
      if (this.current >= this.to) {
        return false;
      }
      var p = (now - this.start) / this.duration;
      var val = easing(p);
      this.current = Math.round(this.from + (this.to - this.from) * val);
      this._set(this.current);
      this.frame = requestAnimationFrame(this._animate.bind(this));
    },

    _set: function(val) {
      var percent = ((100-val)/100) * this.totalLength;
      this.$progress.css({
        opacity: 1,
        strokeDashoffset: percent,
      });

      if (val >= 100) {
        this.$el
          .trigger(pluginName + '-complete')
          .removeClass('loading')
          .addClass('loaded');
      }
    },
    reset: function() {
      this.init();
      this.$el.removeClass('loading loaded');
    }

  };

  function easing(t) {
    if (t === 0) {
      return 0;
    }
    if (t === 1) {
      return 1;
    }
    if ((t /= 1 / 2) < 1) {
      return 1 / 2 * Math.pow(2, 10 * (t - 1));
    }
    return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
  }

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function(options) {
    return this.each(function() {

      var $el = $(this);
      var inst = $el.data(pluginName);

      if(!inst) {
        inst = new Circularrr(this, options);
        $el.data(pluginName, inst);
      }

      if (+options === options) {
        inst.set(options);
      }
      else if (options === 'reset') {
        inst.reset();
      }

    });
  };


});
