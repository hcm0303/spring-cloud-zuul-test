$(document).ready(function() {
    initView();
});

function initView() {
    var boardNo = getParameters("boardNo");

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/test/board/detail",
        contentType: "application/json",
        data: {boardNo: boardNo},
        success: function(response) {
            console.log("response", response);
            if(response) {
                var boardTitle = response.boardTitle;
                var userId = response.userId;
                var boardDate = response.boardDate;
                var boardDes = response.boardDes;
                var authorMatch = response.authorMatch;

                $("#boardTitle").val(boardTitle);
                $("#userId")[0].innerText = userId;
                $("#boardDate")[0].innerText = boardDate;
                $("#boardDes").val(boardDes);

                if(authorMatch) {
                    var detailButton_HTML = '';
                    detailButton_HTML += '<button onclick="modifyBoard()">수정</button>' + '<button class="button-delete" onclick="deleteBoard()">삭제</button>'
                    $("#detailButton").html(detailButton_HTML);
                }
            }
        },
        error: function(error) {
            console.log("error", error);

            if(error.status == 401) {
                alert("세션이 만료되었습니다.");
                location.href = "/board/index.html";
            }
        }
    });
}

function getParameters(paramName) {

    // 리턴값을 위한 변수 선언
    var returnValue;

    // 현재 URL 가져오기
    var url = location.href;

    // get 파라미터 값을 가져올 수 있는 ? 를 기점으로 slice 한 후 split 으로 나눔
    var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');

    // 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return
    for (var i = 0; i < parameters.length; i++) {
        var varName = parameters[i].split('=')[0];
        if (varName.toUpperCase() == paramName.toUpperCase()) {
            returnValue = parameters[i].split('=')[1];

            return decodeURIComponent(returnValue);
        }
    }
};

function deleteBoard() {
    console.log("삭제삭제!");

    var boardNo = getParameters("boardNo");

    console.log("boardNo", boardNo);

    var deleteData = {
        boardNo: boardNo
    };

    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/test/board",
        contentType: "application/json",
        data: JSON.stringify(deleteData),
        success: function(response) {
            console.log("response", response);
            if(response) {
                var result = response.valid;
                var message = response.message;

                if(result) {
                    alert(message);
                    location.href = "/board/jqgrid/board.html";
                }
            }
        },
        error: function(error) {
            if(error.status == 401) {
                var errorMessage = error.responseJSON.message;
                alert(errorMessage);
                location.href="/board/index.html";
            }
        }
    });
}

function modifyBoard() {

    var boardNo = getParameters("boardNo");
    var modifyBoardTitle = $("#boardTitle").val();
    var modifyBoardDes = $("#boardDes").val();

    var modifyData = {
        boardNo: boardNo,
        boardTitle: modifyBoardTitle,
        boardDes: modifyBoardDes
    };

    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/test/board",
        contentType: "application/json",
        data: JSON.stringify(modifyData),
        success: function(response) {
            console.log("response", response);
            if(response) {
                var result = response.valid;
                var message = response.message;

                if(result) {
                    alert(message);
                    location.href = "/board/jqgrid/board.html";
                }
            }
        },
        error: function(error) {
            if(error) {
                if(error.status == 401) {
                    var errorMessage = error.responseJSON.message;
                    alert(errorMessage);
                    location.href="/board/index.html";
                } else if(error.status == 400) {
                    var errorMessage = error.responseJSON.message;
                    alert(errorMessage);
                    location.href="/board/jqgrid/board.html";
                }
            }
        }
    });
}