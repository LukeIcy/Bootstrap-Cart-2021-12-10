// 第一個swiper
const swiper = new Swiper('.main-swiper', {
    // 基本設定
    // 垂直或水平輪播
    direction: 'horizontal',
    // 結束後是否要重新輪播
    loop: true,

    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// 第二個swiper
const commodityswiper = new Swiper(".commodity-swiper", {
    // 顯示數量 更下面的RWD抓不到，就會來抓下面這個
    slidesPerView: 1,
    // spaceBetween 是兩張圖的間距

    // rwd
    breakpoints: {
        // when window width is >= 561px
        561: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        // when window width is >= 993px
        993: {
            slidesPerView: 3,
            spaceBetween: 20
        }
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
