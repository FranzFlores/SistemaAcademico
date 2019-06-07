$(document).ready(function () {

    $('.datepicker').datepicker({ format: 'yyyy/mm/dd'});

    loadPeriodSubjectModal();
    loadSubjectstoModal();
    editPeriod();
    

    

});

function loadPeriodSubjectModal(){
    $("#PeriodTable tbody tr td .plus").click(function(e){
        $('.modal').modal();
        $('.ok').hide();
        e.preventDefault();
    });
}

function loadSubjectstoModal(){
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
                html += "<li class='collection-item valign-wrapper'>"+ item.name +  "<br>Carrera " + item.curriculum_cycle.curriculum.career.name +" Malla "+item.curriculum_cycle.curriculum.year;
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
                        }else{
                            M.toast({html: 'La Materia ya está asignada al período'});
                        }
                        $('.ok').show();
                        $('.cancel').hide();
                        $('#save').hide();
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
}


function editPeriod(){
    $('.edit').click(function(e){
        var idPeriod = $(this).attr('data-id');
        var url =  "http://localhost:3000/period/"+idPeriod;
        $.ajax({ 
            type: 'GET',
            url: url,
            success: function (data, textStatus, jqXHR) {
                var aux = data.start.split('\T');
                var start_date = aux[0];
                var aux1 = data.end.split('\T');
                var end_date = aux1[0];
                $("#name").val(data.name );
                $("#start").val(start_date);
                $("#end").val(end_date);
                $("#button").text("Editar");
                $("#button").attr('data-id',idPeriod );
            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
        e.preventDefault();
    })

    $("#button").click(function(e){
        var idPeriod = $(this).attr('data-id');
        if($(this).text()=="Editar"){
           $("#periodForm").attr('action','/period/update/'+idPeriod);
        }
    });
}


