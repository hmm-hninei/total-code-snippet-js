$(() => {
    var cartObject = localStorage.getItem("cartData");
    var cartArray = JSON.parse(cartObject);
    cartArray.forEach((element) => {
        if (element["warehouse"] != $("#warehouse_search").val()) {
            localStorage.clear();
            $("#cartNoti").attr("hidden", true);
        }
    });
});

$("#warehouse_search").change(function () {
    localStorage.clear();
    $("#cartNoti").attr("hidden", true);
    filterAjax();
});
$(".search").keyup(function () {
    filterAjax();
    if ($(".search").val()) {
        $("#tbody").removeClass("d-none");
        $(".bg-blur").removeClass("d-none");
    }
    console.log($(".search").val());
});
$("#brand_search").change(function () {
    filterAjax();
});
$("#category_search").change(function () {
    filterAjax();
});

function filterAjax() {
    var warehouse_search = $("#warehouse_search").val();
    var part_no_search = $("#part_no_search").val();
    var description_search = $("#description_search").val();
    var pmodel_search = $("#pmodel_search").val();
    var brand_search = $("#brand_search").val();
    var category_search = $("#category_search").val();
    var shelf_search = $("#shelf_search").val();
    var sale_price_search = $("#sale_price_search").val();
    $.ajax({
        url:
            "/admin/products/search?warehouse=" +
            warehouse_search +
            "&part_no=" +
            part_no_search +
            "&description=" +
            description_search +
            "&pmodel=" +
            pmodel_search +
            "&brand=" +
            brand_search +
            "&category=" +
            category_search +
            "&shelf=" +
            shelf_search +
            "&sale_price=" +
            sale_price_search,
        method: "GET",
        success: (response) => {
            console.log(response);
            var htmls = "";
            if (response.length > 0) {
                response.forEach((data) => {
                    htmls += `
                    <tr data-entry-id="${data.id}">
                        <td>
                            ${data.id}
                        </td>
                        <td>
                            ${data.part_no}
                        </td>
                        <td>
                            ${data.description}
                        </td>
                        <td>
                            ${data.pmodel ?? ""}
                        </td>
                        <td>
                            ${data.brand}
                        </td>
                        <td>`;
                    data.categories.forEach((element) => {
                        htmls += `<span class="badge bg-info rounded-pill">${element.name}</span>`;
                    });
                    htmls += `</td>
                        <td>
                            ${data.shelf_no}
                        </td>
                        <td>
                            ${data.sale_price} (stock -${data.total_stock})
                        </td>
                        <td>
                            <a href="javascript:void(0)" class="add-to-cart"
                            data-id="${data.id}"
                            data-warehouse="${data.warehouse}"
                            data-part_no="${data.part_no}"
                            data-description="${data.description}"
                            data-sale_price="${data.sale_price}"
                            ><i class="fa-solid fa-cart-plus"></i></a>
                        </td>

                    </tr>
                    `;
                });
            } else {
                htmls = `<tr>
                            <td colspan="9" class="text-center">There is no data!!!</td>
                        </tr>`;
            }
            $("#tbody").html(htmls);
            addToCart();
        },
    });
}

function addToCart() {
    $(".add-to-cart").click(function () {
        var id = $(this).data("id");
        var currency = $(this).data("currency");
        var part_no = $(this).data("part_no");
        var warehouse = $(this).data("warehouse");
        var description = $(this).data("description");
        var currency_rate = $(this).data("currency_rate");
        var sale_price = $(this).data("sale_price");
        var sale_price_mmk = $(this).data("sale_price_mmk");
        var list = {
            id: id,
            warehouse: warehouse,
            part_no: part_no,
            description: description,
            currency: currency,
            currency_rate: currency_rate,
            sale_price: sale_price,
            sale_price: sale_price,
            sale_price_mmk: sale_price_mmk,
            qty: 1,
        };
        var cartObject = localStorage.getItem("cartData");
    
        if (!cartObject) {
            var cartArray = [];
        } else {
            var cartArray = JSON.parse(cartObject);
        }
        // console.log(cartArray.length);
        if (cartArray.length == 0) {
            cartArray.push(list);
        } else {
            var status = true;
            //alert(id);
            cartArray.forEach((element) => {
                if (element["id"] == id) {
                    element["qty"] += 1;
                    status = false;
                }
            });
            if (status) {
                cartArray.push(list);
            }
        }
    
        localStorage.setItem("cartData", JSON.stringify(cartArray));
        cartNoti();
    });
}
