$(document).ready(function () {
    var subjects = [];
    var period = "";

    $('.datepicker').datepicker();

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
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/subject-period/create",
                    data: {
                        subjects: subjects,
                        period: period
                    },
                    success: function (data, textStatus, jqXHR) {
                        if(data=='ok'){
                            M.toast({html: 'Se subio con exito la información'});
                            $('.ok').show();
                            $('.cancel').hide();
                            $('#save').hide();
                        }
                    }, error: function (jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown);
                        M.toast({html: 'Ocurrio un error'});
                    }
                });
            });
        
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

    $("#PeriodTable tbody tr td .plus").click(function(e){
        $('.modal').modal();
        $('.ok').hide();
        e.preventDefault();
    });
    
    $('.edit').click(function(e){
        var idPeriod = $(this).attr('data-id');
        console.log(idPeriod)
        var url =  "http://localhost:3000/period/"+idPeriod ;
        $.ajax({ 
            type: 'GET',
            url: url,
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                $("#name").val(data.name );
                $("#button").text("Editar");
                $("#button").attr('data-id',idPeriod );
            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
        e.preventDefault();
    })

});
