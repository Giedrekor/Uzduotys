// GET - rezervaciju ikelimas
fetch('./rezervacijos.json', {
        headers: new Headers({
            'Content-Type': 'application/json; charset=utf-8'
        })
    })
    .then(response => response.json())
    .then((data) => {
        let output = '<table id="table" data-toggle="table" data-sort-class="table-active" data-sortable="true" data-toolbar="toolbar" class="table table-warning p-0"><thead class="thead-light"><tr><th data-field="date" data-sortable="true" >Rezervacijos data ir laikas</th><th data-field="name" data-sortable="true">Kliento vardas</th><th data-field="phone" data-sortable="true">Kliento tel.nr</th></tr></thead><tbody>';
        data.forEach(function (data) {
            output += '<tr><td>' + data.start + '</td><td>' + data.klientas + '</td><td>' + data.telefonas + '</td></tr>';

        });
        output += '</tbody>';
        document.getElementById('rezervacijos').innerHTML = output;
        // klientams rodys ne pilna info:
        let outputKlientams = '<table id="table" data-toggle="table" data-sort-class="table-active" data-sortable="true" data-toolbar="toolbar" class="table table-warning p-0"><thead class="thead-light"><tr><th data-field="date" data-sortable="true">Esamos rezervacijos</th></thead><tbody>';
        data.forEach(function (data) {
            outputKlientams += '<tr><td>' + data.start + '</td>';

        });
        outputKlientams += '</tbody>';
        document.getElementById('rezervacijosKlientams').innerHTML = outputKlientams;
    })
    .catch(error => console.error(error));

// kalendorius registracijoje
$('#laikas').datetimepicker({
    ownerDocument: document,
    format: 'Y-m-d H:i',
    startDate: new Date(),
    step: 15,
    monthChangeSpinner: true,
    closeOnDateSelect: false,
    closeOnTimeSelect: true,
    closeOnWithoutClick: true,
    closeOnInputClick: true,
    openOnFocus: true,
    timepicker: true,
    datepicker: true,
    defaultTime: false,
    defaultDate: false,
    minDate: 0,
    maxDate: false,
    minTime: '10:00',
    maxTime: '20:00',
    minDateTime: 0,
    maxDateTime: false,
    // allowTimes: [],
    opened: false,
    initTime: true,
    inline: false,
    touchMovedThreshold: 5,
    onSelectDate: function () {},
    onSelectTime: function () {},
    onChangeDateTime: function () {},
    onShow: function () {},
    onClose: function () {},
    onGenerate: function () {},
    style: '',
    id: '',
    inverseButton: false,
    next: 'xdsoft_next',
    prev: 'xdsoft_prev',
    dayOfWeekStart: 1,
    parentID: 'body',
    timeHeightInTimePicker: 25,
    timepickerbar: true,
    todayButton: true,
    prevButton: true,
    nextButton: true,
    defaultSelect: true,
    scrollMonth: true,
    scrollTime: true,
    scrollInput: true,
    allowBlank: false,
    yearStart: 2019,
    yearEnd: 2020,
    monthStart: 0,
    monthEnd: 11,
    roundTime: 'round',
    className: '',
    weekends: [],
    highlightedDates: [],
    highlightedPeriods: [],
    // disabledDates: ['2019-03-11'],
    yearOffset: 0,
    beforeShowDay: null,
    enterLikeTab: true,
    showApplyButton: false,
});
$.datetimepicker.setLocale('lt');

// POST - nauja rezervacija
document.getElementById('postData').addEventListener('submit', postData);

function postData(event) {
    event.preventDefault();
    let newData = {
        'kirpeja': document.querySelector('#kirpeja').value,
        'klientas': document.querySelector('#klientas').value,
        'tel': document.querySelector('#tel').value,
        'laikas': document.querySelector('#laikas').value
    };

    let myJSON = JSON.stringify(newData);
    fetch('./rezervacijos.json', {
        method: 'POST',
        body: myJSON
    }).then(res => {
        console.log("Request complete:" + myJSON);
        alert("Dėkui.\nJūsų rezervaciją gavome!");
    }).catch(function (res) {
        console.log(res)
    });
    $('#newRecord').modal('toggle');
};

// DELETE - trinti rezervacija
document.getElementById('deleteData').addEventListener('submit', deleteData);

function deleteData(event) {
    let deleteData = {
        'klientas': document.querySelector('#klientas').value
    };
    let myJSON = JSON.stringify(deleteData);
    fetch('./rezervacijos.json' + myJSON, {
        method: 'DELETE'
    });
};

// paieska pagal data rezervacijose
function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = (input.value);
    table = document.getElementById("rezervacijos");
    tr = table.getElementsByTagName("tr");
    // perziuri visas lenteles eilutes:
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
};

// paieska klientams
function myFunctionK() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInputK");
    filter = (input.value);
    table = document.getElementById("rezervacijosKlientams");
    tr = table.getElementsByTagName("tr");
    // perziuri visas lenteles eilutes:
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
};