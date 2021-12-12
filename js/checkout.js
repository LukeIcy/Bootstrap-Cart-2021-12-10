// 商品項目，整包單一商品
let orderItem = document.querySelectorAll('.product-in-cart')
// 單項商品數量的按鈕(+)跟按鈕(-)
let addBtn = document.querySelectorAll('.add-btn');
let minusBtn = document.querySelectorAll('.minus-btn');
// input輸入框，單項商品統計數量，會隨著+跟-按鈕變化
let itemNumInput = document.querySelectorAll('.order-input');
// 單項商品定價，sr-only那個，是定值
let itemPrice = document.querySelectorAll('.product-price')
// 單項商品的統計價格，會隨著+跟-按鈕變化
let itemCost = document.querySelectorAll('.product-cost span');

// 商品總數量
let comNum = document.querySelector(".commodity-num");
// 商品總價格
let comCost = document.querySelector(".commodity-cost");
// 運費
let freCost = document.querySelector(".freight-cost");
// 此份訂單總費用 = 商品總價格 + 運費
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

// 每次點擊增加按鈕，對應的單項商品數量+1
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

// 每次點擊增加按鈕，對應的單項商品數量+1
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

// 封裝函式01
// 計算單項商品價格的函式
// 發現程式碼重複後，就進行封裝，DRY程式原則
// function calcOrderItemCost(index) {
//     itemCost[index].innerHTML = itemNumInput[index].value * 
//     itemPrice[index].textContent;
// }

// 封裝函式02
// 按鈕功能(+)跟(-)的封裝，下面是增減單項商品數量的按鈕函式
// function itemButton(index,num) {
//     itemNumInput[index].value = Number(itemNumInput[index].value) + num;
// }

// 封裝函式03 = 封裝函式02 + 封裝函式01
// 上面"封裝函式02"的第二次調整，將執行後的計算功能也加入(包入"封裝函式01")
function itemButton(index, num) {
    itemNumInput[index].value = Number(itemNumInput[index].value) + num;
    calcOrderItemCost(index)
}

// 封裝函式04
// 計算所有商品加總數量、加總金額
function calcAllComNum() {
    // 設變數等於"商品總數量"
    let allComNum = 0;
    // 設變數等於"商品總金額"
    let allComCost = 0;
    // 設變數等於"運費"，原始運費150元
    let OrifreCost = 150;
    // .length抓的是單項商品數量的陣列集合
    for (let i = 0; i < itemNumInput.length; i++) {
        allComNum = allComNum + parseInt(itemNumInput[i].value); 
        // allComCost = allComCost + parseInt(itemCost[i].value);
        // 上面是錯誤的，要用textContent
        allComCost = allComCost + parseInt(itemCost[i].textContent);
    }

    // 價格總計300元免運費
    if (allComCost >= 300) {
        OrifreCost = 0;
    }
    // 商品數量總計的.innerHTML是單項商品數量的加總
    comNum.innerHTML = allComNum + "個";
    // 商品金額總計的.innerHTML是單項商品金額的加總
    comCost.innerHTML = allComCost + "元";
    // 運費是獨立項目，只有針對這個函式中的免運條件變動
    freCost.innerHTML = OrifreCost + "元";
    // 訂單總費用是獨自項目，直接在這個函式中跟商品金額總計與運費連動
    totalCost.innerHTML = allComCost + OrifreCost + "元";

}

// 封裝函式05 = 封裝函式01 + 封裝函式04
// 上面"封裝函式01"的第二次調整，將計算商品加總數量功能也加入(包入"封裝函式04")
function calcOrderItemCost(index) {
    itemCost[index].innerHTML = itemNumInput[index].value * 
    itemPrice[index].textContent;
    calcAllComNum(index);
}