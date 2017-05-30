
$(document).ready(function() {
   var xhr = new XMLHttpRequest();
      url="https://azureappb4.core.windows.net/azureappb4?comp=list&maxresults=3";
        xhr.open('GET', url, true);
        xhr.setRequestHeader("x-ms-version", "2015-02-21");
         xhr.setRequestHeader("x-ms-date", Date());
         xhr.setRequestHeader("Authorization", "SharedKey myaccount:M28H+AO14p6JiUDg6HeRQNPsYycCeLw4mMMSxNXSk5m5LjIt8jx11YULjXPDvGcgftjiGT089TDB3WLWhpkfJg==");
        xhr.send();

        
        xhr.onreadystatechange = processRequest;
 
        function processRequest(e) {
            if (xhr.readyState === 4) {
         
            console.log(xhr.responseText);
                console.log(xhr.responeXML);
            }
        }

    
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
            modal.css('visibility', 'hidden');
        },
        xhr: function () {
            return new XMLHttpRequest();
        }
       });
    });

});


function search(){
    var toSearch = document.getElementById("search-id").value;
console.log("apeleaza searach");
    if( toSearch === '' ){
        alert("Please fill the search box...!!!!!!");
        return false;
    }
    else
    {
        var url="  https://api.cognitive.microsoft.com/bing/v5.0/search?q=";
        url=url+toSearch+"&count=10&offset=0&mkt=en-us&safesearch=Moderate";

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.setRequestHeader("Ocp-Apim-Subscription-Key", "c9a9ed180e704db79a2419e518d5a637");
        xhr.send();

        
        xhr.onreadystatechange = processRequest;
 
        function processRequest(e) {
            if (xhr.readyState === 4) {
                var response = JSON.parse(xhr.responseText);
                var imgs=response.images.value;
                var arrayLength = imgs.length;
                document.getElementById("resp-id").innerHTML="";

                for (var i = 0; i < arrayLength; i++) {
                    document.getElementById("resp-id").innerHTML+='<img src=\"'+imgs[i].thumbnailUrl+'\">';
                //Do something
                }
               console.log(response.images.value[0].thumbnailUrl);
            }
        }
    }
}

