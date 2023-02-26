// 1 = tono 
// 0.5 = Semitono

/*
Escala:
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

const btnEscalaMayor = document.querySelector('#btnEscalaMayor');
const btnEscalaMenor = document.querySelector('#btnEscalaMenor');
const btnBack = document.querySelector('#btnBack');
const btnNext = document.querySelector('#btnNext');

//-- Parametros Iniciales --
const indexNotas = getIndexNotas('G');
let intervalos = [];
let gv_escala = 0;


btnEscalaMayor.addEventListener("click", (event) => {
    const escalaMayorIntervalos = [1, 1, 0.5, 1, 1, 1, 0.5];
    display.textContent = "C";
    intervalos = escalaMayorIntervalos;

    gv_escala = 3.5;

    removeOnKeyClass();
    printScale(gv_escala);
});

btnEscalaMenor.addEventListener("click", (event) => {
    const escalaMenorIntervalos = [1, 0.5, 1, 1, 0.5, 1, 1];
    display.textContent = "C";
    intervalos = escalaMenorIntervalos;

    gv_escala = 3.5; //3.5 = C

    removeOnKeyClass();
    printScale(gv_escala);
});

btnNext.addEventListener("click", (event) => {

    display.textContent = "C#";
    gv_escala = gv_escala + 0.5;

    removeOnKeyClass();
    printScale(gv_escala);
});


function printScale(p_escala) {

    const OCTAVA = intervalos.reduce((a, b) => a + b, 0) + p_escala;

    let keynum = 1;
    let index = -1;
    let nextKey = 0;
    let lastKey = 0;

    keys.forEach((item) => {
        if ((keynum >= p_escala) && (keynum <= OCTAVA)) {

            if (index != -1) {

                nextKey = lastKey + intervalos[index];

                if (keynum == nextKey) {
                    lastKey = nextKey
                    item.classList.add("onKey")
                    index++;
                }

            } else {
                item.classList.add("onKey")
                lastKey = p_escala;
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
    let notaIndex = notas.indexOf(InitialKey);
    
    keys.forEach((item) => {
        
        if (notaIndex >= notas.length){
            notaIndex = 0;
        }

        const indexNota = [index, notas[notaIndex]];
        indexNotas.push(indexNota);
        notaIndex++;
        index+=0.5;
    });    

    return indexNotas;
}

