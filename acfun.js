import './index.html'
import './src/pic/banner.jpg'
import './acfun.scss'
import $ from 'jquery'
window.$ = $


let carouselTimer = null
let imgs = document.querySelectorAll('img')
loadImg()
window.addEventListener('scroll', () => {
    clearTimeout(carouselTimer)
    carouselTimer = setTimeout(() => {
        loadImg()
    }, 100)
})

function loadImg() {
    for (var i = 0; i < imgs.length; i++) {
        let img = imgs[i]
        if (isShow(img)) {
            let src = img.dataset.src
            img.src = src
        }
    }
}

function isShow(el) {
    if (window.innerHeight + window.scrollY > el.offsetTop) {
        return true
    }
}

// search part
let dataObj = [] //存放搜索历史
let oldDataString = window.localStorage.getItem('data')
let data = JSON.parse(oldDataString)
for (var key in data) {
    dataObj.push(data[key])
}
renderData()

$('#search-input').on('keypress', e => {
    if (e.keyCode === 13) {
        startSearch()
        addHistory()
    }
})

$('.icon-search').on('click', () => {
    startSearch()
    addHistory()
})

$('#clear-history').on('click', () => {
    window.localStorage.clear()
    dataObj = []
    $('#history-part').hide()
    $('#history-content').empty()
})

$('#search-input').on('focus', () => {
    $('#hot-search').show()
    if (data !== null && data.length !== 0)
        $('#history-part').show()
})

$('#search-input').on('blur', () => {
    $('#hot-search').fadeOut(300)
})

function startSearch() {
    let value = $('#search-input').val()
    if (value === '') {
        value = $('#search-input').attr('placeholder')
    }
    window.open('http://www.acfun.cn/search/?#query=' + value)
}

function addHistory() {
    let value = $('#search-input').val()
    if (value === '') return;
    dataObj.push(value)
    $('#history-content').prepend(`<li> ${value} </li>`)
    $('#history-part').show()
    $('#search-input').val('')
}

function renderData() {
    if (data != null && data.length !== 0) {
        for (var i = 0; i < data.length; i++) {
            $('#history-content').prepend(`<li>${data[i]}</li>`)
        }
    }
}


window.onbeforeunload = () => {
    let dataString = JSON.stringify(dataObj)
    window.localStorage.setItem('data', dataString)
    $('#history-content').empty()
}

$(window).on('scroll', () => {
    if ($(window).scrollTop() > 179) {
        $('nav').addClass('nav-fixed')
    } else {
        $('nav').removeClass('nav-fixed')
    }
    if ($(window).scrollTop() > 300) {
        $('#go-top').fadeIn(500)
    } else {
        $('#go-top').fadeOut(500)
    }
})

$('.header-banner').on('mousemove', e => {
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
navList.on('mouseenter', e => {
    let moreGroupBg = $('.moreGroupBg:first')
    moreGroupBg.show()
})
navList.on('mouseleave', e => {
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
    timer = setInterval(() => {
        playNext(1)
    }, 3000)
}


var carouselImgs = document.querySelectorAll('.carousel img')
var promises = []

for (var i = 0; i < carouselImgs.length; i++) {
    promises.push(new Promise((resolve, reject) => {
        carouselImgs[i].onload = () => {
            resolve()
        }
    }))
}

Promise.all(promises).then(() => {
    autoPlay()
})


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

$('#go-top').on('click', () => {
    var timer = null;
    var y = $(window).scrollTop()
    timer = setInterval(() => {
        if (y <= 0) clearInterval(timer)
        y -= 80
        $(window).scrollTop(y)
    }, 1)
})