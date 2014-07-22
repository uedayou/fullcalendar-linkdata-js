$(document).ready(function() {
    $('#calendar').modalmanager('loading').find('.modal-scrollable').off('click.modalmanager');  

    var dataUrl = 'http://linkdata.org/api/1/'+ldDataset+'/'+ldFileName+'_tsv.txt';
    $.ajax ({
        type:'GET',
        //dataType:'text',
        dataType:'jsonp',
        url: dataUrl,
        contentType: "text/csv; charset=utf-8",
        error: function() {
            alert('Error retrieving csv file');
        },
        success: function(data) {
            data = _tsv2EventData(data);

            // page is now ready, initialize the calendar...
            $('#calendar').fullCalendar({
                // put your options and callbacks here
                lang: 'ja',
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                timeFormat: 'h:mm',
                firstDay: 1,
                defaultDate: typeof defaultDate == 'string' ? defaultDate : moment(),
                events: data,
                eventClick: function(calEvent, jsEvent, view) {
                    showEventModal(calEvent.data);
                },
                dayClick: function() {},
                viewDisplay: function(view) {}
            });

            $('#calendar').modalmanager('removeLoading');
            $('#calendar').removeClass('modal-open');
        }
    });


});

var titles = null;

var _tsv2EventData = function(tsv) {
    // get header
    var events = [];
    var titulos = null;
    tsv = tsv.split("\n");
    if (tsv.length < 10) return;
    while(tsv[0].match(/^#/)) {
        if (tsv[0].match(/^#property\t/)) {
            titulos = tsv[0];
            titulos = titulos.trim().split("\t");
            titulos[0] = "ID";
        }
        tsv.splice(0,1);
    }
    if (titulos===null) return;
    
    for (var num_linea = 0; num_linea < tsv.length; num_linea++) {
        var campos = tsv[num_linea].trim().split("\t");
        if (campos.length<2) break;
        ev = {};
        ev.title = campos[titulos.indexOf(labelTitle)];
        ev.start = campos[titulos.indexOf(labelStartDate)];
        if (!moment(ev.start).isValid()) break;
        if (typeof labelEndDate == 'string' && titulos.indexOf(labelEndDate)>=0 && campos[titulos.indexOf(labelEndDate)] !== null ) {
            //ev.end = campos[titulos.indexOf(labelEndDate)];
            // 時間が0時ちょうどの場合は一日足す
            if (moment(campos[titulos.indexOf(labelEndDate)]).format('HH:mm:ss')=="00:00:00" || allDayFlag) {
                ev.end = moment(campos[titulos.indexOf(labelEndDate)]).add('days', 1).format();
            }
            else {
                ev.end = campos[titulos.indexOf(labelEndDate)];
            }
        }
        ev.color = colors[num_linea%colors.length];
        ev.data = tsv[num_linea].trim();
        ev.allDay = allDayFlag;
        events.push(ev);
    }

    titles = titulos;

    return events;
}

var _rdfJson2EventData = function(json) {}

var showEventModal = function(data) {
    if (titles !== null) {
        var content = '<table class="table table-striped table-bordered table-condensed">';
        data = data.split("\t");
        for (var i=0;i<data.length;i++) {
            var title = titles[i];
            var attr = data[i];
            if (typeof attr === 'string' && attr.indexOf('http') === 0) {
                attr = '<a target="_blank" href="' + attr + '">'+ attr + '</a>';
            }
            if (attr) {
                content += '<tr><th>'+title+'</th><td>'+ attr +'</td></tr>';
            }
        }
    }
    $("#event-detail").html(content+"</table>");
    $("#event-modal").modal('show');
};
