
$(document).ready(function() {
    var modal = $('#upload-area');
    modal.css('margin-top', (window.innerHeight/2) - $('#upload').height());

    $('#file-dialog').on('change', function () {
       var files = $(this).get(0).files;

       console.log(files);

       if (files.length > 0){
           var formData = new FormData();
           for (var index = 0; index < files.length; index += 1){
               var file = files[index];

               formData.append('files', file, file.name);
           }

           // console.log(formData.getAll('files'));

           $.ajax({
               url: '/upload',
               type: 'POST',
               data: formData,
               processData: false,
               contentType: false,
               success: function (data) {
                   console.log('upload successful!');
               },
               xhr: function() {
                   var xhr = new XMLHttpRequest();
                   xhr.upload.addEventListener('progress', function(event){
                       var percentComplete = event.loaded / event.total;
                       percentComplete = parseInt(percentComplete * 100);

                       // update the Bootstrap progress bar with the new percentage
                       // $('.progress-bar').text(percentComplete + '%');
                       // $('.progress-bar').width(percentComplete + '%');

                       // once the upload reaches 100%, set the progress bar text to done
                       if (percentComplete === 100) {
                           // $('.progress-bar').html('Done');
                           console.log('Done');
                       }
                   }, false);

                   return xhr;
               }

           });
       }
    });




});

