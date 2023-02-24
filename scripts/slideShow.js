let nextButton = $('.nextButton');
let previousButton = $('.previousButton');
let slide = $('.slide');

// calculate the index of the last slide
let lastSlideIndex = 1;
$('.slideShowImage').each(function() {
    if (+$(this).attr('data-index') > lastSlideIndex) {
        lastSlideIndex = +$(this).attr('data-index');
    }
});

nextButton.click(function() {
    let currentImage = slide.find('.slideShowImage[data-current="true"]');
    let currentText = slide.find('.slideShowText[data-current="true"]');

    let nextIndex = +currentImage.attr('data-index') + 1;
    if (nextIndex > lastSlideIndex) {
        // there is no next slide
        return;
    }

    let nextImage = slide.find('.slideShowImage[data-index="' + nextIndex + '"]');
    let nextText = slide.find('.slideShowText[data-index="' + nextIndex + '"]');

    // hide current slide
    currentImage.attr('hidden', 'hidden');
    currentImage.attr('data-current', 'false');
    currentText.attr('hidden', 'hidden');
    currentText.attr('data-current', 'false');

    // show next slide
    nextImage.removeAttr('hidden');
    nextImage.attr('data-current', 'true');
    nextText.removeAttr('hidden');
    nextText.attr('data-current', 'true');
});

previousButton.click(function() {
    let currentImage = slide.find('.slideShowImage[data-current="true"]');
    let currentText = slide.find('.slideShowText[data-current="true"]');

    let previousIndex = +currentImage.attr('data-index') - 1;
    if (previousIndex === 0) {
        // there is no previous slide
        return;
    }

    let previousImage = slide.find('.slideShowImage[data-index="' + previousIndex + '"]');
    let previousText = slide.find('.slideShowText[data-index="' + previousIndex + '"]');

    // hide current slide
    currentImage.attr('hidden', 'hidden');
    currentImage.attr('data-current', 'false');
    currentText.attr('hidden', 'hidden');
    currentText.attr('data-current', 'false');

    // show previous slide
    previousImage.removeAttr('hidden');
    previousImage.attr('data-current', 'true');
    previousText.removeAttr('hidden');
    previousText.attr('data-current', 'true');
});
