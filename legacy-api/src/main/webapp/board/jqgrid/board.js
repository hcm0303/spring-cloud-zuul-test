var selectedRow;

$(document).ready(function() {
    initGrid();
});

function initGrid() {

    $("#board_test").jqGrid({
        url: "http://localhost:8080/test/board/list",
        mtype: "POST",
        datatype: "json",
        ajaxGridOptions: {
            contentType: "application/json"
        },
        serializeGridData: function(postData) {
            console.log("postData", postData);
            return JSON.stringify(postData);
        },
        height: 250,
        width: 630,
        colNames: ["글번호", "제목", "작성자"],
        colModel: [
            {name: "boardNo", align: "center", hidden:true, key:true},
            {name: "boardTitle", align: "center", sortable: false},
            {name: "userId", align: "center"}
        ],
        rownumbers: true,
        viewrecords: true,
        pager: "#pager_test",
        rowList: [10, 20, 30, 40],
        rowNum: 10,
        jsonReader: { page: "page", total: "totalPages", root: "rows", records: "totalRecords", repeatitems: false },
        onSelectRow: function(rowId, status, e) {
            location.href="/board/jqgrid/board-detail.html?boardNo=" + rowId;
        }
    });
}

function goCreateBoard() {
    location.href = "/board/jqgrid/board-insert.html";
}