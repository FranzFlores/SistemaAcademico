$(document).ready(function () {
    loadCurriculums();
});


function loadCurriculums() {
    var url = "http://localhost:3000/curriculum/all";
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data, textStatus, jqXHR) {    
            console.log(data);       
            var html = "";
            $.each(data, function (i, item) {
                html += "<option value='" + item._id + "'>" + item.year + "-"+ item.career.name+  "</option>";
            });
            
            $("#curriculums").html(html);
            $('select').formSelect();
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}