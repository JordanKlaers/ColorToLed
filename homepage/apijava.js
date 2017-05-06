
 // var globe = 'documents are connect'



 $(document).ready(function() {
  var orgData = {}
  var brightness =[]          //used to invert the rgb color for because anode LED


  function fill(){
    for(let i=0; i<256; i++){
      brightness.push(i)
    }
    brightness.reverse()
  }
  fill();
  //console.log(brightness);

  function button(){
    return $('#btn');
  }
  function urlvalue(){
    return $('#url')
  }





  button().click(function(event){
    event.preventDefault();
    var url = urlvalue().val();
    var dots = $(".dots");
    var pic = $("img");
    dots.css({"display": "block"});
    pic.css({"display": "none"});
    $.get('https://g-colortag.herokuapp.com/tag-url.json?palette=simple&sort=relevance&url=' + url, function(data) {
      dots.css({"display": "none"});
      pic.css({"display": ""});

      displayImage(url);
      orgData = new Organizedata(data);
      console.log(orgData);
      led(orgData.led[0]);
      displayColors(orgData);//
      });
  });

  function Organizedata(fakedata){
      this.original = [];
      this.led = [];
      for(let i=0; i<fakedata["tags"].length; i++){
        let hex = [];
        hex.push(fakedata["tags"][i]["color"]);
        hex.push(fakedata["tags"][i]["label"]);
        this.original.push(hex);
      }
      for(var j=0; j<this.original.length; j++){
        this.led.push(colorConverter(this.original[j][0]))
      }
      function colorConverter(color){               //input should be a hex string? I think
        var input = new tinycolor(color);               // saves the color into the library
        var toHsl = (input.toHslString()).substring(0,7);             //converst the value to hsl and changes it a little
        toHsl = (toHsl+' 100%, 50%)');
        var hslValue = new tinycolor(toHsl);            // saves the modified  hsl value so it can be used again
        var rgbObj = hslValue.toRgb();                // changes to rgb object
        delete rgbObj['a']
        //rgbObj.r = brightness[rgbObj.r];
        //rgbObj.g = brightness[rgbObj.g];
        //rgbObj.b = brightness[rgbObj.b];
        //console.log(rgbObj ,' ' ,j );
        return rgbObj;                          //modified led values for one color

      }
    }

    function displayColors(orgData){
      var Rcolor1 = $("#rgb1");
      var Hcolor1 = $("#hex1");
      Hcolor1.css({'background-color': orgData.original[0][0]})
      Rcolor1.css({'background-color': `rgb(${orgData.led[0].r},${orgData.led[0].g},${orgData.led[0].b})`});  //'rgb' + " (" + orgData.led[0].r + "," + orgData.led[0].g + "," + orgData.led[0].b + ")" });
    }

    function displayImage(url){
      var pic = $('#picture');
      var img = $('#img');
      img.attr("src", url);
      img.attr('class', 'img-responsive');
      pic.append(img);
    }

    var picContainerWidth = $('#picturecontainer').width();               // right when the document load it makes sure the image container is a square
    $('#picturecontainer').css({'height':picContainerWidth+'px'});


    $( window ).resize(function() {                                     // every time the window resizes, it makes sure the image container stays as a square
      var picContainerWidth = $('#picturecontainer').width();
      console.log(picContainerWidth);
      $('#picturecontainer').css({'height':picContainerWidth+'px'});
    });









    //testing paintbrush animation

    $('#colorfields').on('click', function(){
       $(".vernice").attr("class", "vernice verniceOver");
       $(".brush").attr("class", "brush brushOver");
       $(".gocce").attr("class", "gocce gocceOver");
   });

});
