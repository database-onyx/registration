let isMirrored = true;

function initializeCamera() {
    Webcam.set({
        width: 280,
        height: 280,
        dest_width: 800,
        dest_height: 800,
        image_format: 'jpeg',
        jpeg_quality: 90,
    });
    Webcam.attach('#camera');
}

function capturePhoto() {
    document.querySelector('.cus').style.display = 'none';
    document.querySelector('#takePhotoBtn').style.display = 'none';
    document.querySelector('#retakeBtn').style.display = 'inline-block';
    document.querySelector('#doneBtn').style.display = 'inline-block';

    // Capture the photo using WebcamJS
    Webcam.snap(function(data_uri) {
        document.querySelector('#capturedImage').src = data_uri;
        document.querySelector('#capturedImage').style.display = 'inline'; // Make the captured image visible
        if (isMirrored) {
            document.querySelector('#capturedImage').style.transform = 'scaleX(-1)';
        } else {
            document.querySelector('#capturedImage').style.transform = 'scaleX(1)';
        }
    });
}

function retakePhoto() {
    document.querySelector('#capturedImage').style.display = 'none';
    document.querySelector('#capturedImage').src = ''; // Clear the captured image
    document.querySelector('#takePhotoBtn').style.display = 'inline-block';
    document.querySelector('#retakeBtn').style.display = 'none';
    document.querySelector('#doneBtn').style.display = 'none';

    // Reset WebcamJS and reattach the camera
    Webcam.reset();
    initializeCamera();
}

function closePopup() {
    document.querySelector('.popup').style.display = 'none';
    // Stop WebcamJS and reset the camera
    Webcam.reset();
}

function savePhoto() {
    const imageDataURI = document.querySelector('#capturedImage').src;
    // Set the captured image data to the hidden input field
    document.querySelector('#capturedImageInput').value = imageDataURI;
    document.querySelector('#show').innerText = 'Selfie.jpg';
    // Reset and hide the camera popup
    closePopup();
}

document.querySelector('.submit-button').addEventListener('click', function() {
    // Submit the form only when the actual "Submit" button is clicked
    document.getElementById('reg-page').submit();
});

document.querySelector('#show').addEventListener('click', function() {
    document.querySelector('.popup').style.display = 'block';
    initializeCamera();
});