document.addEventListener('DOMContentLoaded', function() {
                            
    function getCoordX(event){
        event = event || window.event;
        coord = event.clientX;
        return coord;
    }
    function getCoordY(event){
        event = event || window.event;
        coord = event.clientY;
        return coord;
    }
    function getCoords(elem) {
        var box = elem.getBoundingClientRect();
        return {
          top: box.top + pageYOffset,
          left: box.left + pageXOffset
        };
    }        


    var coordX = document.querySelectorAll(".resize-x");
    for (var i = 0; i < coordX.length; i++) {
        coordX[i].addEventListener('mousedown', function(ev){
            var parentBlock = this.closest('.resize');
            var startWidth = parentBlock.offsetWidth;
            var startCoord = getCoordX(ev);
            var newOverlay = document.createElement('div');
            newOverlay.className = 'drag-overlay-x';
            document.body.appendChild(newOverlay);
            document.body.onmousemove = function(e){
                parentBlock.style.width = startWidth - (startCoord - getCoordX(e)) + 'px';
            }
        });
        document.body.addEventListener('mouseup', function(){
            document.querySelector('.drag-overlay-x').remove();
            document.body.onmousemove = null;
        });
    }

    var coordY = document.querySelectorAll(".resize-y");
    for (var i = 0; i < coordY.length; i++) {
        coordY[i].addEventListener('mousedown', function(ev){
            var parentBlock = this.closest('.resize');
            var startHeight = parentBlock.offsetHeight;
            var startCoord = getCoordY(ev);
            var newOverlay = document.createElement('div');
            newOverlay.className = 'drag-overlay-y';
            document.body.appendChild(newOverlay);
            document.onmousemove = function(e){
                parentBlock.style.height = startHeight - (startCoord - getCoordY(e)) + 'px';
            }
        });
        document.addEventListener('mouseup', function(){
            document.querySelector('.drag-overlay-y').remove();
            document.onmousemove = null;
        });
    }

    var coordXY = document.querySelectorAll(".resize-xy");
    for (var i = 0; i < coordXY.length; i++) {
        coordXY[i].addEventListener('mousedown', function(ev){
            var parentBlock = this.closest('.resize');
            var startHeight = parentBlock.offsetHeight;
            var startWidth = parentBlock.offsetWidth;
            var startCoordY = getCoordY(ev);
            var startCoordX = getCoordX(ev);
            var newOverlay = document.createElement('div');
            newOverlay.className = 'drag-overlay-xy';
            document.body.appendChild(newOverlay);
            document.onmousemove = function(e){
                parentBlock.style.width = startWidth - (startCoordX - getCoordX(e)) + 'px';
                parentBlock.style.height = startHeight - (startCoordY - getCoordY(e)) + 'px';
            }
        });
        document.addEventListener('mouseup', function(){
            document.querySelector('.drag-overlay-xy').remove();
            document.onmousemove = null;
        });
    }


    var dragged = document.querySelectorAll('.uibox-dragged');
    for (var i = 0; i < dragged.length; i++) {
        dragged[i].addEventListener('mousedown', function(e){
            var parentBlock = this.closest('.drag');
            // var newOverlay = document.createElement('div');
            // newOverlay.className = 'drag-overlay';
            // document.body.appendChild(newOverlay);
           // document.body.insertBefore(newOverlay, document.body.firstChild)
            var coords = getCoords(parentBlock);
            var shiftX = e.clientX - coords.left;
            var shiftY = e.clientY - coords.top;
            document.onmousemove = function(ev){
                parentBlock.style.left = getCoordX(ev) - shiftX + 'px';
                parentBlock.style.top = getCoordY(ev) - shiftY + 'px';
            }
        });
        document.addEventListener('mouseup', function(e){
            //document.querySelector('.drag-overlay').remove();
            document.onmousemove = null;
            
        });
    }


    var modalBodyBlocks = document.querySelectorAll('.uibox-modal-ui-container');
    var elementsHeight = 0;
    for (var i = 0; i < modalBodyBlocks.length; i++){
        var childBlocks = modalBodyBlocks[i].childNodes;
        for (var i = 0; i < childBlocks.length; i++){
            if(childBlocks[i].classList !== undefined){
                if(childBlocks[i].classList.contains('uibox-modal-ui-body') !== true){
                    var blockHeight = childBlocks[i].offsetHeight;
                    elementsHeight += blockHeight;
                }
            }
        }
    }
    
    var modalUIBody = document.querySelectorAll('.uibox-modal-ui-body');
    for (var i = 0; i < modalUIBody.length; i++){
        modalUIBody[i].style.height = 'calc(100% - ' + elementsHeight + 'px';
    }


    var modalUI = document.querySelectorAll('.uibox-modal-ui');
    for (var i = 0; i < modalUI.length; i++){
        var ww = document.body.clientWidth;
       
        var wh = window.innerHeight;
        var modalWidth = modalUI[i].offsetWidth;
        var modalHeight = modalUI[i].scrollHeight;
        var offsetLeft = (ww - modalWidth) / 2;
        var offsetTop = (wh - modalHeight) / 2;
        modalUI[i].style.left = offsetLeft + 'px';
        modalUI[i].style.top = offsetTop + 'px';
        modalUI[i].style.height = modalHeight + 'px';

        modalUI[i].addEventListener('mousedown', function(){
            var modalsUI = document.querySelectorAll('.uibox-modal-ui');
            for (var i = 0; i < modalsUI.length; i++){
                modalsUI[i].style.zIndex = '1000';
            }
            this.style.zIndex = '1001';
        });
    }

    // ACTIONS
    var fullscreenToggle = document.querySelectorAll('.fullscreen-btn');
    for (var i = 0; i < fullscreenToggle.length; i++){
        fullscreenToggle[i].addEventListener('click', function(){
            var parent = this.closest('.uibox-modal-ui');
            if(parent.classList.contains('uibox-modal-ui-fullscreen') === true){
                parent.classList.remove('uibox-modal-ui-fullscreen');
            } else {
                parent.classList.add('uibox-modal-ui-fullscreen');
            }
        });
    }

    var turnToggle = document.querySelectorAll('.turn-toggle-btn');
    for (var i = 0; i < turnToggle.length; i++){
        turnToggle[i].addEventListener('click', function(){
            var parent = this.closest('.uibox-modal-ui');
            if(parent.classList.contains('turn-hide') === true){
                parent.classList.remove('turn-hide');
            } else {
                parent.classList.add('turn-hide');
                var turnPanel = document.querySelector('.turn-panel');
                //turnPanel = turnPanel.classList.contains('turn-panel');
                if(!turnPanel){
                    var newTurnPanel = document.createElement('div');
                    newTurnPanel.className = 'turn-panel';
                    document.body.appendChild(newTurnPanel);
                }
            }
        });
    }
     

});