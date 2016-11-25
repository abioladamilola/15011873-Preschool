var _result = false;
var _leftValue = 3;
var _rightValue = 1;
var _x;
var _y;
var _isInitialized = false;


$(document).on("mobileinit", function(event) {
});

$(document).on("pageinit", function (event) {
    initApp();
    $("img.number-button").on("tap", function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        var numberBtn = $(this);
        verify(numberBtn);
        return false;
    });
    $("img.play-again").on("tap", function (e) {
        playAgain();
    });



});


$(document).ready(function (parameters) {

});


var initApp = function () {
    if (_isInitialized)
        return false;
    cloneApples();
    generateRandomNumber();
    resetCalculator();
      appleInPlayGround();
    _result = false;
    _isInitialized = true;
}

var playAgain = function () {
    cloneApples();
    generateRandomNumber();
    resetCalculator();
        appleInPlayGround();
   _result = false;


    $.mobile.navigate("#index");
}

var generateRandomNumber= function() {
    var x = randomNumber();
    var y = randomNumber();
    var z = x + y;
    if (z >= 10 || (x == _x && y == _y)) {
        return generateRandomNumber();
    }
    _leftValue = x;
    _rightValue = y;

    return false;
}
var resetCalculator= function() {
    $(".calculator>.left-value").html(_leftValue);
    $(".calculator>.right-value").html(_rightValue);
    $(".calculator>.result").html("?");

}
var appleInPlayGround = function () {
    // get all aplles in plate
    var apples = $(".apples").children();
    var applesCount = apples.length;
    // put apples in play ground
    var leftCount = 0;
    var rightCount = 0;

    var draggableApples =Array.from(document.getElementsByClassName("apple"));
    
    draggableApples.forEach(function(ele) {
        ele.addEventListener('touchmove', function (event) {
            var touch = event.targetTouches[0];

            // Place element where the finger is
            ele.style.left = touch.pageX - 25 + 'px';
            ele.style.top = touch.pageY - 25 + 'px';
            event.preventDefault();
        }, false);
    })
    //for (var i = 0; i < 9; i++) {
    //    var id = "apple" + i;
    //    var draggableApple = document.getElementById("apple")
    //    draggableApple.addEventListener('touchmove', function (event) {
    //        var touch = event.targetTouches[0];

    //        // Place element where the finger is
    //        draggableApple.style.left = touch.pageX - 25 + 'px';
    //        draggableApple.style.top = touch.pageY - 25 + 'px';
    //        event.preventDefault();
    //    }, false);

    //}
    //for (var i = 0; i < applesCount; i++) {
    //    var img = $(apples[i]);
    //    console.log(_leftValue, _rightValue);
    //    if (leftCount < _leftValue) {
    //        //add to play ground
    //        addApple(".left-apples", img);

    //        leftCount++;
    //        continue;

    //    }
    //    if (rightCount < _rightValue) {
    //        addApple(".right-apples", img);
    //        rightCount++;

    //        continue;
    //    }

    //    break;
    //}

    return false;

}
var addApple=function (selector, appleToAdd) {
    appleToAdd.removeClass("apple");
    //appleToAdd.addClass("apple-in-play animated slideInUp");
    appleToAdd.animate({
        width: "50px",
             float:"left"  
    }, 1000, "swing");

        $(selector).append(appleToAdd);

}
var verify = function (numberBtn) {
    var numberButton = numberBtn.attr("data-value");
    numberButton = parseInt(numberButton);
     _leftValue = $(".calculator>.left-value").text();
     _rightValue = $(".calculator>.right-value").text();

     _leftValue = _leftValue == 0 ? 0 : parseInt(_leftValue);
     _rightValue = _rightValue == 0 ? 0 : parseInt(_rightValue);
     var result = calculate(_leftValue, _rightValue);

    if (result === numberButton) {
        showSuccess(result);
        _result = true;
    } else {
        showErrorPage();
        _result = false;
    }
}

var isResult = function () { return _result; };
var showErrorPage = function() {
    anim("error flash");

    function anim(x) {
        $('h1.result').addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass(x + ' animated');
        });
    };
};
var showSuccess = function (result) {
    $(".calculator>.result").text(result);
    $(".results>.result").text(result);
    $(".results>.left-value").text(_leftValue);
    $(".results> .right-value").text(_rightValue);

    var url = "#successPage";
    $.mobile.navigate(url);
};

var cloneApples = function () {
    $(".left-apples, .right-apples").empty();
    $(".apples").empty();
    var nApple = "<img id=\"apple\" class=\"apple\" src=\"img/apple.png\"/>";
    $(".apples").append(nApple);

  

    for (var i = 0; i < 8; i++) {
        var apple = $("#apple");
        
        var appleId = apple.attr("id");
        var clone = apple.clone();
        clone.attr("id", appleId + i);
        
        clone.insertAfter(apple);


    }
}

var calculate = function (leftValue, rightValue) {
    if (isNaN(leftValue)) {
      return   logError(null, "The Left-Hand-Side of the operation is not provided.");}
    if (isNaN(rightValue)) {
        return logError(null, "The Right-Hand-Side of the operation is not provided.");
    }
    //if(_leftValue || isNaN(_rightValue))
    //    return logError(null, "Invalid operation.");

    return leftValue + rightValue;
}

var logError=function (title, message, show) {
    title = title || "Error";
    message = message || "An error as occured";
    show = show || true;

    var dialog = $("#errorDialog");
    dialog.attr("data-title", title);
    $(".title").text(title);
    $(".message").text(message);
   
    dialog.popup("open");
    return false;
}
var randomNumber= function (min,max) {
    min = min || 0;
    max = max || 4;
    return Math.floor(Math.random()*(max-min+1)+min);
}