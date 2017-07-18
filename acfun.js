import $ from 'jquery'
window.$ = $


// search part
$('#search-input').on('focus', () => {
    $('#hot-search').css('display', 'block')
})
$('#search-input').on('blur', () => {
    $('#hot-search').css('display', 'none')
})
$('#search-input').on('keypress', function(e) {
    if (e.keyCode === 13) {
        startSearch()
    }
})
$('.icon-search').on('click', function() {
    startSearch()
})

function startSearch() {
    let value = $('#search-input').val()
    if (value === '') {
        console.log(1)
        value = $('#search-input').attr('placeholder')
    }
    window.open('http://www.acfun.cn/search/?#query=' + value)
}

$(window).on('scroll', function() {
    if ($(window).scrollTop() > 179) {
        $('nav').addClass('nav-fixed')
    } else {
        $('nav').removeClass('nav-fixed')
    }
})

$('.header-banner').on('mousemove', function(e) {
    var x = e.clientX
    var y = e.clientY
    if (y > 188 || y < 60 || x > 950) {
        $('.bubble').removeClass('active')
    } else {
        $('.bubble').css({
            left: x + 20,
            top: y - 10
        })
        $('.bubble').addClass('active')
    }
})

//nav
let navList = $('nav>ul:first')
navList.on('mouseenter', function(e) {
    let moreGroupBg = $('.moreGroupBg:first')
    moreGroupBg.show()
})
navList.on('mouseleave', function(e) {
    let moreGroupBg = $('.moreGroupBg:first')
    moreGroupBg.hide()
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
var defereds = [];
var $imgs = $('.carousel>img')
$imgs.each(function() {
    var dfd = $.Deferred();

    $(this).load(dfd.resolve);
    defereds.push(dfd);
});
$.when.apply(null, defereds).done(function() {
    console.log('load compeleted');
    autoPlay()
});


//videoIntro
$('.videoList').on('mouseenter', 'li', function() {
    $(this).find('.videoTitle').hide()
    $(this).find('.videoIntro').show()
})
$('.videoList').on('mouseleave', 'li', function() {
    $(this).find('.videoTitle').show()
    $(this).find('.videoIntro').hide()
})


//video-list rank-list
$('.banna-rank .rank-type').on('click', 'li', function() {
    $(this).siblings().removeClass('active')
    $(this).addClass('active')
    let pos = $(this).index()
    $('.banna-rank .video-list').removeClass('active')
    $('.banna-rank .video-list').eq(pos).addClass('active')
})

$('.rank-type').on('click', 'li', function() {
    console.log($(this))
    $(this).siblings().removeClass('active')
    $(this).addClass('active')
    let index = $(this).index()
    $(this).parents('.rank').find('.rank-list').removeClass('active')
    $(this).parents('.rank').find('.rank-list').eq(index).addClass('active')
})

//article-list

$('.article-type').on('mouseenter', 'li', function() {
    $(this).siblings().removeClass('active')
    $(this).addClass('active')
    let index = $(this).index()
    $('.article-list>li').removeClass('active')
    $('.article-list>li').eq(index).addClass('active')
})

//fanju-type
$('.fanju-type').on('click', 'li', function() {
    $(this).siblings().removeClass('active')
    $(this).addClass('active')
    let index = $(this).index()
    $('.fanju-list').removeClass('active')
    $('.fanju-list').eq(index).addClass('active')
})