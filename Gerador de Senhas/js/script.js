const generatePassBtn = document.querySelector('#generate-password');
const generatedPasswordElement = document.querySelector('#generated-password');   

const openCloseGenerate = document.querySelector('#open-generate-password'); 
const generatedPasswordContainer = document.querySelector('#generate-options');
const lengthInput = document.querySelector('#lenght');
const lettersInput = document.querySelector('#letters');
const numbersInput = document.querySelector('#numbers');
const symbolsInput = document.querySelector('#symbol');
const copyPasswordButton = document.querySelector('#copy-password');

// Funções
const getLetterLowerCase = () => {

    return String.fromCharCode(Math.floor(Math.random() * 26) + 97 );
};

const getLetterUpperCase = () => {

    return String.fromCharCode(Math.floor(Math.random() * 26) + 65 );
};

const getNumber = () => {

    return Math.floor(Math.random() * 10).toString(); 
};

const getSymbol = () => {

    const symbols = '(){}[]=<>/,.!@#$%&*+-';
    return symbols[Math.floor(Math.random() * symbols.length)];
};

const generatedPassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {

    let password = '';

    const passwordLenght = lengthInput.value;

    const generators = [];

    if (lettersInput.checked) {
        generators.push(getLetterLowerCase, getLetterUpperCase);
    }
    
      if (numbersInput.checked) {
        generators.push(getNumber);
    }
    
      if (symbolsInput.checked) {
        generators.push(getSymbol);
    }
    
      if (generators.length === 0) {
        return;
    }
    

    for(i = 0; i < passwordLenght; i = i + generators.length) {
        generators.forEach(() => {
            const randomvalue = 
            generators[Math.floor(Math.random() * generators.length)]();

            password += randomvalue;
        });
    }

    password = password.slice(0, passwordLenght);

    generatedPasswordElement.style.display = 'block';
    generatedPasswordElement.querySelector('h4').innerText = password;
};



// Eventos
generatePassBtn.addEventListener('click', () => {

    generatedPassword(getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol);

});

openCloseGenerate.addEventListener('click', () => {

    generatedPasswordContainer.classList.toggle('hide');

});

copyPasswordButton.addEventListener('click', (e) => {
    e.preventDefault();

    const password = generatedPasswordElement.querySelector("h4").innerText;

    navigator.clipboard.writeText(password).then(() => {

        copyPasswordButton.innerText = 'Senha copiada!';

        setTimeout(() => {

            copyPasswordButton.innerText = 'Copiar';

        }, 1000)

    })
});