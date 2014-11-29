/**
 * Created by alex on 26.11.14.
 */


function defaults(){
    $("#search_template").hide();
    $("#extra-search").hide();

    var productList = $("#products_template").html();
    var template = Handlebars.compile(productList);

    $.getJSON("assets/data/featured-products.json", function (products) {
        $("ul#templates").append(template(products.items));
    }).fail(function (jqXHR, textStatus) {
        console.log("Error code: " + jqXHR.status);
    });
}

function activateSearch() {

    $("#extra-search").show();
    $(".search_template").show();

    var searchList = $("#search_template").html();
    var searchTemplate = Handlebars.compile(searchList);

    $.getJSON("assets/data/search-results.json", function (results) {
        $("ul#templates").append(searchTemplate(results.items));
    }).fail(function (jqXHR, textStatus) {
        console.log("Error code: " + jqXHR.status);
    });

    $("#slider").on("slide", function (value) {
        $("#priceFrom").val(value.value[0]);
        $("#priceTo").val(value.value[1]);
    });

    $("#slider").slider({});

    $(".datepicker").datetimepicker();


}

$(".navbar-form").submit(function (event) {
    $(".navbar-form").hide();
    $(".carousel").hide();
    $(".products_template").hide();
    activateSearch();
    event.preventDefault();
});

defaults();
