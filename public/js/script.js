
$(document).ready(function() {
    var modal = $('#upload-area');
    // console.log(modal.height());
    modal.css('margin-top', (window.innerHeight/2) - $('#upload').height());


    var $form = $('#form');

    var ajaxData = new FormData($form.get(0));
    console.log('here');

    $form.on('submit', function (event) {
        $.ajax({
            url: $form.attr('action'),
            type: $form.attr('method'),
            data: ajaxData,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            complete: function (event) {
                console.log('Finished...');
                },
            success: function (data) {
                console.log('Success...');
                },
            error: function () {
                console.log('Error...')
            }
            });
    });

});

