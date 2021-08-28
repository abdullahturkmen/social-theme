
$('.mobile-search-open').click(function(){
    $('.search-box input[type="text"]').trigger("focus");
    $("ul.liveresult").show();
})

const items = document.querySelectorAll(".list-item");
//const shadow = document.querySelector('.shadow');
//shadow.style.left = 4 + 0 + '%';
items.forEach((item,index) => {
    item.addEventListener("mouseover", () => {
        //shadow.style.left = (index * 25) + 4 + '%';
    });
});


$("#darklight").find(":button").click(function (e) {
    $.post(ajax_url + '/events',{'type': 'darklight'},function (sonuc) {

    });
    e.preventDefault();
});

function video(video_id)
{
    document.getElementById("video-id").innerHTML = video_id;
    var myPlayer = videojs('autoplay');
    myPlayer.src({ type: "video/mp4", src: "" });
    myPlayer.play();
}


$('#video-popup').on('hide.bs.modal', () => {
    var myPlayer = videojs('autoplay');
    myPlayer.src({ type: "video/mp4", src: "" });
    myPlayer.pause();
});


$(document).ready(function(){
    $('.search-box input[type="text"]').on("keyup click", function(){
        /* Input Box'da değişiklik olursa aşağıdaki durumu çalıştırıyoruz. */
        var inputVal = $(this).val();
        var resultDropdown = $("ul.liveresult");
        if(inputVal.length){
            $.post(ajax_url + '/search', {'type':'search',term: inputVal}).done(function(data){
                /* Gelen sonucu ekrana yazdırıyoruz. */
                resultDropdown.html(data);
                console.log(data);
            });
        }else{
            resultDropdown.empty();
        }
    });
});


$(document).mouseup(function(e)
{
    var liveresult = $(".header_search_form");

    // if the target of the click isn't the container nor a descendant of the container
    if (!liveresult.is(e.target) && liveresult.has(e.target).length === 0)
    {
        $(".liveresult").hide();
    }
    else
    {
        $(".liveresult").show();
    }
});


function sweetalert (title,text,icon,btnText){
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: btnText
    });
}

$(".save-btn").click(function () {
    var element = $(this);
    var id = element.parents().get(5).id;
    $.post(ajax_url + '/save',{'type':'save','id':id},function (sonuc) {
        if(sonuc === "ok"){
            element.toggleClass("active");
        }
        else{
            toastr.error('Videoyu kaydedebilmek için giriş yapmalısın!');
        }
    });
});


$(".like-btn").click(function () {
    var element = $(this);
    var id = element.parents().get(5).id;
    $.post(ajax_url + '/like',{'type':'like','id':id},function (sonuc) {
        if(sonuc === "ok"){
            element.toggleClass("active");
            element.parents().get(5).children[2].children[2].firstElementChild.classList.toggle("active");
            var likeCount = element.parents().get(5).children[2].children[2].firstElementChild.textContent;
            if(element.parents().get(5).children[2].children[2].firstElementChild.className == "active"){
                element.parents().get(5).children[2].children[2].firstElementChild.lastChild.textContent = parseInt(likeCount)+1;
            }
            else{
                element.parents().get(5).children[2].children[2].firstElementChild.lastChild.textContent = parseInt(likeCount)-1;
            }
        }
        else{
            toastr.error('Videoyu beğenebilmek için giriş yapmalısın!');
        }
    });
});



$(".video-like-btn").click(function () {
    var element = $(this);
    var id = element.get(0).id;
    $.post(ajax_url + '/like',{'type':'like','id':id},function (sonuc) {
        if (sonuc === "ok") {
            var likeCount = element.get(0).textContent;
            element.get(0).classList.toggle("active");
            if(element.get(0).classList[1] == "active"){
                element.get(0).lastChild.textContent = parseInt(likeCount)+1;
            }
            else{
                element.get(0).lastChild.textContent = parseInt(likeCount)-1;
            }
        } else {
            toastr.error('Videoyu beğenebilmek için giriş yapmalısın!');
        }
    });

});

$(".add-comment").click(function () {
    var element = $(this);
    var id = element.get(0).id;
    var comment = element.get(0).nextElementSibling.value;
    if(comment.length > 0){
        $.post(ajax_url + '/comment',{'type':'comment','id':id,'comment':comment},function (sonuc) {
            if(sonuc == "ok"){
                toastr.success('Yorumunuz eklendi. İncelemeden sonra görünür olacaktır.');
                element.get(0).nextElementSibling.value = "";
            }
            else{
                toastr.error('Videoya yorum yapabilmek için giriş yapmalısın!');
            }
        });
    }
    else{
        toastr.error('Boş yorum gönderilemez!');
    }
});


var lastScrollTop = 0;
$(".scroll-content").scroll(function(event){
   var st = $(this).scrollTop();
   if (st > lastScrollTop){
        $('.mobile-bar').addClass('scroll-hide');
   } else {
        $('.mobile-bar').removeClass('scroll-hide');
   }
   lastScrollTop = st;
});

var lastScrollTop = 0;
$(window).scroll(function(event){
   var st = $(this).scrollTop();
   if (st > lastScrollTop){
        $('.mobile-bar').addClass('scroll-hide');
   } else {
        $('.mobile-bar').removeClass('scroll-hide');
   }
   lastScrollTop = st;
});
 




// $(document).mouseup(function(e)
// {
//     var container = $("#swipe-sidebar");
//
//     // if the target of the click isn't the container nor a descendant of the container
//     if (!container.is(e.target) && container.has(e.target).length === 0)
//     {
//         container.removeClass( "active" )
//     }
// });

$(document).ready(function(){
    $('#video-popup').on('hide.bs.modal', () => {
    var myPlayer = videojs('autoplay');
    myPlayer.pause();
});
})



function swipeSidebarSearch() {
    var input, filter, ul, li, span, i, txtValue;
    input = document.getElementById('swipe-sidebar-search-box');
    filter = input.value.toUpperCase();
    ul = document.getElementById('swipe-sidebar-list');
    li = ul.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
        span = li[i].getElementsByTagName("span")[0];
        txtValue = span.textContent || span.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}



$(document).ready(function(){
    //$('[data-toggle="tooltip"]').tooltip();
});


function  notificationReset() {
    $('.notification-dot').hide();
    $.post(ajax_url + '/events',{'type':'notification-reset'},function (sonuc) {});
}
