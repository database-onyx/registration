let isMirrored = true;
document.querySelector('#show').addEventListener('click', function() {
    // Check if WebRTC is supported
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Ask for camera permission on user gesture
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                // Permission granted, initialize camera
                Webcam.reset();
                initializeCamera(stream);
                document.querySelector('.popup').style.display = 'block';
            })
            .catch(function(err) {
                // Handle permission denied or other errors
                console.error('Error accessing the camera: ', err);
            });
    } else {
        // WebRTC is not supported
        console.error('WebRTC is not supported on this browser.');
    }
});


function initializeCamera(stream) {
    Webcam.set({
        width: 280,
        height: 280,
        dest_width: 800,
        dest_height: 800,
        image_format: 'jpeg',
        jpeg_quality: 90,
        constraints: {
            facingMode: 'user',
            width: 800,
            height: 800,
        },
        video: stream,
    });
    Webcam.attach('#camera');
}


function showCamera() {
    document.querySelector('.popup').style.display = 'block';
    initializeCamera();
}

function captureAndMirror() {
    Webcam.snap(function(data_uri) {
        const image = new Image();
        image.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0);
            document.querySelector('#capturedImage').src = canvas.toDataURL('image/jpeg');
            document.querySelector('#capturedImage').style.display = 'inline';
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
    captureAndMirror();
}

function retakePhoto() {
    document.querySelector('#capturedImage').style.display = 'none';
    document.querySelector('#capturedImage').src = '';
    document.querySelector('#takePhotoBtn').style.display = 'inline-block';
    document.querySelector('#retakeBtn').style.display = 'none';
    document.querySelector('#doneBtn').style.display = 'none';
    Webcam.attach('#camera');
}

function closePopup() {
    document.querySelector('.popup').style.display = 'none';
    Webcam.reset();
    document.querySelector('#capturedImage').src = '';
    document.querySelector('#capturedImage').style.display = 'none';
    document.querySelector('#takePhotoBtn').style.display = 'inline-block';
    document.querySelector('#retakeBtn').style.display = 'none';
    document.querySelector('#doneBtn').style.display = 'none';
}

function savePhoto() {
    const imageDataURI = document.querySelector('#capturedImage').src;
    document.querySelector('#capturedImageInput').value = imageDataURI;
    document.querySelector('#show').innerText = 'Selfie.jpg';
    closePopup();
}

document.querySelector('#closePopupBtn').addEventListener('click', closePopup);
document.querySelector('#show').addEventListener('click', showCamera);
