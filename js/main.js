// 1 = tono 
// 0.5 = Semitono

const escalaMayorIntervalos = [1,1,0.5,1,1,1,0.5] 

function Mayor() {
    console.log("dscs");
}

function Next() {
    const keys = document.querySelectorAll('.key');

    keys.forEach(element => {
        element.classList.remove("onKey")
        console.log(element);
    });

    keys.forEach((element, index) => {

        // const keyOn = escalaMayorIntervalos[index]  

        switch (index) {
            case 0:
                element.classList.add("onKey")
                break;
            case 2:
                element.classList.add("onKey")
                break;
            case 4:
                element.classList.add("onKey")
                break;
            case 5:
                element.classList.add("onKey")
                break;
            case 7:
                element.classList.add("onKey")
                break;
            case 9:
                element.classList.add("onKey")
                break;
            case 11:
                element.classList.add("onKey")
                break;
            default:
                break;
        }

        console.log(element);
    });


}