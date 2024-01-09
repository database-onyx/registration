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

function captureAndMirror() {
    Webcam.snap(function(data_uri) {
        // Display the captured image on the canvas
        const image = new Image();
        image.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0);
            document.querySelector('#capturedImage').src = canvas.toDataURL('image/jpeg');
            document.querySelector('#capturedImage').style.display = 'inline'; // Make the captured image visible
            if (isMirrored) {
                document.querySelector('#capturedImage').style.transform = 'scaleX(-1)';
            } else {
                document.querySelector('#capturedImage').style.transform = 'scaleX(1)';
            }
        };
        image.src = data_uri;
    });
}



function capturePhoto() {
    document.querySelector('#takePhotoBtn').style.display = 'none';
    document.querySelector('#retakeBtn').style.display = 'inline-block';
    document.querySelector('#doneBtn').style.display = 'inline-block';
    // Capture and mirror the photo
    captureAndMirror();
}

function retakePhoto() {
    document.querySelector('#capturedImage').style.display = 'none ';
    document.querySelector('#capturedImage').src = ''; // Clear the captured image
    document.querySelector('#takePhotoBtn').style.display = 'inline-block';
    document.querySelector('#retakeBtn').style.display = 'none';
    document.querySelector('#doneBtn').style.display = 'none';
    Webcam.attach('#camera'); // Reattach the webcam for retaking
}

// Modify the closePopup function
function closePopup() {
    document.querySelector('.popup').style.display = 'none';
    Webcam.reset();
    document.querySelector('#capturedImage').src = ''; // Clear the captured image
    document.querySelector('#capturedImage').style.visibility = 'hidden'; // Hide the captured image
    document.querySelector('#takePhotoBtn').style.display = 'inline-block';
    document.querySelector('#retakeBtn').style.display = 'none';
    document.querySelector('#doneBtn').style.display = 'none';
}

// Update the event listener to use the new close button ID
document.querySelector('#closePopupBtn').addEventListener('click', closePopup);

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

function closePopup() {
    document.querySelector('.popup').style.display = 'none';
    Webcam.reset();
}

document.querySelector('#show').addEventListener('click', function() {
    document.querySelector('.popup').style.display = 'block';
    initializeCamera();
});