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

    

    var $modelSpec,
        $modelPrice,
        $modelSpecHolder,
        $modelPriceHolder,
        $currencyUrl,
        $uahUsdRate;

    $modelSpecHolder = $('#model__Spec');
    $modelPriceHolder = $('#model__uah');
    $modelPriceHolderUsd = $('#model__usd');

    /* Конфигуратор опций */

    function compileSpecs() {
        $modelSpec = $('input[name = engine]:checked + label', '#autoForm').text();
        $modelSpec += ', ' + $('input[name = transmission]:checked + label', '#autoForm').text();
        $modelSpec += ', ' + $('input[name = package]:checked + label', '#autoForm').text();

        $modelSpecHolder.text($modelSpec);
    }

    /* Калькулятор стоимости */

    $modelPrice = 0;
    $modelSpec = '';

    $currencyUrl = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
    $uahUsdRate = 0;

    $.ajax({
        type: "GET",
        url: $currencyUrl,
        dataType: "json",
        success: function (response) {
            $uahUsdRate = response[0].buy;
        }
    });
    
    function calculatePrice() {
        $modelPrice = +$('input[name = engine]:checked', '#autoForm').val();
        $modelPrice = $modelPrice + +$('input[name = transmission]:checked', '#autoForm').val();
        $modelPrice = $modelPrice + +$('input[name = package]:checked', '#autoForm').val();

        $modelPriceHolder.text(`${$modelPrice} UAH`);

        var $modelPriceUSD = $modelPrice / $uahUsdRate;

        $modelPriceHolderUsd.text(`${$modelPriceUSD.toFixed(0)} USD`);
    }

    $('#autoForm input').on('change', function() {
        compileSpecs();
        calculatePrice();
    })

    
})