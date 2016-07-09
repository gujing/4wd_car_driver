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
    attach: function(inputs, context /*, next */ ) {
        // Get assigned GPIO interface and set property `_gpio`.
        // See https://ruff.io/zh-cn/api/gpio.html for more information about GPIO interfaces.
        this.speed = 1;
        this._gpio_out1 = inputs['gpio-out1'];
        this._gpio_out2 = inputs['gpio-out2'];
        this._gpio_out3 = inputs['gpio-out3'];
        this._gpio_out4 = inputs['gpio-out4'];
        this._pwm = inputs['pwm'];
        this._gpio_out1.on('interrupt', function(state) {
            console.log('gpio-out1' + state);
        });
    },
    exports: {
        forward: function(callback) {
            this._pwm.setDuty(this.speed);
            this._gpio_out1.write(Level.high, callback);
            this._gpio_out2.write(Level.low, callback);
            this._gpio_out3.write(Level.high, callback);
            this._gpio_out4.write(Level.low, callback);
            // console.log(this._gpio_out1.read(callback));
            // console.log(this._gpio_out1.getEdge(function(res) {
            //     console.log(res)
            // }));
        },
        acc: function(){
            this.speed + 0.2 < 1 ? this.speed += 0.2 : this.speed = 1;
            this._pwm.setDuty(this.speed); 
        },
        slow: function(){
            this.speed - 0.2 > 0 ? this.speed -= 0.2 : this.speed = 0;
            this._pwm.setDuty(this.speed);
        },
        backward: function(callback) {
            this._pwm.setDuty(1);
            // this._gpio_out1.write(Level.low, callback);
            this._gpio_out2.write(Level.high, callback);
        }
    }
});