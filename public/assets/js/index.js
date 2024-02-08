let isMirrored = true;
let cameraStream = null;

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#show').addEventListener('click', function() {
        const constraints = {
            video: {
                facingMode: 'user',
                width: 800,
                height: 800,
            },
        };

        navigator.mediaDevices.getUserMedia(constraints)
            .then(function(stream) {
                cameraStream = stream; // Save the stream reference
                initializeCamera(stream);
                document.querySelector('.popup').style.display = 'block';
            })
            .catch(function(err) {
                console.error('Error accessing the camera: ', err);
            });
    });

    document.querySelector('#takePhotoBtn').addEventListener('click', function() {
        capturePhoto();
    });

    document.querySelector('#retakeBtn').addEventListener('click', function() {
        retakePhoto();
    });

    document.querySelector('#doneBtn').addEventListener('click', function() {
        savePhoto();
    });

    document.querySelector('#closePopupBtn').addEventListener('click', function() {
        closePopup();
    });
});

function initializeCamera(stream) {
    const video = document.querySelector('#camera');
    video.srcObject = stream;
    video.play();
}

function capturePhoto() {
    const video = document.querySelector('#camera');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const image = new Image();
    image.src = canvas.toDataURL('image/jpeg');

    document.querySelector('#capturedImage').src = image.src;
    document.querySelector('#capturedImage').style.display = 'inline';
    document.getElementById('retakeBtn').style.display = 'inline'; // Show retake button
    document.getElementById('doneBtn').style.display = 'inline'; // Show done button
    document.getElementById('takePhotoBtn').style.display = 'none'; // Hide take photo button
}

function retakePhoto() {
    document.querySelector('#capturedImage').style.display = 'none';
    document.querySelector('#capturedImage').src = '';
    document.getElementById('retakeBtn').style.display = 'none'; // Hide retake button
    document.getElementById('doneBtn').style.display = 'none'; // Hide done button
    document.getElementById('takePhotoBtn').style.display = 'inline'; // Show take photo button
}

function closePopup() {
    document.querySelector('.popup').style.display = 'none';
    if (cameraStream) {
        const tracks = cameraStream.getTracks();
        tracks.forEach(track => track.stop());
    }

    document.querySelector('#capturedImage').src = '';
    document.querySelector('#capturedImage').style.display = 'none';
    document.getElementById('retakeBtn').style.display = 'none'; // Hide retake button
    document.getElementById('doneBtn').style.display = 'none'; // Hide done button
    document.getElementById('takePhotoBtn').style.display = 'inline'; // Show take photo button
}


function savePhoto() {
    const imageDataURI = document.querySelector('#capturedImage').src;
    document.querySelector('#capturedImageInput').value = imageDataURI;
    document.querySelector('#show').innerText = 'Selfie.jpg';
    closePopup();
}
