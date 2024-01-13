Webcam.set({
    width: 280, // Adjust the size to match the container
    height: 280,
    dest_width: 720,
    dest_height: 720,
    image_format: 'jpg',
    jpeg_quality: 90,
});
Webcam.attach('#camera');

function capturePhoto() {
    Webcam.snap(function(data_uri) {
        // Replace the content of the #camera div with the captured image
        document.getElementById('camera').innerHTML = '<div class="captured-image-container"><img src="' + data_uri + '" class="captured-image"></div>';
    });
}

// popup
$(".Click-here").on('click', function() {
    $(".custom-model-main").addClass('model-open');
});
$(".close-btn, .bg-overlay").click(function() {
    $(".custom-model-main").removeClass('model-open');
});














// TAB
// $(document).on('click', '.tab-wrap ul li a', function (e) {
//     var curTabContentId = $(this).attr('href');
//     $(this).parents('.tab-wrap').find('ul li').removeClass('active');
//     $(this).parents('li').addClass('active');
//     $(this).parents('.tab-wrap').find('.tab-content-id').removeClass('active');
//     $(curTabContentId).addClass("active");
//     e.preventDefault();
// });