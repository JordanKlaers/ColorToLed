//this file to send messages to the server for the arduino to read.
(function(window){

  var pubnub = PUBNUB.init({
    publish_key: 'pub-c-0b43969b-341d-41f5-a85e-0bd9d30404b8',
    subscribe_key: 'sub-c-cb24903e-c9f4-11e5-b684-02ee2ddab7fe'
  });

  var channel = 'q1project';

  var red = 0;
  var green = 0;
  var blue = 0;

  var button = document.getElementById('button');
  var brightness = {r: 0, g: 0, b: 0};


  function publishUpdate(data) {
    //console.log(data);

    pubnub.publish({
      channel: channel,
      message: data
    });
  }
  function led(color){

    brightness.r = color.r
    brightness.g = color.g
    brightness.b = color.b

    console.log(brightness, "this color being loaded to the led");
    publishUpdate(brightness);
  }

  window.led = led;

})(window);
