$("document").ready(function() {
    $("#greeting").html("Hallo Uli!");
    window.nameIsUli = true;
    $("#nameButton").click(function() {
        if (window.nameIsUli) {
            $("#greeting").html("Hallo Felix!");
            window.nameIsUli = false;
        } else {
            $("#greeting").html("Hallo Das Scheusal!");
            window.nameIsUli = true;
        }
    });
});
