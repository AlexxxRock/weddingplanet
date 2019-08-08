var elements = document.querySelectorAll(".uibox-textarea");
for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('focusout', function(){
        var val = this.value;
        var parent = this.closest('.uibox-inputs-wrap');
        if(val !== ''){
            parent.classList.add('active');
        } else {
            if(parent.classList.contains('active') === true){
                parent.classList.remove('active');
            }
        }
    });
}

var textareaCustom = document.querySelectorAll(".uibox-textarea-custom");
for (var i = 0; i < textareaCustom.length; i++) {
    textareaCustom[i].addEventListener('focusout', function(){
        var val = this.innerHTML;
        var parent = this.closest('.uibox-inputs-wrap');
        if(val !== '' && val !== '<br>'){
            parent.classList.add('active');
        } else {
            if(parent.classList.contains('active') === true){
                parent.classList.remove('active');
            }
        }
    });
}