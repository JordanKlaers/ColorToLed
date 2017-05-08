var moveForce = 30; // max popup movement in pixels
var rotateForce = 20; // max popup rotation in deg

$(document).mousemove(function(event) {
    var docX = $(window).width();
    var docY = $(window).height();

    var moveX = (event.pageX - docX/2) / (docX/2) * -moveForce;
    var moveY = (event.pageY - docY/2) / (docY/2) * -moveForce;

    var rotateY = (event.pageX / docX * rotateForce*2) - rotateForce;
    var rotateX = -((event.pageY / docY * rotateForce*2) - rotateForce);

    $('.popup')
        .css('left', moveX+'px')
        .css('top', moveY+'px')
        .css('transform', 'rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)');
});
