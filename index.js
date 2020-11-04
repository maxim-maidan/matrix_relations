const getElementById = id => document.getElementById(id);
const getValueById = id => getElementById(id).value;
let matrixP = [], matrixQ = [], matrixR = [];
function Matrix() {
    this.P = [];
    this.R = [];
    this.Q = [];
}
let matrix = new Matrix();
function generateWall() {
    wallSize = getValueById('wallSize');
    let tableP = ``, tableR = ``, tableQ = ``;
    for (let j = 0; j < wallSize; j++) {
        matrix.P.push([]);
        matrix.Q.push([]);
        matrix.R.push([]);
        tableP += `<tr class="table__row"> \n`;
        tableR += `<tr class="table__row"> \n`;
        tableQ += `<tr class="table__row"> \n`;
        for (let i = 0; i < wallSize; i++) {
            matrix.P[j][i] = 0;
            matrix.Q[j][i] = 0;
            matrix.R[j][i] = 0;
            tableP += `<td class="table__elem" onclick="setActiveElement(${j}, ${i}, 'P')" id="${j}-${i}-P"></td>`
            tableR += `<td class="table__elem" onclick="setActiveElement(${j}, ${i}, 'R')" id="${j}-${i}-R"></td>`
            tableQ += `<td class="table__elem" onclick="setActiveElement(${j}, ${i}, 'Q')" id="${j}-${i}-Q"></td>`
        }
        tableP += `</tr>`;
        tableR += `</tr>`;
        tableQ += `</tr>`;
    }
    getElementById('matrixP').innerHTML = tableP;
    getElementById('matrixR').innerHTML = tableR;
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
        this.setMatrix = matrix => this.matrix = matrix;
        this.getMatrix = () => this.matrix;
        this.copyMatrix = () => {
            let matrix = this.matrix;
            return matrix;
        };
        this.clearMatrix = () => this.matrix = [];
        this.matrixCrossing = (matrixA, matrixB) => {
            let res = [];
            matrixA.forEach((elem, indexY) => {
                elem.forEach((element, indexX) => {
                    res[indexY][indexX] = element && matrixB[indexY][indexX];
                });
            });
            return res;
        };
        this.matrixUnification = (matrixA, matrixB) => {
            let res = [];
            matrixA.forEach((elem, indexY) => {
                elem.forEach((element, indexX) => {
                    res[indexY][indexX] = element || matrixB[indexY][indexX];
                });
            });
            return res;
        };

        this.matrixDifference = (matrixA, matrixB) => {
            let res = [];
            for (let i = 0; i < matrixA.length; i++) {
                res[i] = [];
                for (let j = 0; j < matrixA[0].length; j++) {
                    res[i][j] = +(matrixA[i][j] > matrixB[i][j]);
                }
            }
            res = this.matrixTransposition(res);
            return res;
        };
        this.matrixSymmetricDifference = (matrixA, matrixB) => {
            let res = [];
            matrixA.forEach((elem, indexY) => {
                elem.forEach((element, indexX) => {
                    res[indexY][indexX] = element < matrixB[indexY][indexX];
                });
            });
            return res;
        };
        this.matrixContain = (matrixA, matrixB) => {
            return matrixA == matrixB;
        };
        this.matrixComposition = (matrixA, matrixB) => {
            let res = [], matrix = [], arrayA = [], arrayB = [];
            for (let j = 0; j < matrixA.length; j++) {
                for (let i = 0; i < matrixA[0].length; i++) {
                    if (matrixA[j][i] == 1) {
                        arrayA.push([j, i]);
                    }
                    if (matrixB[j][i] == 1) {
                        arrayB.push([j, i]);
                    }
                }
            }
            for (let i = 0; i < arrayA.length; i++) {
                for (let k = 0; k < arrayB.length; k++) {
                    if (arrayA[i][1] == arrayB[k][0]) {
                        res.push([arrayA[i][0], arrayB[k][1]]);
                    }
                }
            }
            for (let i = 0; i < matrixA.length; i++) {
                matrix[i] = []
                for (let j = 0; j < matrixA.length; j++) {
                    matrix[i][j] = 0;
                }
            }
            for (let i = 0; i < res.length; i++) {
                matrix[res[i][0]][res[i][1]] = 1;
            }

            return matrix;
        };
        this.matrixAddition = matrix => {
            let res = [];
            for (let i = 0; i < matrix.length; i++) {
                res[i] = [];
                for (let j = 0; j < matrix[0].length; j++) {
                    res[i][j] = !matrix[i][j];
                }
            }
            return res;
        };
        this.matrixTransposition = matrix => {
            var res = [];
            for (let i = 0; i < matrix.length; i++) {
                res[i] = [];
                for (let j = 0; j < matrix[0].length; j++) {
                    res[i][j] = matrix[j][i];
                }
            }
            return res;
        };
        this.matrixDuality = (matrix) => {
            matrix = this.matrixTransposition(matrix);
            matrix = this.matrixAddition(matrix);
            for (let i = 0; i < matrix.length; i++) {
                for (let j = 0; j < matrix[0].length; j++) {
                    matrix[i][j] = +matrix[i][j];
                }
            }
            return matrix;
        };
        this.matrixToHtml = matrix => {
            let resultString = `<p>`;
            for (let i = 0; i < matrix.length; i++) {
                for (let j = 0; j < matrix[0].length; j++) {
                    resultString = resultString + ` ` + matrix[j][i] + ` `;
                }
                resultString = resultString + `<br>`;
            }
            resultString = resultString + `</p>`;
            return resultString;
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
        this.array = [];
        this.setArray = array => this.array = array;
        this.getArray = () => this.array;
        this.copyArray = () => {
            let array = this.array;
            return array;
        };
        this.clearMatrix = () => this.matrix = [];

        this.toMatrix = () => {
            let matrix = [];
            this.array.forEach((element) => {
                matrix[element[0]][element[1]] = 1;
            });
            return matrix;
        };
        this.toArray = (matrix) => {
            this.array = [];
            for (let j = 0; j < matrix.length; j++) {
                for (let i = 0; i < matrix[0].length; i++) {
                    if (matrix[j][i] == 1) {
                        this.array.push([i + 1, j + 1]);
                    }
                }
            }
        };
        this.arrayToHtml = () => {
            let str = `<p>`;
            this.array.forEach(elem => str = str + elem[0] + ` -> ` + elem[1] + `<br>`);
            str = str + `</p>`;
            return str;
        };
    }
}


