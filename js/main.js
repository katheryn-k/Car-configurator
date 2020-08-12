$(function() {

    /* Выбор цвета машины */

    var $colorItem = $('.main__color-box__item');
    var $carImg = $('#main__imgHolder img');
    
    $colorItem.on('click', function(){
        var $imgPath = $(this).attr('data-img-path');
        $carImg.fadeOut(300, function(){
            $carImg.attr('src', $imgPath).fadeIn(300);
        });
    });
})