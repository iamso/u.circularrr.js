/*!
 * u.circularrr.js - Version 0.1.0
 * plugin for circular progress
 * Author: Steve Ottoz <so@dev.so>
 * Build date: 2016-08-06
 * Copyright (c) 2016 Steve Ottoz
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
        transition: '0.8s cubic-bezier(0.19, 1, 0.22, 1)',
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
      .addClass(pluginName)
      .attr('viewBox', '0 0 ' + this.options.size + ' ' + this.options.size)
      .css({
        transform: 'rotate(-90deg)'
      });
    this.$bg
      .addClass(pluginName + '-bg')
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
      .addClass(pluginName + '-progress')
      .attr('cx', (this.options.size / 2))
      .attr('cy', (this.options.size / 2))
      .attr('r', Math.floor((this.options.size - this.options.border) / 2))
      .css({
        fill: 'transparent',
        opacity: 0,
        stroke: this.options.progress,
        strokeWidth: this.options.border,
        transition: 'stroke-dashoffset ' + this.options.transition,
      });

    this.init();
  }

  Circularrr.prototype = {

    init: function() {
      var _this = this;
      this.radius = this.$progress.attr('r');
      this.totalLength = Math.PI*(this.radius*2);
      this.$progress.css({
        transition: 'none',
        strokeDasharray: this.totalLength,
        strokeDashoffset: this.totalLength,
      });
      setTimeout(function() {
        _this.$progress.css({
          transition: null,
        });
      }, 1);
    },
    set: function(val) {
      var _this = this;
      var percent = ((100-val)/100) * this.totalLength;
      val > 100 && (percent = 0);
      val < 0 && (percent = this.totalLength);
      this.$progress.css({
        opacity: 1,
        strokeDashoffset: percent,
      });
      this.$el.addClass('loading');
      if (val === 100) {
        this.$el
          .removeClass('loading')
          .addClass('loaded');
      }
    },
    reset: function() {
      this.init();
      this.$el.removeClass('loading loaded');
    }

  };

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
