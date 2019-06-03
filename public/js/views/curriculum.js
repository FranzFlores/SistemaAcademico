$(document).ready(function () {
    loadCarrers();

    $('.edit').click(function(e){
        var idCurriculum = $(this).attr('data-id');
        var url =  "http://localhost:3000/curriculum/"+idCurriculum;
        $.ajax({
            type: 'GET',
            url: url,
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                $("#year").val(data.year);
                $("#numPeriod").val(data.numPeriod);
                $("#timePeriod").val(data.timePeriod);
                $("#button").text("Editar");
                $("#button").attr('data-id',idCurriculum);
            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
        e.preventDefault();
    })
});

function loadCarrers() {
    var url = "http://localhost:3000/career/all";
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data, textStatus, jqXHR) {
            var html = "";
            $.each(data, function (i, item) {
                html += "<option value='" + item._id + "'>" + item.name + "</option>";
            });
            $("#careers").html(html);
            $('select').formSelect();
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}