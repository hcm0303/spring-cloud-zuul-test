$(document).ready(function() {

});

function doLogin() {
    var id = $("#userId").val();
    var pw = $("#userPw").val();

    console.log("id", id);
    console.log("pw", pw);

    var data = {
        userId: id,
        userPw: pw
    };

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/login",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(data),
        success: function(response) {
            console.log("response", response);
            var result = response.valid;
            var message = response.message;

            if(result) {
                location.href="/board/jqgrid/board.html";
            } else {
                alert(message);
            }
        },
        error: function(error) {
            console.log("error", error);
        }
    });
}