$(document).ready(function() {

});

function createBoard() {
    var boardTitle = $("#boardTitle").val();
    var boardDes = $("#boardDes").val();
    var boardImage = $("#boardImage")[0].files[0];

    console.log("boardImage", boardImage);

    var data = new FormData();
    data.append("boardTitle", boardTitle);
    data.append("boardDes", boardDes);
    data.append("boardImage", boardImage);


    $.ajax({
        url: "http://localhost:8080/test/board",
        type: "POST",
        enctype: "multipart/form-data",
        contentType: false,
        processData: false,
        data: data,
        success: function(response) {
            if(response) {
                var result = response.valid;
                var message = response.message;
                if(result) {
                    alert(message);
                    location.href="/board/jqgrid/board.html";
                }
            }
        },
        error: function(error) {
            if(error) {
                if(error.status == 401) {
                    var errorMessage = error.responseJSON.message;
                    alert(errorMessage);
                    location.href="/board/index.html";
                }
            }
        }
    });

}