var items = [
    "Apples",
    "Apricots",
    "Aubergines",
    "Bananas",
    "Beetroot",
    "Carrots",
    "Cornflakes",
    "Courgettes",
    "Chives",
    "Fennel",
    "Milk",
    "Potatoes",
    "Salt",
    "Strawberries",
    "Sugar"
];

var chosenItems = {};

$(document).ready(function () {
    var q = localStorage.getItem("previousList");
    if (q != null) chosenItems = JSON.parse(q);

    displayItems();

    toggleHover();
});


var toggleHover = function () {
    $("ul[data-role=listview] li a").on("mouseover",function () {
        var hey = $(this)
        hey.toggleClass("checkbox");
    })
}

var displayItems = function () {
    $.each(items, function (index, value) {
        $("#demo legend").append(
        "<input type=\"button\" name=\"" + value + "\" id=\"" + value + "\"" +
        "value=\"" + value + "\" onclick=\"gotoQuantity(this)\" >"
        )
    });

}
        $(document).ready(function () {

            $("#submit").validate({
                rules:{
                    textarea_name:{
                        required:true,
                        minlength:20
                    }
                }
            });
        });
        $("Submit.button").click(function () {
            // validate and process form
            // first hide any error messages
            $('.error').hide();

            var name = $("input#textarea").val();
            if (name == "") {
                $("label#textarea_error").show();
                $("input#textarea").focus();
                return false;
            }
        });
       // var dataString = 'text'+text+'&message=' + message;
        //alert (dataString);return false;

        $.ajax({
            type: "POST",
            url: "bin/process.php",
            data: dataString,
            success: function() {
                $('#addItems').html("<div id='message'></div>");
                $('#message').html("<h2>Success!!</h2>")
                .append("<p>You forgot something!</p>")
                .hide()
                .fadeIn(1500, function() {
                    $('#message').append("<img id='checkmark' />");
                });
            }
        });
     

