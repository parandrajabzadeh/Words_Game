let darkModeEnabled=false
const darkModeButton=document.getElementById("darkModeButton")
darkModeButton.addEventListener("click",()=>{
    darkModeEnabled = !darkModeEnabled;

    if(darkModeEnabled){
        enableDarkMode();

    }else{
        disableDarkMode();
    }

});

const enableDarkMode=()=>{
    document.body.classList.add("dark-mode");


}

const disableDarkMode=()=>{
    document.body.classList.remove("dark-mode");

}