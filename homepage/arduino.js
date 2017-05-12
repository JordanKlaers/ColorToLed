// to initialize the arduino - ColorToLed git:(master) ✗ node homepage/arduino.js

var five = require('johnny-five');

five.Board().on('ready', function() {
  console.log('ready');

  // Initialize the RGB LED
  var led = new five.Led.RGB({
    pins: {
      green: 6,
      blue: 5,
      red: 3
    }
  });

  led.on();
  led.color({red: 255, blue: 255, green: 255});               // blank initial value


  var pubnub = require('pubnub').init({
    publish_key: 'pub-c-0b43969b-341d-41f5-a85e-0bd9d30404b8',
    subscribe_key: 'sub-c-cb24903e-c9f4-11e5-b684-02ee2ddab7fe'
  });

  var channel = 'q1project';

  pubnub.subscribe({
    channel: channel,
    callback: setLedColor,
    connect: initLedColor,                                 
    error: function(err) {console.log(err);}
  });

  function setLedColor(m) {
    led.color({red: m.r, blue: m.b, green: m.g});
    console.log( 'color change to...' );
    console.log( led.color() );
  }

  function initLedColor() {
    pubnub.history({
      channel: channel,
      count: 1,
      callback: function(messages) {
        console.log('resetting??', messages);
        messages[0].forEach(function(m) {
          setLedColor(m);
        });
      }
    });
  }

});
