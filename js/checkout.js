// 商品項目，整包單一商品
let orderItem = document.querySelectorAll('.product-in-cart')
// 單項商品數量的按鈕(+)跟按鈕(-)
let addBtn = document.querySelectorAll('.add-btn');
let minusBtn = document.querySelectorAll('.minus-btn');
// input輸入框，單項商品統計數量，會隨著+跟-按鈕變化
let itemNumInput = document.querySelectorAll('.order-input');
// 單項商品價格，sr-only那個，是定值
let itemPrice = document.querySelectorAll('.product-price')
// 單項商品的統計價格，會隨著+跟-按鈕變化
let itemCost = document.querySelectorAll('.product-cost span');

// 商品總數量
let comNum = document.querySelector(".commodity-num");
// 商品總價格
let comCost = document.querySelector(".commodity-cost");
// 運費
let freCost = document.querySelector(".freight-cost");
// 總費用 = 商品總價格 + 運費
let totalCost = document.querySelector(".total-cost");



// console.log(addBtn, minusBtn, itemNumInput);

// 為了讓一開始進頁面時，單向商品的統計價格正確，必須先在前面進行初始化，將所有商品價格計算一次
window.onload = function () {
    for (let i = 0; i < orderItem.length; i++) {
        // itemCost[i].innerHTML = itemNumInput[i].value * itemPrice[i].textContent;
        // 上面這條函式被封裝，變成下面那條
        calcOrderItemCost(i);

    }
}

addBtn.forEach(function (btn, index) {
    btn.addEventListener('click', function () {
        // itemNumInput[index].value = Number(itemNumInput[index].value) + 1;
        // 上面這條函式被封裝，變成下面那條
        itemButton(index, 1)
        // 單項商品價格統計 = 單項商品品數量統計 * 單項商品價格；兩者相乘會等於number，不用Number變數字
        // itemCost[index].innerHTML = itemNumInput[index].value * itemPrice[index].textContent;
        // 上面這條函式被封裝，變成下面那條
        // calcOrderItemCost(index);
        // 最終上面這條函式完整被包入itemButton(index,1)
    });
});

minusBtn.forEach(function (btn, index) {
    btn.addEventListener('click', function () {
        // 以下是防呆之一
        if (itemNumInput[index].value <= 1) {
            let yes = confirm('是否確定要從購物車移除此商品？')

            if (yes) {
                orderItem[index].remove();
            } else {
                // 用return會結束整個函式，js中return很強大
                return;
            }
        }
        // itemNumInput[index].value = Number(itemNumInput[index].value) - 1;
        // 上面這條函式被封裝，變成下面那條
        itemButton(index, -1)
        // itemCost[index].innerHTML = itemNumInput[index].value * itemPrice[index].textContent;
        // 上面這條函式被封裝，變成下面那條
        // calcOrderItemCost(index);
        // 最終上面這條函式完整被包入itemButton(index,-1)
    });
});

// 針對itemNumInput做forEach，執行每一次function
// change事件，表示他的值被改動後
itemNumInput.forEach(function (input, index) {
    input.addEventListener("change", function () {
        // 以下是防呆之二，如果對方透過input把數字改成0
        if (itemNumInput[index].value == 0) {
            let yes = confirm('是否確定要從購物車移除此商品？')

            if (yes) {
                orderItem[index].remove();
            } else {
                // 要把變成0的數值加回去1
                itemButton(index, 1)
            }
        }
        // alert("查看觸發條件")
        // 運用已經封裝好的函式如下，重新計算值
        calcOrderItemCost(index)
    })
});

// 封裝函式1
// 發現程式碼重複後，就進行封裝，DRY程式原則
// 下面是計算單項商品價格的函式
function calcOrderItemCost(index) {
    itemCost[index].innerHTML = itemNumInput[index].value * itemPrice[index].textContent;
}
// 封裝函式2
// 按鈕功能(+)跟(-)的封裝，下面是增減單項商品數量的按鈕函式
// function itemButton(index,num) {
//     itemNumInput[index].value = Number(itemNumInput[index].value) + num;
// }
// 上面那條封裝函式，第二次調整，將執行後的計算功能也加入(包入第一條封裝的函式)
function itemButton(index, num) {
    itemNumInput[index].value = Number(itemNumInput[index].value) + num;
    calcOrderItemCost(index)
}