document.addEventListener('DOMContentLoaded', function() {
    toggleBtn = document.body.querySelectorAll('.sidebar-nav-toggle');
    sidenav = document.querySelector('.sidenav-container');
    var workspace = document.querySelector('.main-dashboard-workspace');
    var sidenavWidth = sidenav.offsetWidth;
    for (var i = 0; i < toggleBtn.length; i++) {
        toggleBtn[i].addEventListener('click', function(){
            if(this.classList.contains('active') === false){
                this.classList.add('active');
                sidenav.classList.add('show');
                workspace.classList.add('open');
            } else {
                this.classList.remove('active');
                sidenav.classList.remove('show');
                workspace.classList.remove('open');
            }
        });
    }
});