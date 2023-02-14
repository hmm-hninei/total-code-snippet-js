$(() => {
    var cartObject = localStorage.getItem("cartData");
    var cartArray = JSON.parse(cartObject);
    console.table(cartArray);
    cartNoti();
});

$(".cancel-cart").click(function () {
    localStorage.clear();
    $("#cartNoti").attr("hidden", true);
});

$(".cart-div").click(function () {
    showData();
});

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

$("#showData").on("click", ".plus_btn", function () {
    var id = $(this).data("id");
    var cartObject = localStorage.getItem("cartData");
    var cartArray = JSON.parse(cartObject);

    //console.log(cartArray);
    cartArray.forEach((element) => {
        if (element["id"] == id) {
            element["qty"] += 1;
        }
    });
    localStorage.setItem("cartData", JSON.stringify(cartArray));
    showData();
    cartNoti();
});

$("#showData").on("click", ".minus_btn", function () {
    var id = $(this).data("id");
    var cartObject = localStorage.getItem("cartData");
    var cartArray = JSON.parse(cartObject);

    //console.log(cartArray);
    cartArray.forEach((element, index) => {
        if (element["id"] == id) {
            element["qty"] -= 1;
            if (element["qty"] == 0) {
                cartArray.splice(index, 1);
            }
        }
    });
    localStorage.setItem("cartData", JSON.stringify(cartArray));
    showData();
    cartNoti();
});

$("#showData").on("click", ".remove_btn", function () {
    var id = $(this).data("id");
    var cartObject = localStorage.getItem("cartData");
    var cartArray = JSON.parse(cartObject);

    //console.log(cartArray);
    cartArray.forEach((element, index) => {
        if (element["id"] == id) {
            cartArray.splice(index, 1);
        }
    });
    localStorage.setItem("cartData", JSON.stringify(cartArray));
    showData();
    cartNoti();
});

function cartNoti() {
    var cartObject = localStorage.getItem("cartData");
    var cartArray = JSON.parse(cartObject);
    var count = 0;
    cartArray.forEach((element) => {
        count += element["qty"];
    });
    if (count > 0) {
        $("#cartNoti").attr("hidden", false);
        $("#cartNoti").html(count);
    } else {
        $("#cartNoti").attr("hidden", true);
    }
}

function showData() {
    var cartObject = localStorage.getItem("cartData");
    var cartArray = JSON.parse(cartObject);
    var html = "";
    console.log("showData");
    cartArray.forEach((element) => {
        var unit_total =
            parseInt(element["sale_price"]) * parseInt(element["qty"]);
        html += `
            <tr>
                <td>${element["part_no"]}</td>
                <td>${element["description"]}</td>
                <td>${element["sale_price"]}</td>
                <td>
                <a href="javascript:void(0)" class="btn btn-outline-secondary btn-sm rounded-circle px-1 plus_btn" data-id=${element["id"]}>
                    <i class="bx bx-plus"></i>
                </a>
                <span class="mx-3">${element["qty"]}</span>
                <a href="javascript:void(0)" class="btn btn-outline-secondary btn-sm rounded-circle px-1 minus_btn" data-id=${element["id"]}>
                    <i class="bx bx-minus"></i>
                </a>
                </td>
                <td>${unit_total}</td>
                <td>
                <a href="javascript:void(0)" class="btn btn-danger btn-sm px-1 remove_btn" data-id=${element["id"]}>
                    Remove
                </a>
                </td>
            </tr>
        `;
    });
    $("#showData").html(html);
}
