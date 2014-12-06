/**
 * Created by alex on 26.11.14.
 */


function defaults() {

    $.get("navbar.html", function (html) {
        $("#navbar").append(html);
        $(".navbar-form").submit(function (event) {
            $(".navbar-form").hide();
            $("#carousel").hide();
            $(".products_template").hide();
            activateSearch();
            event.preventDefault();
        });
    });

    $.get("carousel.html", function (html) {
        $("#carousel").append(html)
    });

    $.get("productTemplate.html", function (html) {
        $.getJSON("assets/data/featured-products.json", function (products) {
            var template = Handlebars.compile(html);
            $("#templates").append(template(products.items));
        }).fail(function (jqXHR, textStatus) {
            console.log("Error code: " + jqXHR.status);
        });
    });

}

function activateSearch() {

    $.get("searchForm.html", function (html) {
        $("#extra-search").append(html);

        var slider = $("#slider");
        slider.on("slide", function (value) {
            $("#priceFrom").val(value.value[0]);
            $("#priceTo").val(value.value[1]);
        });
        slider.slider({});

        $(".datepicker").datetimepicker();

        $("#extra-search-form").submit(function () {
            event.preventDefault();
        });
    });

    $.get("searchTemplate.html", function (html) {
        $.getJSON("assets/data/search-results.json", function (results) {
            var searchTemplate = Handlebars.compile(html);
            $("#templates").append(searchTemplate(results.items));
            $(".current-time").find("span").text(moment().calendar());
        }).fail(function (jqXHR, textStatus) {
            console.log("Error code: " + jqXHR.status);
        });
    });
}

defaults();
