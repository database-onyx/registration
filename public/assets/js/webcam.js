let isMirrored = false;

function initializeCamera() {
    Webcam.set({
        width: 280,
        height: 280,
        dest_width: 800,
        dest_height: 800,
        image_format: 'jpg',
        jpeg_quality: 90,
    });
    Webcam.attach('#camera');
}

function captureAndMirror() {
    Webcam.snap(function(data_uri) {
        document.querySelector('img').src = data_uri;
        captureAndMirror();
    });
}

function toggleMirror() {
    isMirrored = !isMirrored;
}

function capturePhoto() {
    document.querySelector('#takePhotoBtn').style.display = 'none';
    document.querySelector('#retakeBtn').style.display = 'inline-block';
    document.querySelector('#doneBtn').style.display = 'inline-block';

    initializeCamera();
    captureAndMirror();
}

function retakePhoto() {
    document.querySelector('img').src = 'assets/image/facelines.png';

    document.querySelector('#takePhotoBtn').style.display = 'inline-block';
    document.querySelector('#retakeBtn').style.display = 'none';
    document.querySelector('#doneBtn').style.display = 'none';

    Webcam.reset();
}

function savePhoto() {
    // Implement the save functionality here

    document.querySelector('#takePhotoBtn').style.display = 'inline-block';
    document.querySelector('#retakeBtn').style.display = 'none';
    document.querySelector('#doneBtn').style.display = 'none';

    Webcam.reset();
}

function closePopup() {
    document.querySelector('.popup').style.display = 'none';
    Webcam.reset();
}

document.querySelector('#show').addEventListener('click', function() {
    document.querySelector('.popup').style.display = 'block';
    initializeCamera();
});