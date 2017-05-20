$(document).ready(function () {


    var modal = $('#modal');
    console.log(modal.height());
    modal.css('margin-top', (window.innerHeight/2) - $('#upload-rect').height());

});