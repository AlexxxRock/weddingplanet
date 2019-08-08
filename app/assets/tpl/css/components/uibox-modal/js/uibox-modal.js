function getModal(btnSelector, modalSelector){
    document.addEventListener('DOMContentLoaded', function() {
        var btn = document.querySelectorAll(btnSelector);
        for (var i = 0; i < btn.length; i++) {
            btn[i].addEventListener('click', function(e){
                e.preventDefault();
                var modal = document.querySelectorAll(modalSelector);
                for (var i = 0; i < modal.length; i++) {
                    modal[i].classList.add('active');
                    document.body.classList.add('body-overflow');
                }
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var btnClose = document.querySelectorAll('.uibox-modal-close, .uibox-modal-overlay');
    for (var i = 0; i < btnClose.length; i++) {
        btnClose[i].addEventListener('click', function(){
            var modal = this.closest('.uibox-modal');
            modal.classList.remove('active');
            document.body.classList.remove('body-overflow');
        });
    }
});

$('.get-delivery').on('click', function(e){
    e.preventDefault();
    var text = $('.delivery-modal .uibox-modal-content').text();
    if(!text){
        $('.delivery-modal .uibox-modal-content').load("oplata-i-dostavka #page-content", function(){
            $('.delivery-modal').addClass('active');
            document.body.classList.add('body-overflow');
        });
    } else {
        $('.delivery-modal').addClass('active');
        document.body.classList.add('body-overflow');
    }
});
getModal('.consult-helper', '.consult-modal');
getModal('.header-order-action', '.minicart-modal');