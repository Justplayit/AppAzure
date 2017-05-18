
$(document).ready(function() {
    var file = undefined;

    $('#upload-button').prop('disabled', true);
    generateFileArea(file);
    // uploadButton(file);
});


function generateFileArea(file) {
    var fileDialog = $('#file-upload');


    fileDialog.on('change', function (event) {
        console.log('File dialog changed.');

        var fileWrapperHTMLElement = $('#file-names-wrapper');
        fileWrapperHTMLElement.css('visibility', 'visible');

        var readOnlyFile = fileDialog[0].files[0];

        if(readOnlyFile === null || readOnlyFile === undefined){
            console.log('Read only file is null.');
            return 0;
        }

        if(!createFileButton(readOnlyFile)){
            console.log('Can\'t create file button');
            return event.stopImmediatePropagation();
        }

        // file = readOnlyFile;

        $('#upload-button').prop('disabled', false);

        uploadButton(readOnlyFile);
    });

}

function createFileButton(file){

    var fileList = $('#file-buttons');
    fileList.empty();

    var originalName = file.name;

    if(originalName.length < 9){
        fileList.append('<li><div id="file" class="btn file-name" title="' + originalName +'">' + originalName + '</div>' +
            '</li>');
    }
    else{
        var alteredName = originalName.substr(0, 8);
        fileList.append('<li><div id="file" class="btn file-name" title="'+ originalName +'">' + alteredName + '...' + '</div>' +
            '</li>');
    }

    var fileId = $('#file');

    fileId.on('click', function () {
        $(this).parent().remove();

        file = undefined;

        $('#upload-button').prop('disabled', true);
    });

    return 1;
}

function uploadButton(file){
    var uploadButton = $('#upload-button');
    uploadButton.unbind('click');

    uploadButton.on('click', function (event) {
        console.log('Clicked upload button.');

        if (file === null || file === undefined){
            console.log('The file is null.');
            return event.stopImmediatePropagation();
        }

        var formData = new FormData();
        formData.append('file', file);

        console.log(formData.get('file'));

        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open('POST', 'https://servercloud-166912.appspot.com/', true);
        xmlHttpRequest.send(formData);


        $('#file').addClass('on-upload');


    });

}

function onProgress(data){
    var percentage = (data.loaded / data.total) *100;
    console.log(percentage);
}