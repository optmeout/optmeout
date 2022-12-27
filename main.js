/*
* main.js
* https://github.com/optmeout/optmeout/blob/main/main.js
* https://optmeout.github.io/optmeout/main.js
* 
* By xyti, https://github.com/xyti
*
* License : https://github.com/optmeout/optmeout/blob/main/LICENSE (MIT)
* source  : https://github.com/optmeout/optmeout
*/
var data = "";
var query = "";
document.querySelector("form").onsubmit = function(e){e.preventDefault();}
var urlraw = new URL(window.location.href);
var query = urlraw.searchParams.get("q");
var home = "https://optmeout.github.io/optmeout/"
function copyText(a) {
    var b = document.createElement('textarea');
    c = document.getSelection();
    b.textContent = a;
    document.body.appendChild(b);
    c.removeAllRanges();
    b.select();
    document.execCommand('copy');
    c.removeAllRanges();
    document.body.removeChild(b);
}
var permalink = document.querySelector("#permalink");
permalink.href = window.location.href;
permalink.onclick = function(e){
    e.preventDefault();
    copyText(window.location.href);
    document.querySelector("#error-text").innerHTML = "Permalink copied!";
    document.querySelector(".error-banner").style.display = "flex";
    document.querySelector(".error-banner").style.opacity = 1;
}
$(document).ready(function(){
    var url = "https://raw.githubusercontent.com/optmeout/optmeout/main/data.json";
    $.ajax({
        url: url,
        method: "GET",
        success: function(item){
            data = JSON.parse(`${item}`);
	    $('#txt-search').removeAttr("readonly");
	    $('#txt-search').focus();
	    $('#entries').html(data.length);
	    if (query.slice(0,1) == "*") {
	    	$('#txt-search').val(query);
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
		$('#results').html(count - 1 + " results");
	    } else if (query != null && query != "") {
		$('#txt-search').val(query);
		var regex = new RegExp(query, "i");
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
		$('#results').html(count - 1 + " results");
	    }
        },
        error: function(){
            // error function goes here
        }
    });
    $('#txt-search').keyup(function() {
        var searchField = $(this).val();
	permalink.href = home + "?q=" + searchField;
        permalink.onclick = function(e){
            e.preventDefault();
            copyText(permalink.href);
            document.querySelector("#error-text").innerHTML = "Permalink copied!";
            document.querySelector(".error-banner").style.display = "flex";
            document.querySelector(".error-banner").style.opacity = 1;
        }
        if(searchField === '')  {
            $('#filter-records').html('');
            return;
        }
	if(searchField.search("_") != -1)  {
	    var output = '<div class="row">';
	    output += "<div align=\"center\">Can't find what you're looking for? <a href=\"https://github.com/optmeout/optmeout\">Help make OptMeOut better</a>.</div>";
            output += '</div>';
            $('#filter-records').html(output);
	    $('#results').html("0 results");
            return;
        }
	if(searchField.slice(0,1) == '*')  {
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
	    $('#results').html(count - 1 + " results");
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
	$('#results').html(count - 1 + " results");
    });
});
