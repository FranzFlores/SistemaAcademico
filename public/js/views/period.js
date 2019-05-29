$(document).ready(function () {
    var subjects = [];
    var period = "";

    $(".plus").click(function (e) {
        period = $(this).attr('data-id');
    });

    var url = "http://localhost:3000/subject/all";
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            
            var html = "";
            $.each(data, function (i, item) {
                html += "<li class='collection-item valign-wrapper'>"+item.name +  "<br>Carrera " + item.curriculum.career.name +" Malla "+item.curriculum.year;
                html += "<button class='light-blue btn add right-align' data-external=" +item._id +" data-add='true'>Agregar</button></li>";
            });
            $("#subjects").html(html);
            $(".add").click(function (e) {
                var external = $(this).attr('data-external');
                if ($(this).attr('data-add') == 'true') {
                    $(this).removeClass('btn light-blue').addClass('btn red');
                    $(this).text('Cancelar');
                    $(this).attr('data-add', 'false');
                    subjects.push(external);
                    
                } else {
                    $(this).removeClass('btn red').addClass('btn light-blue');
                    $(this).text('Agregar');
                    $(this).attr('data-add', 'true');
                    subjects.pop();
                }
                console.log(subjects);
                e.preventDefault();
            });
           
            $("#save").click(function () {
                var instance = M.Modal.getInstance($('.modal'));
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/period/addPeriodSubject",
                    data: {
                        subjects: subjects,
                        period: period
                    },
                    success: function (data, textStatus, jqXHR) {
                        if(data=='ok'){
                            M.toast({html: 'Se subio con exito la información'});
                            $('#modal1').modal('close');
                        }
                    }, error: function (jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown);
                        M.toast({html: 'Ocurrio un error'});
                    }
                });
               //location.reload();
            });
        
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

    $("#PeriodTable tbody tr td .plus").click(function(e){
        $('.modal').modal();
        e.preventDefault();
    });
});