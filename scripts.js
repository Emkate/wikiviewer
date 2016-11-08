$(function(){

    function searchFunc(){
        if(/\S/.test($("#textField").val())){
            $("#resultsDiv").find("div").remove();
            $("#searchDiv").animate({"margin-top":"20px"}, 400, function(){
                var searchstring = 'https://pl.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrsearch=' + $("#textField").val() + '&callback=?';
                $.getJSON(searchstring, function(data) {
                    $.each(data.query.pages, function(i, item) {
                        var pageDescription = "https://pl.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&pageids=" + item.pageid + "&callback=?";
                        $.getJSON(pageDescription, function(data2){
                            $.each(data2.query.pages, function (i, item2) {
                                console.log(item2);
                                $("#resultsDiv").append("<div class='container result animated fadeInUp'><h3>" + item.title + "</h3><br><p>" + $(item2.extract).text().substring(0,97) + "..." + "</p></div>");
                            });
                        });
                    });
                });
            });
        }
    }

    $(document).keypress(function(e) {
        if(e.which == 13) {
            searchFunc();
        }
    });

    $("#textField").focus(function(){

        $("#textField").animate({"width":"32px", "height":"32px","border-radius":"20px !important"}, 600, function(){
            $("#textField").animate({"width":"200px"}, 600, function(){
                $("#xButton").fadeIn(300);
                $("#searchButton").fadeIn(300);
            });


        });

    });

    $("#xButton").click(function(){
        $("#xButton").hide();
        $("#searchButton").hide();
        $("#textField").val('').animate({"width":"34px"}, 600, function(){
            $("#textField").animate({"width":"120px", "height":"120px","border-radius":"80px !important"});
        });
    });

    $("#searchButton").click(function(){
        searchFunc();
    });
});



