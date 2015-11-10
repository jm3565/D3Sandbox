var data = [4, 5, 12, 6, 5, 9, 2, 4];

var h1 = d3.select("body")
            .append("h1")
            .text("Hello World!");

d3.select("body").append("div").attr("class", "chart")
    .selectAll("div")
        .data(data).enter().append("div")
            .style("width", function(d){return d * 10 + "px";})
                .text(function(d){return d;});

