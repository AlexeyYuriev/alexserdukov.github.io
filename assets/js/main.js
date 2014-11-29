/**
 * Created by alex on 26.11.14.
 */

$(function(){

    var productList = $("#products_list_template").html();
    var template = Handlebars.compile(productList);

    $.getJSON("assets/data/featured-products.json", function (products) {
        $("ul#products").append(template(products.items));
    }).fail(function (jqXHR, textStatus) {
        console.log("Error code: " + jqXHR.status);
    });

    var searchList = $("#search_results_template").html();
    var searchTemplate = Handlebars.compile(searchList);

    $.getJSON("assets/data/search-results.json", function (results) {
        $("ul#searchResults").append(searchTemplate(results.items));
    }).fail(function (jqXHR, textStatus) {
        console.log("Error code: " + jqXHR.status);
    });

    $("#slider").on("slide", function(value){
        $("#priceFrom").val(value.value[0]);
        $("#priceTo").val(value.value[1]);
    });

    $("#slider").slider({});

    $("#searchResultsForm").hide();
});

$("#navbar").on("click", "#searchButton", function() {
    $("#featured-product-carousel").hide();
    $("form#searchForm").hide();
    $("#products").hide();
    $("#searchResultsForm").show();

});