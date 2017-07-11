var navList = document.querySelectorAll('nav>ul')[0]
navList.addEventListener('mouseout', function(e) {
    var moreGroupBg = document.querySelectorAll('.moreGroupBg')[0]
    moreGroupBg.style.display = 'none';
})
navList.addEventListener('mouseover', function(e) {
    var moreGroupBg = document.querySelectorAll('.moreGroupBg')[0]
    moreGroupBg.style.display = 'block';
})