function calculateRelations() {
    matrix.P = [[1, 0, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1],
    [0, 0, 0, 1, 0]],

        matrix.Q = [[0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0]],

        matrix.R = [[0, 1, 0, 0, 0],
        [0, 0, 1, 1, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1],
        [0, 0, 0, 1, 0]];

    let m = new RelationMatrix();

    let arrayP = new relationArray();
    let arrayQ = new relationArray();
    let arrayR = new relationArray();
    let arrayResult = new relationArray();
    let date = new Date();

    let matrixTimeStart = date.getTime();
    console.log(arrayP.toArray(matrix.P));
    let pAndQ = m.matrixComposition(matrix.P, matrix.Q);
    console.log(pAndQ);
    let d = m.matrixDuality(matrix.R);
    console.log(d);
    let k = m.matrixDifference(pAndQ, d);
    let matrixTimeEnd = date.getTime();

    getElementById('answer').innerHTML = getElementById('answer').innerHTML + `<p>Результат відношення</p>`
    getElementById('answer').innerHTML = getElementById('answer').innerHTML + m.matrixToHtml(k);
    getElementById('answer').innerHTML = getElementById('answer').innerHTML + `<p>Час затрачений на виконання обчислень ${matrixTimeStart - matrixTimeEnd} мілісекунд</p>`;

    matrixTimeStart = date.getTime();

    arrayP.toArray(matrix.P);
    arrayQ.toArray(matrix.Q);
    arrayR.toArray(matrix.R);
    arrayResult.toArray(k);

    getElementById('answer').innerHTML = getElementById('answer').innerHTML + `<p>Представлення відношення P у вигляді перетинів:</p>`;
    getElementById('answer').innerHTML = getElementById('answer').innerHTML + arrayP.arrayToHtml();
    getElementById('answer').innerHTML = getElementById('answer').innerHTML + `<p>Представлення відношення Q у вигляді перетинів:</p>`;
    getElementById('answer').innerHTML = getElementById('answer').innerHTML + arrayQ.arrayToHtml();
    getElementById('answer').innerHTML = getElementById('answer').innerHTML + `<p>Представлення відношення R у вигляді перетинів:</p>`;
    getElementById('answer').innerHTML = getElementById('answer').innerHTML + arrayR.arrayToHtml();
    getElementById('answer').innerHTML = getElementById('answer').innerHTML + `<p>Представлення результату у вигляді перетинів:</p>`;
    getElementById('answer').innerHTML = getElementById('answer').innerHTML + arrayResult.arrayToHtml();

    matrixTimeEnd = date.getTime();

    getElementById('answer').innerHTML = getElementById('answer').innerHTML + `<p>Час затрачений на виконання обчислень ${matrixTimeStart - matrixTimeEnd} мілісекунд</p>`;
}


