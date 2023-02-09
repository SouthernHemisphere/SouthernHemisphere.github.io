$("document").ready(function() {
    $("#greeting").html("Alles Ugo bei dir?");
    window.nameIsUli = true;
    $("#nameButton").click(function() {
        if (window.nameIsUli) {
            $("#greeting").html("Hallo Felix!");
            window.nameIsUli = false;
        } else {
            $("#greeting").html("Alles Ugo bei dir?");
            window.nameIsUli = true;
        }
    });
});

$("document").ready(function() {
    $("#greeting").html("Alles Ugo bei dir?");
    window.nameIsUli = true;
    $("#neinButton").click(function() {
        if (window.nameIsUli) {
            $("#greeting").html("Hallo Das Scheusal!");
            window.nameIsUli = false;
        } else {
            $("#greeting").html("Alles Ugo bei dir?");
            window.nameIsUli = true;
        }
    });
});