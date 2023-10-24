const paragraphs = [
    "It is obvious. I am clearly a fan of the five-paragraph model. As long as I am able to outline three reasons why Psychology is my favorite subject, three arguments why Pulp Fiction is better than Forrest Gump, and three examples of how Shakespeares works are relevant to current day society, I can write just about any analytical essay. The five-paragraph model is truly a valuable tool. I wished my life was as well structured, versatile, and easy to follow as the five-paragraph model.",
    "Example Five-Paragraph Essay (on the advantages of five-paragraph model)I love using the five-paragraph model for writing. I can find three points to argue for or exemplify just about any topic imaginable. Cats are good pets because they are good companions, they are clean, and they are easy to care for. Jaws is a classic film because of its acting, its cinematography, and its musical score. Three examples of the U.S. governments checks and balances are its executive branch, its legislative branch, and its judicial branches. The five-paragraph model is a valuable tool for many writing situations because it structures my writing, it aids my readers, and it is versatile.",
    "One advantage of the five-paragraph model is that it structures what I write. Before I learned the five-paragraph recipe, I had either stare at a blank screen or I had write one big block of text; now, I know to first identify three examples, reasons, or other supporting pieces of evidence. Then, I develop those three examples, reasons, or pieces of evidence into its own paragraph. I write a thesis statement based off those three examples, reasons, or pieces of evidence; I flesh out my introduction with a hook; and I write a conclusion paragraph. Following the five-paragraph model makes my writing tasks considerably less intimidating. ",
    "A related advantage of the five-paragraph model is that my following the recipe makes it easy for readers to follow my writing. When readers see five paragraphs (not one block of text), they can anticipate that I will introduce my topic in my first paragraph and that I will conclude my first paragraph with my thesis statement. Readers can predict that I will provide three examples, reasons, or other supporting evidence to support my thesis statement, each of which will be fleshed out in its own paragraph: boom, boom, boom. And readers know they ll find my conclusions in my final, fifth paragraph. By using the five-paragraph model, I ease the burden on my readers.",
    "A third advantage of the five-paragraph model is that, like most recipes, it can be doubled or even tripled. For a standard 400 to 500-word paper, I apply the standard single batch of the recipe, writing 75 to 100 words in each of the five paragraphs. For a 1000-word essay, I double the recipe writing by two paragraphs, rather than only one, for the introduction, the three supporting paragraphs, and the conclusion paragraph. I can even write a 5000-word paper with this recipe (by writing 1000 words for each of the five components). The five-paragraph model is versatile for all my writing needs.",
    "Development is always deliberated with economic connotations and it is referred to as an increase in the gross national product or in per capita income. In this understanding, development is equated with growth and it is envisioned that a quantum increase in the production of goods and services would bring development.Development is always deliberated with economic connotations and it is referred to as an increase in the gross national product or in per capita income. In this understanding, development is equated with growth and it is envisioned that a quantum increase in the production of goods andservices would bring development.",
    "Development is always deliberated with economic connotations and it is referred to as an increase in the gross national product or in per capita income. In this understanding, development is equated with growth and it is envisioned that a quantum  increase in the production of goods and services would bring development.Development is always deliberated with economic connotations and it is referred to as an increase in the gross national product or in per capita income. In this understanding, development is equated with growth and it is envisioned that a quantum increase in the production of goods andservices would bring development."
]
const pg = document.getElementById('pg');
const userinput = document.querySelector('.textinput');
const resetbtn = document.querySelector('.containerin button');
const totaltime = document.querySelector('.time .txt2');
const totalwpm = document.querySelector('.wpm .txt2');
const totalmistake = document.querySelector('.mistake .txt2');
const totalcpm = document.querySelector('.cpm .txt2');
let timer;    
let maxTime = 120;
let timeRemaining = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = 0;

const setparagraph = () => {
    const randIndex = Math.floor(Math.random() * paragraphs.length)
    pg.innerText = "";
    paragraphs[randIndex].split("").forEach(char => {
        // console.log(char);
        pg.innerHTML += `<span>${char}</span>`
    })

    pg.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener("keydown", () => userinput.focus())
    pg.addEventListener("click", () => userinput.focus())

    totalmistake.innerText = 0;
    totalcpm.innerText = 0;
    totalwpm.innerText = 0;
    totaltime.innerText = timeRemaining;
}



const startTyping = () => {
    let characters = pg.querySelectorAll('span');
    // console.log(characters);
    //the
    //you
    let typedChar = userinput.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeRemaining > 0) {
        if (!isTyping) {
            // 0 or false
            timer = setInterval(startTimer, 1000);
            isTyping = true;
        }

        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("incorrect", "correct");
            }
        }
        else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");

            }
            else {
                characters[charIndex].classList.add("incorrect");
                mistakes++;
            }
            charIndex++;
        }

        characters.forEach(char => {
            char.classList.remove("active");
        })
        characters[charIndex].classList.add("active");

        // WPM is calculated by dividing the number of characters typed correctly (charIndex - mistakes) by 5 (the average number of characters per word) and dividing that result by the time it took to type those words (maxTime - timeRemaining), and then multiplying the result by 60 to convert to minutes.


        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeRemaining) * 60)
        wpm = wpm < 0 || !wpm || wpm == Infinity ? 0 : wpm;
        totalwpm.innerText = wpm;
        totalmistake.innerText = mistakes;
        totalcpm.innerText = charIndex - mistakes;
    }

    else{
        clearInterval(timer);
        isTyping = false;
    }
}
const startTimer = () => {
    if(timeRemaining >0){
        timeRemaining--;
        totaltime.innerText = timeRemaining;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeRemaining) * 60)
        totalwpm.innerHTMl = wpm;
    }
    else{
        clearInterval(timer);
        isTyping = false;
    }
 }
const resetGame = () => {
    setparagraph();
    clearInterval(timer)
    timeRemaining = maxTime;
    charIndex = 0;
    mistakes = 0;
    isTyping = 0;
    userinput.value = "";
    totaltime.innerText = timeRemaining;
    totalwpm.innerText = 0;
    totalmistake.innerText = 0;
    totalcpm.innerText = 0;
}

setparagraph();
resetbtn.addEventListener('click', resetGame);
userinput.addEventListener('input', startTyping);