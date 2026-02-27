//Cambio de idiomas del portfolio
const banderasElement = document.getElementById("banderas");
const textsToChange = document.querySelectorAll("[data-section]");

const changeLanguage = async (language) => {
    const requestJson = await fetch(`./${language}.json`)
    const texts = await requestJson.json();

    for (const textToChange of textsToChange) {
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;

        textToChange.innerHTML = texts[section][value];
    }  
};

banderasElement.addEventListener ('click', (e) => {
    const item = e.target.closest('.bandera__item');

    if(item){
    changeLanguage(e.target.parentElement.dataset.language);
    }
});


