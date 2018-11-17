// GET all to Table, start
$.getJSON("https://jsonplaceholder.typicode.com/posts", 
function (data) {
    var items = [];
    $.each(data, function (key, val) { 
        items.push("<tr onclick='document.location = 'details.html';'>");
            items.push("<td id='" + key + "'><a href='details.html'>" + val.userId + "</a></td>");
            items.push("<td id='" + key + "'><a href='details.html'>" + val.id + "</a></td>");
            items.push("<td id='" + key + "'><a href='details.html'>" + val.title + "</a></td>");
            items.push("<td id='" + key + "'><a href='details.html'>" + val.body + "</a></td>");
        items.push("</tr>");
    });
        $("<tbody/>", { html: items.join("") }).appendTo("table");

// GET details, start
        const Url = 'https://jsonplaceholder.typicode.com/posts';
        var html = "";
        $('.spausti').click(function() {
            $.getJSON(Url, function(result){
                html = JSON.stringify(result[2]);
                document.getElementById("demo").innerHTML = html
            });
        })
// GET details, end

});
// GET all to Table, end


// POST, start
const Url = 'https://jsonplaceholder.typicode.com/posts/';
var data = {
    userId: 11,
    id: 101,
    title: "Pavadinimas",
    body:"cia yra tekstas"
}
$('.myButton').click(function() {
    $.post(Url,data, function(data, status){
        document.getElementById("myDemo").innerHTML = JSON.stringify(data)
    });
})
// POST, end





