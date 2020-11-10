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
    }
    isReflexiveRelation = matrix => {
        let diagonal = [];
        matrix.forEach((elem, index) => {
            diagonal.push(elem[index]);
        });
        return diagonal.every(elem => elem)
    };
    isAntiReflexiveRelation = matrix => {
        return !this.isReflexiveRelation(matrix);
    };
    isSymmetricalRelation = matrix => {
        return matrix.every((element, i, arr) => element.every((elem, j) => elem == arr[j][i]));
    };
    isAsymmetricalRelation = matrix => {
        let diagonal = [];
        matrix.forEach((elem, index) => {
            diagonal.push(elem[index]);
        });
        return this.isSymmetricalRelation(matrix) && diagonal.every(elem => !elem);
    };
    isAntiSymmetricalRelation = matrix => {
        return !this.isSymmetricalRelation(matrix);
    };
    isTransitiveRelation = matrix => {
        let composition = this.matrixComposition(matrix, matrix);
        return JSON.stringify(composition) == JSON.stringify(matrix);
    };
    isAntiCyclicRelation = matrix => {
        let arr = [], res = [];
        matrix.forEach((element, j) => { element.forEach((elem, i) => { if (elem) arr.push([j, i]) }) })
        arr.forEach((element, j) => { arr.forEach((elem, i) => { res.push(j != i ? element[0] != elem[1] || element[1] != elem[0] : true) }) });
        return res.every(elem => elem);

    };
    matrixComposition = (matrixA, matrixB) => {
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
    matrixUnification = (matrixA, matrixB) => {
        let res = [];
        matrixA.forEach((elem, i) => {
            res[i] = [];
            elem.forEach((element, j) => {
                res[i][j] = element || matrixB[i][j];
            });
        });
        return res;
    };
    isConnectedRelation = (matrix) => {
        let transMatrix = this.matrixTransposition(matrix);
        let unificationMatrix = JSON.parse(JSON.stringify(this.matrixUnification(matrix, transMatrix)));
        console.log(unificationMatrix);
        return unificationMatrix.every((elem) => elem.every(el => el));
    };
    matrixTransposition = matrix => {
        var res = [];
        for (let i = 0; i < matrix.length; i++) {
            res[i] = [];
            for (let j = 0; j < matrix[0].length; j++) {
                res[i][j] = matrix[j][i];
            }
        }
        return res;
    };
    isTolerant = matrix => {
        return this.isReflexiveRelation(matrix) && this.isSymmetricalRelation(matrix);
    };
    IsEquivalent = matrix => {
        return this.isTolerant && this.isTransitiveRelation(matrix);
    };
    isQuasiOrder = matrix => {
        return this.isReflexiveRelation(matrix) && this.isTransitiveRelation(matrix);
    };
    isOrder = matrix => {
        return this.isReflexiveRelation(matrix) && this.isTransitiveRelation(matrix) && this.isAntiSymmetricalRelation(matrix);
    };
    isAustere = matrix => {
        return this.isAsymmetricalRelation(matrix) && this.isTransitiveRelation(matrix);
    };
    isLineOrder = matrix => {
        return this.isReflexiveRelation(matrix) && this.isAntiSymmetricalRelation(matrix) && this.isTransitiveRelation(matrix);
    };
    transitiveClosing = matrix => {
        let transitive = matrix, closing = matrix;
        for (let i = 1; i < matrix.length; i++) {
            transitive = this.matrixComposition(transitive, matrix);
            closing = this.matrixUnification(closing, transitive);
        }
        return closing;
    };
    reachability = matrix => {
        return this.matrixUnification(this.diagonal(), this.transitiveClosing(matrix))
    };
    mutualReachability = matrix => {
        // console.log(this.transitiveClosing(matrix));
        // console.log(this.matrixTransposition(this.transitiveClosing(matrix)));

        return this.matrixUnification(this.matrixCrossing(this.transitiveClosing(matrix), this.matrixTransposition(this.transitiveClosing(matrix))), this.diagonal());
    };
    diagonal = () => {
        return [[1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1]]
    };
    matrixCrossing = (matrixA, matrixB) => {
        let res = [];
        matrixA.forEach((elem, i) => {
            res[i] = [];
            elem.forEach((element, j) => {
                res[i][j] = element && matrixB[i][j];
            });
        });
        return res;
    };
    factorization = (matrix, arr) => {
        let stringMatrix = JSON.stringify(matrix).toString();
        console.log(stringMatrix);
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                stringMatrix = stringMatrix.replaceAll((arr[i][j]).toString(), i.toString());
            }
        }
        let matrixRes = [];
        for (let i = 0; i < arr.length; i++) {
            matrixRes[i] = []
            for (let j = 0; j < arr.length; j++) {
                matrixRes[i][j] = 0;
            }
        }
        stringMatrix = JSON.parse(stringMatrix);
        for (let i = 0; i < stringMatrix.length; i++) {
            matrixRes[stringMatrix[i][0]][stringMatrix[i][1]] = 1;
        }
        return matrixRes;
    };
    toArray = (matrix) => {
        let arr = [];
        for (let j = 0; j < matrix.length; j++) {
            for (let i = 0; i < matrix[0].length; i++) {
                if (matrix[j][i] == 1) {
                    arr.push([j, i]);
                }
            }
        }
        return arr;
    };


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

    let i = [[0], [1, 2, 3, 4]];
    let j = [[0], [1, 2, 4], [3]];

    let m = new RelationMatrix();

    console.log(`Відношення Р`);
    console.log((matrix.P));
    console.log(`Відношення Q`);
    console.log((matrix.Q));

    console.log(`Перевірка відношення Q на толерантність`);
    console.log(m.isTolerant(matrix.Q));
    console.log(`Перевірка відношення Q на еквівалентність`);
    console.log(m.IsEquivalent(matrix.Q));
    console.log(`Перевірка відношення Q на квазіпорядок`);
    console.log(m.isQuasiOrder(matrix.Q));
    console.log(`Перевірка відношення Q на порядок`);
    console.log(m.isOrder(matrix.Q));
    console.log(`Перевірка відношення Q на строгий порядок`);
    console.log(m.isAustere(matrix.Q));
    console.log(`Перевірка відношення Q на лінійний порядок`);
    console.log(m.isLineOrder(matrix.Q));
    console.log(`Перевірка відношення Q на транзитивність`);
    console.log(m.isTransitiveRelation(matrix.Q));

    if (!m.isTransitiveRelation(matrix.Q)) {
        console.log(`Здійснюємо транзитивне замикання відношення Q`);
        console.log(m.transitiveClosing(matrix.Q))
        matrix.Q = m.transitiveClosing(matrix.Q)

        console.log(`Перевірка відношення Q на толерантність`);
        console.log(m.isTolerant(matrix.Q));
        console.log(`Перевірка відношення Q на еквівалентність`);
        console.log(m.IsEquivalent(matrix.Q));
        console.log(`Перевірка відношення Q на квазіпорядок`);
        console.log(m.isQuasiOrder(matrix.Q));
        console.log(`Перевірка відношення Q на порядок`);
        console.log(m.isOrder(matrix.Q));
        console.log(`Перевірка відношення Q на строгий порядок`);
        console.log(m.isAustere(matrix.Q));
        console.log(`Перевірка відношення Q на лінійний порядок`);
        console.log(m.isLineOrder(matrix.Q));
    }
    console.log(`Знаходимо відношення P взаємної досягальності`);
    console.log(m.mutualReachability(matrix.P));
    console.log(`Здіснюємо розбиття носія на класи`);
    console.log(j);
    console.log(`Здійснюємо факторизацію відношення P`);
    console.log(m.factorization(m.toArray(matrix.P), i));

    matrix.P = [[0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1],
    [0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 1, 1, 0]];

    console.log(`Знаходимо відношення P взаємної досягальності додаткового завдання`);
    console.log(m.mutualReachability(matrix.P));
    matrix.P = m.mutualReachability(matrix.P)
    console.log(`Здіснюємо розбиття носія на класи додаткового завдання`);
    console.log(j);
    console.log(`Здійснюємо факторизацію відношення P додаткового завдання`);
    console.log(m.factorization(m.toArray(matrix.P), j));
}

