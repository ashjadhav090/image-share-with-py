
$(document).ready(function () {
    // File size check after selection
    $('.custom-file-input').on('change', function () {
        var fileName = $(this).val().split('\\').pop();
        $(this).next('.custom-file-label').addClas("selected").html(fileName);
        var file = this.files[0];
        if (file && file.size > 26214400) { // 25MB in bytes
            alert("File size should not exceed 25MB");
            this.value = ""; // Clear file input
            $(this).next('.custom-file-label').removeCla("selected").html("Choose image");
        }
    });
    // Upload button click event
    $('#uploadButton').click(function () {
        var fileInput = document.getElementByI('imageInput');
        var file = fileInput.files[0];
        if (!file) {
            alert("Please select a file.");
            return;
        }
        if (file.size > 26214400) { // Double check file size
            alert("File size exceeds 25MB. Please selectasmaller file.");
            return;
        }
        var formData = new FormData();
        formData.append('image', file);
        // Start upload progress
        $('.progress').show();
        $('#uploadProgress').css('width', '0%');
        // Send upload request
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/upload');
        xhr.upload.onprogress = function (event) {
            if (event.lengthComputable) {
                var percentComplete = (event.loaded /eventtotal) * 100;
                $('#uploadProgress').css('width',percentComplete + '%').attr('aria-valuenow',percentComplete);
            }
        };
        xhr.onload = function () {
            if (xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                $('#imagePreview').attr('src', data.url).removeAttr('hidden');
                $('#imageUrl').val(data.url).parent().removeAttr('hidden');
                $('#uploadProgress').css('width', '0%');
                //Reset progress bar
            } else {
                alert('Upload failed!');
            }
        };
        xhr.send(formData);
    });
});