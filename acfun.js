import $ from 'jquery'
window.$ = $






//nav
let navList = $('nav>ul:first')
navList.on('mouseout', function(e) {
    let moreGroupBg = $('.moreGroupBg:first')
    moreGroupBg.css('display', 'none')
})
navList.on('mouseover', function(e) {
    let moreGroupBg = $('.moreGroupBg:first')
    moreGroupBg.css('display', 'block')
})



//carousel模块
//插入头尾的复制图片
let firstLiClone = $('.carousel>li:first').clone()
let lastLiClone = $('.carousel>li:last').clone()
let LiWidth = $('.carousel>li').width() //获取单个li的宽度
let LiNumber = $('.carousel>li').length
let timer = null;
let isAnimationDone = true //状态锁，判断动画是否完成
$('.carousel').width((LiWidth + 2) * LiWidth) //由于插入了两张图片，要改变容器的宽度
$('.carousel').append(firstLiClone)
$('.carousel').prepend(lastLiClone)
$('.carousel').css('left', -LiWidth) //设置初始图片的位置
let picPos = 0 //设置当前图片的下标

function playNext(n) { //播放下一张图片
    isAnimationDone = false
    picPos += n
    setBullet()
    $('.carousel').animate({
        left: '-=' + n * LiWidth
    }, function() {
        isAnimationDone = true
        if (picPos === 5) {
            $('.carousel').css('left', -LiWidth + 'px')
            picPos = 0
        }
    })
}

function playPre(n) { //播放上一张图片
    isAnimationDone = false
    picPos = picPos - n
    $('.carousel').animate({
        left: '+=' + n * LiWidth
    }, function() {
        isAnimationDone = true
        if (picPos < 0) {
            $('.carousel').css({
                left: -LiNumber * LiWidth
            })
            picPos = 4
        }
    })
    setBullet()
}

function setBullet() {
    if (picPos == 5) {
        $('.bullet>li').removeClass('active')
            .eq(0).addClass('active')
    } else {
        $('.bullet>li').removeClass('active')
            .eq(picPos).addClass('active')
    }
    // console.log(picPos)
}

$('.bullet').on('click', 'li', function() {
    clearInterval(timer)
    let targetIndex = $(this).index()
    let dist = targetIndex - picPos
    dist > 0 ? playNext(dist) : playPre(-dist)
    autoPlay()
})

function autoPlay() { //自动播放
    clearInterval(timer)
    timer = setInterval(function() {
        playNext(1)
    }, 3000)
}
autoPlay()