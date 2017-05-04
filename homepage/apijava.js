
 // var globe = 'documents are connect'

 $(document).ready(function() {


  function button(){
    return $('#btn');
  }
  function urlvalue(){
    return $('#url')
  }

  var orgData = {}



  button().click(function(event){
    event.preventDefault();
    var url = urlvalue().val();
    console.log(url);

    $.get('https://g-colortag.herokuapp.com/tag-url.json?palette=simple&sort=relevance&url=' + url, function(data) {
      console.log('done');
      console.log(data);
      // colorConverter(data['tags'][0]['color']);          //maybe call a constructor fuction to make the objects with the color values, and methods to convert the modified led value?
      orgData = new Organizedata(data);
      console.log(orgData);
      });
  });

  function Organizedata(fakedata){
      this.original = [];
      this.led = []
      for(let i=0; i<fakedata["tags"].length; i++){
        let hex = []
        hex.push(fakedata["tags"][i]["color"])
        hex.push(fakedata['tags'][i]['label'])
        this.original.push(hex)
      }
      for(let j=0; j<this.original.length; j++){
        this.led.push(colorConverter(this.original[j]))
      }
      function colorConverter(color){               //input should be a hex string? I think
        var input = new tinycolor(color);               // saves the color into the library
        var toHsl = (input.toHslString()).substring(0,7);             //converst the value to hsl and changes it a little
        toHsl = (toHsl+' 100%, 50%)');
        var hslValue = new tinycolor(toHsl);            // saves the modified  hsl value so it can be used again
        var rgbObj = hslValue.toRgb();                // changes to rgb object
        delete rgbObj['a']
        return rgbObj;                          //modified led values for one color

      }
    }

});
