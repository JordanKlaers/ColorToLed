
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
      this.ledwebpage = [];
      for(let i=0; i<fakedata["tags"].length; i++){
        let hex = [];
        hex.push(fakedata["tags"][i]["color"]);
        hex.push(fakedata["tags"][i]["label"]);
        this.original.push(hex);
      }
      for(var j=0; j<this.original.length; j++){
        this.led.push(colorConverter(this.original[j][0]))
      }
      for(var j=0; j<this.original.length; j++){
        this.ledwebpage.push(colorConverterForWeb(this.original[j][0]))
      }
      function colorConverterForWeb(color){               //input should be a hex string? I think
        var input = new tinycolor(color);               // saves the color into the library
        var toHsl = (input.toHslString()).substring(0,7);             //converst the value to hsl and changes it a little
        toHsl = (toHsl+' 100%, 50%)');
        var hslValue = new tinycolor(toHsl);            // saves the modified  hsl value so it can be used again
        var rgbObj = hslValue.toRgb();                // changes to rgb object
        delete rgbObj['a'];
        return rgbObj;                          //modified led values for one color

      }
      function colorConverter(color){               //input should be a hex string? I think
        var input = new tinycolor(color);               // saves the color into the library
        var toHsl = (input.toHslString()).substring(0,7);             //converst the value to hsl and changes it a little
        toHsl = (toHsl+' 100%, 50%)');
        var hslValue = new tinycolor(toHsl);            // saves the modified  hsl value so it can be used again
        var rgbObj = hslValue.toRgb();                // changes to rgb object
        delete rgbObj['a']
        rgbObj.r = brightness[rgbObj.r];        // TODO need to make a new key on the orgainze data object for web page led and arduino led values
        rgbObj.g = brightness[rgbObj.g];
        rgbObj.b = brightness[rgbObj.b];
        return rgbObj;                          //modified led values for one color

      }
    }

    function displayColors(orgData){
      var rgbcolordisplay = $(".rgbcolordisplay");
      var hexcolordisplay = $(".hexcolordisplay")
      for (var i=0; i<orgData.ledwebpage.length; i++){
        let divRow = $("<div>");                          //creates the div row
        divRow.attr("class", "row");
        rgbcolordisplay.append(divRow);                      // adds the class row
        let divCol = $("<div>");
        divCol.attr("class", "col-12 singlecolor");  //remove singlecolordisplay to remove the class that keeps it hidden
        divCol.attr("id", "rgb"+i);
        var red = orgData.ledwebpage[i].r
        red = red.toString();
        var green = orgData.ledwebpage[i].g;
        green = green.toString();
        var blue = orgData.ledwebpage[i].b;
        blue = blue.toString();
        var rgb = ("rgb("+red+","+green+","+blue+")");

        divCol.css({"background-color": rgb});
        divCol.css({"box-shadow": "inset 0 0 10px #000000"});
        divRow.append(divCol);
      }

      for (var i=0; i<orgData.original.length; i++){
        let divRow = $("<div>");                          //creates the div row
        divRow.attr("class", "row");
        hexcolordisplay.append(divRow);                      // adds the class row
        let divCol = $("<div>");
        divCol.attr("class", "col-12 singlecolor");  //remove singlecolordisplay to remove the class that keeps it hidden
        divCol.attr("id", "hex"+i);
        var hex = orgData.original[i][0];
        divCol.css({"background-color": hex});
        divCol.css({"box-shadow": "inset 0 0 10px #000000"});
        divRow.append(divCol);
      }
      // var Rcolor1 = $("#rgb1");
      // var Hcolor1 = $("#hex1");
      // Hcolor1.css({'background-color': orgData.original[0][0]})
      // Rcolor1.css({'background-color': `rgb(${orgData.led[0].r},${orgData.led[0].g},${orgData.led[0].b})`});  //'rgb' + " (" + orgData.led[0].r + "," + orgData.led[0].g + "," + orgData.led[0].b + ")" });
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




    $("#colorfields").on("mousedown", function(event){
      console.log(event.target.id);
      console.log($("#rgb0"));
      if(event.target.id == 'rgb0'){
        led(orgData.led[0]);
      }
      else if(event.target.id == 'rgb1'){
        led(orgData.led[1]);
      }
      else if(event.target.id == 'rgb2'){
        led(orgData.led[2]);
      }
      else if(event.target.id == 'rgb3'){
        led(orgData.led[3]);
      }
      else if(event.target.id == 'rgb4'){
        led(orgData.led[4]);
      }
      else if(event.target.id == 'rgb5'){
        led(orgData.led[5]);
      }
      else if(event.target.id == 'rgb6'){
        led(orgData.led[6]);
      }
      else if(event.target.id == 'rgb7'){
        led(orgData.led[7]);
      }
      else if(event.target.id == 'rgb8'){
        led(orgData.led[8]);
      }
      else if(event.target.id == 'rgb9'){
        led(orgData.led[9]);
      }
      else if(event.target.id == 'rgb10'){
        led(orgData.led[10]);
      }
    })


    $("#colorfields").on("mouseover", function(event){
      console.log(event.target.id);

      //console.log(one[0].style.backgroundColor);
      if(event.target.id == 'rgb0'){
        let zero = $("#rgb0");
        zero.css({"box-shadow": `0px 0px 5px 7px ${zero[0].style.backgroundColor}, inset 0 0 10px #000000`});
      //  $("#rgb0").css({"box-shadow": `5px 5px 5px 0px ${$("#rgb0")[0].style.backgroundColor}`});
      }
      else if(event.target.id == 'rgb1'){
        let one = $("#rgb1");
        one.css({"box-shadow": `0px 0px 5px 7px ${one[0].style.backgroundColor}, inset 0 0 10px #000000`});
      }
      else if(event.target.id == 'rgb2'){
        let two = $("#rgb2");
        two.css({"box-shadow": `0px 0px 5px 7px ${two[0].style.backgroundColor}, inset 0 0 10px #000000`});
      }
      else if(event.target.id == 'rgb3'){
        let three = $("#rgb3");
        three.css({"box-shadow": `0px 0px 5px 7px ${three[0].style.backgroundColor}, inset 0 0 10px #000000`});
      }
      else if(event.target.id == 'rgb4'){
        let four = $("#rgb4");
        four.css({"box-shadow": `0px 0px 5px 7px ${four[0].style.backgroundColor}, inset 0 0 10px #000000`});
      }
      else if(event.target.id == 'rgb5'){
        let five = $("#rgb5");
        five.css({"box-shadow": `0px 0px 5px 7px ${five[0].style.backgroundColor}, inset 0 0 10px #000000`});
      }
      else if(event.target.id == 'rgb6'){
        let six = $("#rgb6");
        six.css({"box-shadow": `0px 0px 5px 7px ${six[0].style.backgroundColor}, inset 0 0 10px #000000`});
      }
      else if(event.target.id == 'rgb7'){
        let seven = $("#rgb7");
        seven.css({"box-shadow": `0px 0px 5px 7px ${seven[0].style.backgroundColor}, inset 0 0 10px #000000`});
      }
      else if(event.target.id == 'rgb8'){
        let eight = $("#rgb8");
        eight.css({"box-shadow": `0px 0px 5px 7px ${eight[0].style.backgroundColor}, inset 0 0 10px #000000`});
      }
      else if(event.target.id == 'rgb9'){
        let nine = $("#rgb9");
        nine.css({"box-shadow": `0px 0px 5px 7px ${nine[0].style.backgroundColor}, inset 0 0 10px #000000`});
      }
      else if(event.target.id == 'rgb10'){
        let ten = $("#rgb10");
        ten.css({"box-shadow": `0px 0px 5px 7px ${ten[0].style.backgroundColor}, inset 0 0 10px #000000`});
      }
    })

    $("#colorfields").on("mouseout", function(event){
      console.log(event.target.id);

      //console.log(one[0].style.backgroundColor);
      if(event.target.id == 'rgb0'){
        let zero = $("#rgb0");
        zero.css({"box-shadow": "inset 0 0 10px #000000"});
      //  $("#rgb0").css({"box-shadow": `5px 5px 5px 0px ${$("#rgb0")[0].style.backgroundColor}`});
      }
      else if(event.target.id == 'rgb1'){
        let one = $("#rgb1");
        one.css({"box-shadow": "inset 0 0 10px #000000"});
      }
      else if(event.target.id == 'rgb2'){
        let two = $("#rgb2");
        two.css({"box-shadow": "inset 0 0 10px #000000"});
      }
      else if(event.target.id == 'rgb3'){
        let three = $("#rgb3");
        three.css({"box-shadow": "inset 0 0 10px #000000"});
      }
      else if(event.target.id == 'rgb4'){
        let four = $("#rgb4");
        four.css({"box-shadow": "inset 0 0 10px #000000"});
      }
      else if(event.target.id == 'rgb5'){
        let five = $("#rgb5");
        five.css({"box-shadow": "inset 0 0 10px #000000"});
      }
      else if(event.target.id == 'rgb6'){
        let six = $("#rgb6");
        six.css({"box-shadow": "inset 0 0 10px #000000"});
      }
      else if(event.target.id == 'rgb7'){
        let seven = $("#rgb7");
        seven.css({"box-shadow": "inset 0 0 10px #000000"});
      }
      else if(event.target.id == 'rgb8'){
        let eight = $("#rgb8");
        eight.css({"box-shadow": "inset 0 0 10px #000000"});
      }
      else if(event.target.id == 'rgb9'){
        let nine = $("#rgb9");
        nine.css({"box-shadow": "inset 0 0 10px #000000"});
      }
      else if(event.target.id == 'rgb10'){
        let ten = $("#rgb10");
        ten.css({"box-shadow": "inset 0 0 10px #000000"});
      }
    })





    $("#picture").on("mouseover",function(){
      console.log('donk');
      $("#picture").css({"box-shadow": '0px 0px 5px 7px white'});
    })
    $("#img").on("mouseout",function(){
      $("#img").css({"box-shadow": ""});
    })


    //testing paintbrush animation

  //   $('#colorfields').on('click', function(){
  //      $(".vernice").attr("class", "vernice verniceOver");
  //      $(".brush").attr("class", "brush brushOver");
  //      $(".gocce").attr("class", "gocce gocceOver");
  //  });


});
