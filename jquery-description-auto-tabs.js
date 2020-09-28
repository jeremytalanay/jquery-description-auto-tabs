/*
    App Name: Rich Text Editor Description to Auto Tabs
    Version: 1.1
    Author: Jeremy Talanay
    Date: September 19, 2020
    Notes: This can only run one tab at a time per pages.

    Calling the Script: autoTabs.initialize("#description", "#description");
    Parameters: Source Container (string), Target (string), Settings (array) <-- Settings (array) is not yet developed
*/
var autoTabs = {
    initialize: function(container, target, settings){
        var sourceContainer = container;
        var targetContainer;

        if(target){ targetContainer = target;
        }else{ targetContainer = container; }

        var headingSet = ["h1", "h2", "h3", "h4", "h5", "h6"];

        var headingSelect;
        var stopHeadingSelect = false;
        var ituloy = true;
        $(sourceContainer + " *").each(function(){
            if(!stopHeadingSelect){
                for(var h=0; h<headingSet.length; h++){
                    if($(this).is(headingSet[h])){
                        headingSelect = headingSet[h];

                        if($(headingSelect).length <= 1){
                            ituloy = false;
                        }
                        stopHeadingSelect = true;
                        break;
                    }
                }
            }
        });

        if(headingSelect && ituloy == true){
            var constructTabNavContents = [];
            var constructTabPaneContents = [];
            $(sourceContainer + " *").each(function(){
                if($(this).text().trim() === '')
                $(this).remove();

                if($(this).is(headingSelect) && $(this).nextUntil(headingSelect).html()){
                    constructTabNavContents.push($(this).text());
                    constructTabPaneContents.push($(this).nextUntil(headingSelect));
                }
            });

            /* CONSTRUCT NAVIGATION */
            var constructElements = "";
            constructElements += "<ul class='autotabs_nav'>";
            for(var n=0;n<constructTabNavContents.length;n++){
                var liclass = "";
                if(n == 0){ liclass = "active"; }
                constructElements += "<li class='"+liclass+"' id='autotab_navitem'><a href='#tab_"+n+"' onclick='return false;'>"+constructTabNavContents[n]+"</a></li>";
            }
            constructElements += "</ul>";

            /* CONSTRUCT TAB CONTENTS */
            constructElements += "<div class='autotabs_tabs'>";
            for(var c=0;c<constructTabPaneContents.length;c++){
                var paneclass = "";
                if(c == 0){ paneclass = "active"; }

                constructElements += "<div class='autotabs_pane "+paneclass+"' id='tab_"+c+"'>";
                for(var cx=0;cx<constructTabPaneContents[c].length;cx++){
                    constructElements += constructTabPaneContents[c][cx].outerHTML;
                }
                constructElements += "</div>";
            }
            constructElements += "</div>";

            $(targetContainer).html("<div class='autotabs_container'>" + constructElements + "</div>");
        }
    }
}

$(document).on("click", "#autotab_navitem", function(){
    $(".autotabs_nav li").removeClass("active");
    $(".autotabs_tabs .autotabs_pane").removeClass("active");

    var newTab = $(this).find("a").attr('href');

    $(this).addClass("active");
    $(".autotabs_tabs .autotabs_pane"+newTab).addClass("active");
});
