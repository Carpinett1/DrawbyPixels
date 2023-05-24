// Carregando Elementos
const pixelBoard = document.getElementById('pixel-board');
const firstBtn = document.getElementById('firstbutton');
const secondBtn = document.getElementById('secondbutton');
const thirdBtn = document.getElementById('thirdbutton');
const forthBtn = document.getElementById('forthbutton');
const randomBtn = document.getElementById('button-random-color');
const clearBtn = document.getElementById('clear-board');
const input = document.getElementById('board-size');
const vqvbtn = document.getElementById('generate-board');
const colorButtons = [secondBtn, thirdBtn, forthBtn];
//
// Criando cor aleatoria
const randomColor = (btn) => {
  const disparador = btn;
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  disparador.style.background = color;
};
//
// Função que Randomiza Cores dos botões
const randomizeColor = () => {
  colorButtons.forEach(randomColor);
  const saveColors = {
    btn2: secondBtn.style.background,
    btn3: thirdBtn.style.background,
    btn4: forthBtn.style.background,
  };
  localStorage.setItem('colorPalette', JSON.stringify(saveColors));
};
randomBtn.addEventListener('click', randomizeColor);
//
// função que seleciona o tamando do painel
const boardSize = (tamanho) => {
  for (let index = 0; index < tamanho; index += 1) {
    const div = document.createElement('div');
    div.classList.add('div1');
    pixelBoard.appendChild(div);
    for (let index2 = 0; index2 < tamanho; index2 += 1) {
      const pixel = document.createElement('div');
      pixel.classList.add('pixel');
      pixelBoard.children[index].appendChild(pixel);
    }
  }
  localStorage.setItem('boardSize', JSON.stringify(tamanho));
};
//
// função que seleciona a cor a pintar
const selectedColor = (event) => {
  const selected = document.querySelector('.selected');
  selected.classList.remove('selected');
  event.target.classList.add('selected');
};
firstBtn.addEventListener('click', selectedColor);
secondBtn.addEventListener('click', selectedColor);
thirdBtn.addEventListener('click', selectedColor);
forthBtn.addEventListener('click', selectedColor);
//
// savePixelsColors
const savePixelsColors = () => {
  const pixels = document.querySelectorAll('.pixel');
  const pixelColors = [];
  for (let i = 0; i < pixels.length; i += 1) {
    pixelColors.push(pixels[i].style.background);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(pixelColors));
};
//
// Clear function
const clearBoard = () => {
  const allPixels = document.querySelectorAll('.pixel');
  for (let i = 0; i < allPixels.length; i += 1) {
    allPixels[i].style.background = 'white';
  }
  savePixelsColors();
};
clearBtn.addEventListener('click', clearBoard);
//
// função de pintar
const paintPixel = (event) => {
  const disparador = event.target;
  const selectColor = document.querySelector('.selected');
  const colorselected = window.getComputedStyle(selectColor).backgroundColor;
  disparador.style.background = colorselected;
};
const addEvent = () => {
  const pixels = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].addEventListener('click', paintPixel);
    pixels[i].addEventListener('click', savePixelsColors);
  }
};
//
// Funções de alterar o tamanho do board
const deleteBoard = () => {
  const allPixels = document.querySelectorAll('.pixel');
  const allDiv1 = document.querySelectorAll('.div1');
  for (let i = 0; i < allPixels.length; i += 1) {
    allPixels[i].parentNode.removeChild(allPixels[i]);
  }
  for (let i = 0; i < allDiv1.length; i += 1) {
    allDiv1[i].parentNode.removeChild(allDiv1[i]);
  }
};
let inputvalue = input.value;
const newBoardSize = () => {
  deleteBoard();
  if (inputvalue >= 5 && inputvalue <= 50) {
    boardSize(inputvalue);
    addEvent();
  } else if (inputvalue < 5) {
    boardSize(5);
    addEvent();
  } else if (inputvalue > 50) {
    boardSize(50);
    addEvent();
  }
  savePixelsColors();
};
const verificaInput = () => {
  if (inputvalue === '') {
    window.alert('Board inválido!');
    inputvalue = 5;
    newBoardSize();
  }
  newBoardSize();
};
const newinput = () => {
  inputvalue = input.value;
};
input.addEventListener('input', newinput);
vqvbtn.addEventListener('click', verificaInput);
//
// LOADING SAVE
const loadColors = () => {
  let colorPaletteSave = localStorage.getItem('colorPalette');
  colorPaletteSave = JSON.parse(colorPaletteSave);
  secondBtn.style.background = colorPaletteSave.btn2;
  thirdBtn.style.background = colorPaletteSave.btn3;
  forthBtn.style.background = colorPaletteSave.btn4;
};
const loadBoardSize = () => {
  let boardSizeSave = localStorage.getItem('boardSize');
  boardSizeSave = JSON.parse(boardSizeSave);
  boardSize(boardSizeSave);
};
const loadPixelBoard = () => {
  let pixelBoardSave = localStorage.getItem('pixelBoard');
  pixelBoardSave = JSON.parse(pixelBoardSave);
  const pixels = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].style.background = pixelBoardSave[i];
  }
};
if (localStorage.colorPalette) {
  loadColors();
} else {
  secondBtn.style.background = 'red';
  thirdBtn.style.background = 'blue';
  forthBtn.style.background = 'green';
}
if (localStorage.boardSize) {
  loadBoardSize();
  addEvent();
} else {
  boardSize(5);
  addEvent();
}
if (localStorage.pixelBoard) {
  loadPixelBoard();
}
