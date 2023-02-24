const fadeDuration = 2000;

let rotationAngle = 0;

function animateButtons() {
    let yesButton = $("#yesButton");
    let neinButton = $("#neinButton");
    yesButton.attr("disabled", "disabled");
    neinButton.attr("disabled", "disabled");
    rotateButton(yesButton);
    rotateButton(neinButton);
    yesButton.fadeOut(fadeDuration);
    neinButton.fadeOut(fadeDuration);
}

function rotateButton(button) {
    setTimeout(function() {
        rotationAngle += 5;
        button.css({'transform' : 'rotate(' + rotationAngle + 'deg)'});
        rotateButton(button);
    }, fadeDuration / 72);
}

$("#yesButton").click(function() {
    $("#greeting").html("Hallo Felix!");
    animateButtons();
});

$("#neinButton").click(function() {
    $("#greeting").html("Hallo, Das Scheusal!");
    animateButtons();
});
