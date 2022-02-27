// atribuindo variáveis às divs
const tiles = document.querySelector('.tile-container');
const backspaceAndEnterRow = document.querySelector('#backspaceAndEnterRow');
const keyboardFirstRow = document.querySelector('#keyboardFirstRow');
const keyboardSecondRow = document.querySelector('#keyboardSecondRow');
const keyboardThirdRow = document.querySelector('#keyboardThirdRow');

// variáveis de ambiente
const keysFirstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keysSecondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keysThirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

// variáveis de ambiente
const rows = 6;
const columns = 5;
let currentRow = 0;
let currentColumn = 0;
let termoMap = {};
for (let index = 0; index < termo.length; index++) {
    termoMap[termo[index]] = index;
};
const guesses = [];

// criando as linhas e colunas da tela de jogo
for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    guesses[rowIndex] = new Array(columns)
    const tileRow = document.createElement('div');
    tileRow.setAttribute('id', 'row' + rowIndex);
    tileRow.setAttribute('class', 'tile-row');
    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
        const tileColumn = document.createElement('div');
        tileColumn.setAttribute('id', 'row' + rowIndex + 'column' + columnIndex);
        tileColumn.setAttribute('class', rowIndex === 0 ? 'tile-column typing' : 'tile-column disabled');
        tileRow.append(tileColumn);
        guesses[rowIndex][columnIndex] = ""
    }
    tiles.append(tileRow);
};

// metodo verificar a palavra
const checkGuess = () => {
    const guess = guesses[currentRow].join("");
    if (guess.length !== columns) {
        return
    }
    // Mudando a cor das letras
    var currentColumns = document.querySelectorAll(".typing");
    for (let index = 0; index < columns; index++) {
        const letter = guess[index];
        if (termoMap[letter] === undefined) {
            currentColumns[index].classList.add("wrong");
        } else if (termoMap[letter] === index) {
            currentColumns[index].classList.add("right");
        } else {
            currentColumns[index].classList.add("displaced");
        }
    }

    // Resultado
    if(guess === termo){
        setTimeout(() => {
            alert('VOCÊ ACERTOU!!!')
        }, 20);
        return

    } else {
        if( currentRow === rows -1) {
        setTimeout(() => {
            window.alert(`Você errou! A palavra é ${termo}`)
        }, 20);
        
        
        } else{
            moveToNextRow();
        }
    }
};
const moveToNextRow = () => {
    var typingColumns = document.querySelectorAll(".typing");
    for (let index = 0; index < typingColumns.length; index++) {
        typingColumns[index].classList.remove("typing");
        typingColumns[index].classList.add("disabled");
    }
    currentRow++;
    currentColumn = 0;

    const currentRowEl = document.querySelector("#row"+currentRow);
    var currentColumns = currentRowEl.querySelectorAll(".tile-column");
    for (let index = 0; index < currentColumns.length; index++) {
        currentColumns[index].classList.remove("disabled");
        currentColumns[index].classList.add("typing");
    }
}

// limitando o tamanho da linha (palavra)
const handleKeyboardOnClick = (key) => {
    if (currentColumn === columns) {
        return
    }
    const currentTile = document.querySelector('#row' + currentRow + 'column' + currentColumn);
    currentTile.textContent = key;
    guesses[currentRow][currentColumn] = key;
    currentColumn++;
}

// criando teclado
const createKeyboardRow = (keys, keyboardRow) => {
    keys.forEach((key) => {
        var buttonElement = document.createElement("button");
        buttonElement.textContent = key;
        buttonElement.setAttribute("id", key);
        buttonElement.addEventListener("click", () => handleKeyboardOnClick(key));
        keyboardRow.append(buttonElement);
    });
};

createKeyboardRow(keysFirstRow, keyboardFirstRow);
createKeyboardRow(keysSecondRow, keyboardSecondRow);
createKeyboardRow(keysThirdRow, keyboardThirdRow);

// criando Botão apagar
const handleBackspace = () => {
    if(currentColumn === 0){
        return
    }

    currentColumn--;
    guesses[currentRow][currentColumn] = "";
    const tile = document.querySelector("#row"+currentRow+"column"+currentColumn);
    tile.textContent = "";
}
const backspaceButton = document.createElement("button");
backspaceButton.addEventListener("click", handleBackspace);
backspaceButton.textContent = "<";
backspaceAndEnterRow.append(backspaceButton)

// criando Botão Enter
const enterButton = document.createElement("button");
enterButton.addEventListener("click", checkGuess);
enterButton.textContent = "ENTER";
backspaceAndEnterRow.append(enterButton);

// digitar com o teclado do aparelho
document.onkeydown = function (evt) {
    evt = evt || window.evt
    if (evt.key === "Enter"){
        checkGuess();
    } else if(evt.key === "Backspace"){
        handleBackspace();
    }else {
        handleKeyboardOnClick(evt.key.toUpperCase());
    }
}