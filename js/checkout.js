// + 按鈕 -按鈕
let addBtn = document.querySelectorAll('.add-btn');
let minusBtn = document.querySelectorAll('.minus-btn');
let itemNumInout = document.querySelectorAll('.order-input');

addBtn.forEach(function (btn,index) {
    btn.addEventListener('click', function () {
        itemNumInout[index].value = Number(itemNumInout[index].value) + 1;
    }); 
});

minusBtn.forEach(function (btn,index) {
    btn.addEventListener('click', function () {
        if (itemNumInout[index].value == 1) {
            let yes = confirm('是否確定要從購物車移除此商品？')

            if (yes) {
                orderItem[index].remove();
            }else {
                return;
            }
        }
        itemNumInout[index].value = Number(itemNumInout[index].value) + 1;
    });
});
