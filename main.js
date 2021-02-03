var data = "";
$(document).ready(function(){
    var url = "https://raw.githubusercontent.com/optmeout/optmeout/main/data.json";
    $.ajax({
        url: url,
        method: "GET",
        success: function(item){
            data = JSON.parse(`${item}`);
        },
        error: function(){
            // error function goes here
        }
    });

    $('#txt-search').keyup(function(){
        var searchField = $(this).val();
        if(searchField === '')  {
            $('#filter-records').html('');
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
                output += '</div>';
                output += '</div>';
                if(count%2 == 0){
                    output += '</div><div class="row">';
                }
                count++;
            }
        });
        if (JSON.stringify(data).search(regex) == -1) {
        	output += "<div align=\"center\">Can't find what you're looking for? <a href=\"https://github.com/optmeout/optmeout\">Help make OptMeOut better</a>.</div>";
        }
        output += '</div>';
        $('#filter-records').html(output);
    });
});
