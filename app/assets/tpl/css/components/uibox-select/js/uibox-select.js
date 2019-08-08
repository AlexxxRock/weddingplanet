document.addEventListener('DOMContentLoaded', function() {
    var elements = document.querySelectorAll(".uibox-select-floating");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('change', function(){
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

    var customSelect;
    var customSelectOverlay;
    var customSelectOption;
    document.addEventListener('click', function(event){
        var target = event.target;
        if(target.classList.contains('uibox-custom-select-selected')){
            selectToggle(target);
        }
        if(target.classList.contains('uibox-select-overlay')){
            selectOverlayToggle(target);
        }
        if(target.classList.contains('uibox-custom-option')){
            selectOptionToggle(target);
        }
    });
    
    function selectToggle(customSelect){
        var parent = customSelect.closest('.uibox-inputs-wrap');
        if(parent.classList.contains('show') === false){
            parent.classList.add('show');
            parent.classList.add('active');
        }
    }

    function selectOverlayToggle(customSelectOverlay){
        var parent = customSelectOverlay.closest('.uibox-inputs-wrap');
        parent.classList.remove('show');
        var selectVal = parent.querySelector('.uibox-custom-select-selected');
        if(selectVal.innerHTML === ''){
            parent.classList.remove('active');
        }
    }

    function selectOptionToggle(customSelectOption){
        //var child = customSelectOption.childNode;
        var childVal = customSelectOption.innerHTML;
        var parent = customSelectOption.closest('.uibox-inputs-wrap');
        parent.querySelector('.uibox-custom-select-selected').innerHTML = childVal;
        var selectVal = parent.querySelector('.uibox-custom-select-selected').innerHTML;
        if(selectVal === ''){
            parent.classList.remove('active');
        }
        parent.classList.remove('show');
    }
    // var customSelectOverlay = document.querySelectorAll(".uibox-select-overlay");
    // for (var i = 0; i < customSelectOverlay.length; i++) {
    //     customSelectOverlay[i].addEventListener('click', function(){
    //         var parent = this.closest('.uibox-inputs-wrap');
    //         parent.classList.remove('show');
    //         var selectVal = parent.querySelector('.uibox-custom-select-selected');
    //         if(selectVal.innerHTML === ''){
    //             parent.classList.remove('active');
    //         }
    //     });
    // }

    // var customSelectOption = document.querySelectorAll(".uibox-custom-option");
    // for (var i = 0; i < customSelectOption.length; i++) {
    //     customSelectOption[i].addEventListener('click', function(){
    //         var child = this; //this.querySelector('.uibox-option-text');
    //         var childVal = child.innerHTML;
    //         var parent = this.closest('.uibox-inputs-wrap');
    //         parent.querySelector('.uibox-custom-select-selected').innerHTML = childVal;
    //         var selectVal = parent.querySelector('.uibox-custom-select-selected').innerHTML;
    //         if(selectVal === ''){
    //             parent.classList.remove('active');
    //         }
    //         parent.classList.remove('show');
    //     });
    // }
});

