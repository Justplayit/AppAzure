
$(document).ready(function() {
    
    
    var modal = $('#upload-area');
    modal.css('margin-top', (window.innerHeight/2) - $('#upload').height());


    $('#file-dialog').on('change', function () {
       var files = $(this).get(0).files;
       if (files.length === 0){
           return 0;
       }

       var formData = new FormData();

       for (var index = 0; index < files.length; index++){
           var file = files[index];

           formData.append('files', file, file.name);
       }

       $.ajax({
          url: '/upload',
           type: 'POST',
           data: formData,
           processData: false,
           contentType: false,
           success: function (data) {
               console.log('upload successful!');
           },
           xhr: function () {
               var xhr = new XMLHttpRequest();
               // xhr.upload.addEventListener('progress', function () {
               //
               // });

               return xhr;
           }
       });
    });

});


function search(){
var toSearch = document.getElementById("search-id").value;

if( toSearch ==='' ){
alert("Please fill the search box...!!!!!!");
return false;
}
    else
    {

alert(toSearch);
}
}

