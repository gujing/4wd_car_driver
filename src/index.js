'use strict';

var Level = require('gpio').Level;
var driver = require('ruff-driver');

module.exports = driver({
    /**
     * @param {Object} inputs A map of assigned interfaces according to `driver.json`.
     * @param {Object} context Context of this instance to attach.
     * @param {string} context.id ID of the device.
     * @param {string} context.model Model of the device.
     * @param {Object} context.args A map of device arguments.
     * @param {Function} next If the third parameter is added, it's the callback for asyncrhonous attaching.
     */
    attach: function (inputs, context /*, next */ ) {
        // Get assigned GPIO interface and set property `_gpio`.
        // See https://ruff.io/zh-cn/api/gpio.html for more information about GPIO interfaces.
        this.current_speed;
        this._gpio_lf1 = inputs['gpio_lf1'];
        this._gpio_lf2 = inputs['gpio_lf2'];
        this._gpio_lb1 = inputs['gpio_lb1'];
        this._gpio_lb2 = inputs['gpio_lb2'];
        this._gpio_rf1 = inputs['gpio_rf1'];
        this._gpio_rf2 = inputs['gpio_rf2'];
        this._gpio_rb1 = inputs['gpio_rb1'];
        this._gpio_rb2 = inputs['gpio_rb2'];
        this._pwm_lf = inputs['pwm_lf'];
        this._pwm_lb = inputs['pwm_lb'];
        this._pwm_rf = inputs['pwm_rf'];
        this._pwm_rb = inputs['pwm_rb'];
    },
    exports: {
        forward: function () {
            this._gpio_lf1.write(Level.high);
            this._gpio_lf2.write(Level.low);
            this._gpio_lb1.write(Level.high);
            this._gpio_lb2.write(Level.low);
            this._gpio_rf1.write(Level.high);
            this._gpio_rf2.write(Level.low);
            this._gpio_rb1.write(Level.high);
            this._gpio_rb2.write(Level.low);
        },
        setSpeed: function (v) {
            this.current_speed = v > 1 ? 1 : v;
            this._pwm_lf.setDuty(this.current_speed);
            this._pwm_lb.setDuty(this.current_speed);
            this._pwm_rf.setDuty(this.current_speed);
            this._pwm_rb.setDuty(this.current_speed);
        },
        left: function (range) {
            if (range >= 0 && range <= 1) {
                this._pwm_lf.setDuty(this.current_speed * range);
                this._pwm_lb.setDuty(this.current_speed * range);
            }
        },
        right: function (range) {
            if (range >= 0 && range <= 1) {
                this._pwm_rf.setDuty(this.current_speed * range);
                this._pwm_rb.setDuty(this.current_speed * range);
            }
        },
        backward: function () {
            this._gpio_lf1.write(Level.low);
            this._gpio_lf2.write(Level.high);
            this._gpio_lb1.write(Level.low);
            this._gpio_lb2.write(Level.high);
            this._gpio_rf1.write(Level.low);
            this._gpio_rf2.write(Level.high);
            this._gpio_rb1.write(Level.low);
            this._gpio_rb2.write(Level.high);
        }
    }
});