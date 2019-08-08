document.addEventListener('DOMContentLoaded', function() {
    var elem = document.querySelectorAll(".expansion-panel-header");
    for (var i = 0; i < elem.length; i++) {
        elem[i].addEventListener('click', function(){
            var parent = this.closest('.uibox-expansion-panel');
            var container = this.closest('.uibox-expansion-panel-layout');
            var items = container.querySelectorAll('.uibox-expansion-panel');
            var body = parent.querySelector('.expansion-panel-body');
            
            if(parent.classList.contains('active') === false){
                for (var i = 0; i < items.length; i++) {
                    items[i].classList.remove('active');
                    items[i].querySelector('.expansion-panel-body').removeAttribute('style');
                }

                parent.classList.add('active');
                var height = body.scrollHeight + 'px';
                body.setAttribute('style', 'height: ' + height + ';');
            } else {
                parent.classList.remove('active');
                body.removeAttribute('style');
            }
        });
    }
});