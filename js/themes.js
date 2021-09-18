$(document).ready(function () {
    $("#theme").click(function () {
        if (localStorage.getItem("theme") == "dark") {
            lightTheme()
            $('#theme').text('DarkMode');
        } else {
            darkTheme()
            $('#theme').text('LightMode');
        }
    });
});

const darkTheme = () => {

    $("h1").css("color", "white")
    $("h2").css("color", "white")
    $("label").css("color", "white")
    $("p").css("color", "white")
    $("body").css("background-color", "black")
    
    localStorage.setItem("theme", "dark")
}

const lightTheme = () => {

    $("h1").css("color", "black")
    $("h2").css("color", "black")
    $("label").css("color", "black")
    $("p").css("color", "black")
    $("body").css("background-color", "white")

    localStorage.setItem("theme", "light")
}
