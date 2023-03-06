// 1 = tono 
// 0.5 = Semitono

/*
Scale:
    1 - C
    2 - C#
    3 - D
    4 - D#
    5 - E
    6 - F
    7 - F#
    8 - G
    9 - G#
    10 - A
    11 - A#
    12 - B
 */

//--Elementos WEB---
const display = document.querySelector('.display');
const keys = document.querySelectorAll('.key');

const btnScaleMajor = document.querySelector('#btnScaleMajor');
const btnScaleMinor = document.querySelector('#btnScaleMinor');
const btnScaleMinorHarmonic = document.querySelector('#btnScaleMinorHarmonic');
const btnBack = document.querySelector('#btnBack');
const btnNext = document.querySelector('#btnNext');

//-- Parametros Iniciales --
const indexNotas = getIndexNotas('G');
let intervalos = [];
let globalScale = 0;
console.log(indexNotas);

btnScaleMajor.addEventListener("click", (event) => {
    const ScaleMayorIntervalos = [1, 1, 0.5, 1, 1, 1, 0.5];
    display.textContent = "C";
    intervalos = ScaleMayorIntervalos;

    globalScale = 3.5;

    removeOnKeyClass();
    printScale(globalScale);
});

btnScaleMinor.addEventListener("click", (event) => {
    const ScaleMenorIntervalos = [1, 0.5, 1, 1, 0.5, 1, 1];
    display.textContent = "C";
    intervalos = ScaleMenorIntervalos;

    globalScale = 3.5; //3.5 = C

    removeOnKeyClass();
    printScale(globalScale);
});

btnScaleMinorHarmonic.addEventListener("click", (event) => {
    const ScaleMenorIntervalos = [1, 0.5, 1, 1, 0.5, 1.5, 0.5];
    display.textContent = "C";
    intervalos = ScaleMenorIntervalos;

    globalScale = 3.5; //3.5 = C

    removeOnKeyClass();
    printScale(globalScale);
});

btnNext.addEventListener("click", (event) => {

    globalScale = calculateScale(+0.5);
    
    const CurrentNote = searchNoteByIndex(globalScale);
    display.textContent = CurrentNote.nota; 
    
    removeOnKeyClass();
    printScale(globalScale);
});

btnBack.addEventListener("click", (event) => {

    globalScale = calculateScale(-0.5);
    
    const CurrentNote = searchNoteByIndex(globalScale);
    display.textContent = CurrentNote.nota; 
    
    removeOnKeyClass();
    printScale(globalScale);
});



function printScale(p_Scale) {

    const OCTAVA = intervalos.reduce((a, b) => a + b, 0) + p_Scale;

    let keynum = 1;
    let index = -1;
    let nextKey = 0;
    let lastKey = 0;

    keys.forEach((item) => {
        if ((keynum >= p_Scale) && (keynum <= OCTAVA)) {

            if (index != -1) {

                nextKey = lastKey + intervalos[index];

                if (keynum == nextKey) {
                    lastKey = nextKey
                    item.classList.add("onKey")
                    index++;
                }

            } else {
                item.classList.add("onKey")
                lastKey = p_Scale;
                index = 0;
            }
        }
        keynum += 0.5;
    });
}

function removeOnKeyClass(){
    keys.forEach((item) => {
        item.classList.remove("onKey");
    });
}

function getIndexNotas(InitialKey) {
    
    const indexNotas = [];
    const notas = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#']
    let index = 1;
    let notaIndex = notas.indexOf(InitialKey); //Se neceita la nota inicial
    
    //leer el total de teclas en pantalla para asignarles la nota y un indice
    keys.forEach((item) => {
        
        if (notaIndex >= notas.length){
            notaIndex = 0;
        }
        const indexNota = {index, nota: notas[notaIndex]};
        indexNotas.push(indexNota);
        notaIndex++;
        index+=0.5;
    });    

    return indexNotas;
}


function searchNoteByIndex(index){
    return indexNotas.find(element => {
        return element.index === index;
    })
}

function calculateScale(index) {
    let nextIndex = globalScale + index;
    const OCTAVE = 6;
    const maxIndex = indexNotas[indexNotas.length-1].index;

    if (nextIndex < 1){
        nextIndex = maxIndex-OCTAVE;
    }

    if ((nextIndex+OCTAVE) > maxIndex) {
        nextIndex = 1;
    }

    console.log(nextIndex);
    return nextIndex;

}