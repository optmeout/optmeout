/*
* main.js
* https://github.com/optmeout/optmeout/blob/main/main.js
* https://optmeout.github.io/optmeout/main.js
* 
* By Nimityx, https://github.com/Nimityx
*
* License : https://github.com/optmeout/optmeout/blob/main/LICENSE (MIT)
* source  : https://github.com/optmeout/optmeout
*/
var data = "";
document.querySelector("form").onsubmit = function(e){e.preventDefault();}
$(document).ready(function(){
    var url = "https://raw.githubusercontent.com/optmeout/optmeout/main/data.json";
    $.ajax({
        url: url,
        method: "GET",
        success: function(item){
            data = JSON.parse(`${item}`);
	    $('#txt-search').removeAttr("readonly");
	    $('#txt-search').focus();
        },
        error: function(){
            // error function goes here
        }
    });
    $('#txt-search').keyup(function() {
        var searchField = $(this).val();
        if(searchField === '')  {
            $('#filter-records').html('');
            return;
        }
	if(searchField.search("_") != -1)  {
	    var output = '<div class="row">';
	    output += "<div align=\"center\">Can't find what you're looking for? <a href=\"https://github.com/optmeout/optmeout\">Help make OptMeOut better</a>.</div>";
            output += '</div>';
            $('#filter-records').html(output);
            return;
        }
	if(searchField.substr(0, 1) == '*')  {
            var output = '<div class="row">';
            var count = 1;
            $.each(data, function(key, val){
                output += '<div class="col-md-6 well">';
                output += '<div class="col-md-7">';
                output += '<a href="http://' + val.domain[0] + '" rel="noreferrer noopener nofollow" target="_blank" style="color:#000;"><h5>' + val.name + '</h5></a>';
                output += '<a href="' + val.url[0] + '" rel="noreferrer noopener nofollow" target="_blank">' + val.url[0] + '</a>';
                for (let i = 1; i < val.url.length; i++) {
                    output += '<br><a href="' + val.url[i] + '" rel="noreferrer noopener nofollow" target="_blank">' + val.url[i] + '</a>';
                }
		for (let y = 0; y < (3 - val.url.length); y++){
                    output += '<br><a>​</a>';
                }
                output += '</div>';
                output += '</div>';
                if(count%2 == 0){
                    output += '</div><div class="row">';
                }
                count++;
            });
            output += '</div>';
            $('#filter-records').html(output);
            return;
        }
        var regex = new RegExp(searchField, "i");
        var output = '<div class="row">';
        var count = 1;
        $.each(data, function(key, val){
            if (val.name.search(regex) != -1) {
                output += '<div class="col-md-6 well">';
                output += '<div class="col-md-7">';
                output += '<a href="http://' + val.domain[0] + '" rel="noreferrer noopener nofollow" target="_blank" style="color:#000;"><h5>' + val.name + '</h5></a>';
                output += '<a href="' + val.url[0] + '" rel="noreferrer noopener nofollow" target="_blank">' + val.url[0] + '</a>';
                for (let i = 1; i < val.url.length; i++) {
		    output += '<br><a href="' + val.url[i] + '" rel="noreferrer noopener nofollow" target="_blank">' + val.url[i] + '</a>';
                }
		for (let y = 0; y < (3 - val.url.length); y++){
                    output += '<br><a>​</a>';
                }
                output += '</div>';
                output += '</div>';
                if(count%2 == 0){
                    output += '</div><div class="row">';
                }
                count++;
            }
        });
	var object = "";
	for (i = 0; i < data.length; i++) {
	object += data[i].name + "_"
	}
        if (object.search(regex) == -1) {
        	output += "<div align=\"center\">Can't find what you're looking for? <a href=\"https://github.com/optmeout/optmeout\">Help make OptMeOut better</a>.</div>";
        }
        output += '</div>';
        $('#filter-records').html(output);
    });
});
