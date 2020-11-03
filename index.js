const getElementById = id => document.getElementById(id);
const getValueById = id => getElementById(id).value;
let matrixP = [], matrixQ = [], matrixR = [];
function Matrix() {
    this.P = [];
    this.Q = [];
}
let matrix = new Matrix();
function generateWall() {
    wallSize = getValueById('wallSize');
    let tableP = ``, tableQ = ``;
    for (let j = 0; j < wallSize; j++) {
        matrix.P.push([]);
        matrix.Q.push([]);
        tableP += `<tr class="table__row"> \n`;
        tableQ += `<tr class="table__row"> \n`;
        for (let i = 0; i < wallSize; i++) {
            matrix.P[j][i] = 0;
            matrix.Q[j][i] = 0;
            tableP += `<td class="table__elem" onclick="setActiveElement(${j}, ${i}, 'P')" id="${j}-${i}-P"></td>`
            tableQ += `<td class="table__elem" onclick="setActiveElement(${j}, ${i}, 'Q')" id="${j}-${i}-Q"></td>`
        }
        tableP += `</tr>`;
        tableQ += `</tr>`;
    }
    getElementById('matrixP').innerHTML = tableP;
    getElementById('matrixQ').innerHTML = tableQ;
}
function setActiveElement(row, col, mat) {
    const id = row + "-" + col + "-" + mat;
    const classList = getElementById(id).classList;
    if (Array.from(classList).includes("table__elem--active")) {
        classList.remove("table__elem--active")
        matrix[mat][row][col] = 0;
    }
    else {
        classList.add('table__elem--active')
        matrix[mat][row][col] = 1;
    }
}
class Relation {
    constructor() {
        this.isReflexiveRelation = matrix => {
            let diagonal = [];
            matrix.forEach((elem, index) => {
                diagonal.push(elem[index]);
            });
            return diagonal.every(elem => elem)
        };
        this.isSymmetricalRelation = matrix => {
            return matrix.every((element, i, arr) => element.every((elem, j) => elem == arr[j][i]));
        };
    }
}
class RelationMatrix extends Relation {
    constructor() {
        super();
        this.matrix = [];
    }
}

class relationArray extends Relation {
    constructor() {
        super();

    }
}

function calculateRelations() {
    let m = new RelationMatrix();
    console.log(m.isSymmetricalRelation(matrix.Q));
    console.log(m.isSymmetricalRelation(matrix.P));
}
// function calculateRelations() {
//     let m = new RelationMatrix();

//     let arrayP = new relationArray();
//     let arrayQ = new relationArray();
//     let arrayR = new relationArray();
//     let arrayResult = new relationArray();
//     let date = new Date();

//     let matrixTimeStart = date.getTime();
//     let pAndQ = m.matrixComposition(matrix.P, matrix.Q);
//     let matrixTimeEnd = date.getTime();

//     getElementById('answer').innerHTML = getElementById('answer').innerHTML + `<p>Матриця, яка є результатом відношення</p>`
//     getElementById('answer').innerHTML = getElementById('answer').innerHTML + m.matrixToHtml();
//     getElementById('answer').innerHTML = getElementById('answer').innerHTML + `<p>Час затрачений на виконання обчислень ${matrixTimeStart - matrixTimeEnd} мілісекунд</p>`;

//     matrixTimeStart = date.getTime(); 

//     arrayP.toArray(matrix.P);
//     arrayQ.toArray(matrix.Q);
//     arrayR.toArray(matrix.R);
//     arrayResult.toArray(k);

//     getElementById('answer').innerHTML = getElementById('answer').innerHTML + `<p>Представлення матриці P у вигляді перетинів:</p>`;
//     getElementById('answer').innerHTML = getElementById('answer').innerHTML + arrayP.arrayToHtml();
//     getElementById('answer').innerHTML = getElementById('answer').innerHTML + `<p>Представлення матриці Q у вигляді перетинів:</p>`;
//     getElementById('answer').innerHTML = getElementById('answer').innerHTML + arrayQ.arrayToHtml();
//     getElementById('answer').innerHTML = getElementById('answer').innerHTML + `<p>Представлення матриці R у вигляді перетинів:</p>`;
//     getElementById('answer').innerHTML = getElementById('answer').innerHTML + arrayR.arrayToHtml();
//     getElementById('answer').innerHTML = getElementById('answer').innerHTML + `<p>Представлення результату у вигляді перетинів:</p>`;
//     getElementById('answer').innerHTML = getElementById('answer').innerHTML + arrayResult.arrayToHtml();

//     matrixTimeEnd = date.getTime();

//     getElementById('answer').innerHTML = getElementById('answer').innerHTML + `<p>Час затрачений на виконання обчислень ${matrixTimeStart - matrixTimeEnd} мілісекунд</p>`;
// }

