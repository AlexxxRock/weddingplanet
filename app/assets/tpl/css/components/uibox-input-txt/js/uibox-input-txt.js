var elements = document.querySelectorAll(".uibox-input-txt");
for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('focusout', function(){
        var val = this.value;
        if(val !== ''){
            this.parentNode.classList.add('active');
        } else {
            if(this.parentNode.classList.contains('active') === true){
                this.parentNode.classList.remove('active');
            }
        }
    });
}
document.addEventListener('DOMContentLoaded', function(){
    var elements = document.querySelectorAll(".uibox-input-txt");
    for (var i = 0; i < elements.length; i++) {
        var val = elements[i].value;
        var placeholder = elements[i].getAttribute('placeholder');
        if(val !== '' || placeholder !== '' && elements[i].hasAttribute('placeholder') === true){    
            elements[i].closest('.uibox-inputs-wrap').classList.add('active');
        } else {
            if(elements[i].parentNode.classList.contains('active') === true){
                elements[i].parentNode.classList.remove('active');
            }
        }
    }
});