var elements = document.querySelectorAll(".uibox-accord-header");
for (var i = 0; i < elements.length; i++) {
    if(elements[i].parentNode.classList.contains('active') === true){
        var children = elements[i].parentNode.childNodes;
        for (var i = 0; i < children.length; i++) {
            if(children[i].className == 'uibox-accord-body'){
                var height = children[i].scrollHeight + 'px';
                children[i].setAttribute('style', 'height: auto;');
            }
        }

    }
}
for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', function(){
        if(this.parentNode.classList.contains('active') === false){
            this.parentNode.classList.add('active');
            var children = this.parentNode.childNodes;
            for (var i = 0; i < children.length; i++) {
                if(children[i].className == 'uibox-accord-body'){
                    var height = children[i].scrollHeight + 'px';
                    children[i].setAttribute('style', 'height: ' + height + ';');
                }
            }
        } else {
            this.parentNode.classList.remove('active');
            var children = this.parentNode.childNodes;
            for (var i = 0; i < children.length; i++) {
                if(children[i].className == 'uibox-accord-body'){
                    var height = children[i].scrollHeight + 'px';
                    children[i].setAttribute('style', 'heigth: 0;');
                }
            }
        }
    });
}
