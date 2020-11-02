function RelationMatrix(matrix) {
    this.matrix = matrix;

    this.setMatrix = matrix => this.matrix = matrix;
    this.getMatrix = () => this.matrix;
    this.copyMatrix = () => {
        let matrix = this.matrix;
        return matrix;
    }
    this.clearMatrix = () => this.matrix = [];
    this.matrixCrossing = (matrixA, matrixB) => {
        let res = [];
        matrixA.forEach((elem, indexY) => {
            elem.forEach((element, indexX) => {
                res[indexY][indexX] = element && matrixB[indexY][indexX];
            });
        });
        return res;
    }
    this.matrixUnification = (matrixA, matrixB) => {
        let res = [];
        matrixA.forEach((elem, indexY) => {
            elem.forEach((element, indexX) => {
                res[indexY][indexX] = element || matrixB[indexY][indexX];
            });
        });
        return res;
    }

    this.matrixDifference = (matrixA, matrixB) => {
        let res = [];
        for (let i = 0; i < matrixA.length; i++) {
            res[i] = [];
            for (let j = 0; j < matrixA[0].length; j++) {
                res[i][j] = +(matrixA[i][j] > matrixB[i][j]);
            }
        }
        return res;
    }
    this.matrixSymmetricDifference = (matrixA, matrixB) => {
        let res = [];
        matrixA.forEach((elem, indexY) => {
            elem.forEach((element, indexX) => {
                res[indexY][indexX] = element < matrixB[indexY][indexX];
            });
        });
        return res;
    }
    this.matrixContain = (matrixA, matrixB) => {
        return matrixA == matrixB;
    }
    this.matrixComposition = (matrixA, matrixB) => {
        let res = [];
        for (let i = 0; i < matrixA.length; i++) res[i] = [];
        for (let k = 0; k < matrixA.length; k++) {
            for (let i = 0; i < matrixA.length; i++) {
                let t = 0;
                for (let j = 0; j < matrixA.length; j++) t += matrixA[i][j] * matrixB[j][k];
                res[i][k] = t;
            }
        }
        return res;
    }
    this.matrixAddition = matrix => {
        let res = [];
        for (let i = 0; i < matrix.length; i++) {
            res[i] = [];
            for (let j = 0; j < matrix[0].length; j++) {
                res[i][j] = !matrix[i][j];
            }
        }
        return res;
    }
    this.matrixTransposition = matrix => {
        var res = [];
        for (let i = 0; i < matrix.length; i++) {
            res[i] = [];
            for (let j = 0; j < matrix[0].length; j++) {
                res[i][j] = matrix[j][i];
            }
        }
        return res;
    }
    this.matrixDuality = (matrix) => {
        matrix = this.matrixTransposition(matrix);
        matrix = this.matrixAddition(matrix);
        return matrix;
    }

}

function relationArray(array) {
    this.array = array;
    this.setArray = array => this.array = array;
    this.getArray = () => this.array;
    this.copyArray = () => {
        let array = this.array;
        return array;
    }
    this.clearMatrix = () => this.matrix = [];

    this.toMatrix = () => {
        let matrix = [];
        this.array.forEach((element) => {
            matrix[element[0]][element[1]] = 1;
        });
        return matrix;
    }
    this.toArray = (matrix) => {
        this.array = [];
        for (let j = 0; j < matrix.length; j++) {
            for (let i = 0; i < matrix[0].length; i++) {
                if (matrix[j][i] == 1) {
                    this.array.push([i + 1, j + 1]);
                }
            }
        }

    }
}

let matrixP = [[1, 0, 0, 0, 0],
[0, 1, 1, 0, 0],
[0, 1, 0, 1, 0],
[0, 0, 1, 0, 1],
[0, 0, 0, 1, 0]],

    matrixQ = [[0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0]],

    matrixR = [[0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0]];


console.log(`Матриця P`);
console.log(matrixP);
console.log(`Матриця Q`);
console.log(matrixQ);
console.log(`Матриця R`);
console.log(matrixR);

let matrix = new RelationMatrix();

let arrayP = new relationArray();
let arrayQ = new relationArray();
let arrayR = new relationArray();
let arrayResult = new relationArray();
let date = new Date();
let matrixTimeStart = date.getTime();

let pAndQ = matrix.matrixComposition(matrixP, matrixQ);

let d = matrix.matrixDuality(matrixR);

let k = matrix.matrixDifference(pAndQ, d);
let matrixTimeEnd = date.getTime();
console.log(`Матриця, яка є результатом відношення`);
console.log(k);

console.log(`Час затрачений на виконання обчислень ${matrixTimeStart-matrixTimeEnd} мілісекунд`);

arrayP.toArray(matrixP);
arrayQ.toArray(matrixQ);
arrayR.toArray(matrixR);
matrixTimeStart = date.getTime();
console.log(`Представлення матриці P у вигляді перетинів:`);
console.log(arrayP.getArray());
console.log(`Представлення матриці Q у вигляді перетинів:`);
console.log(arrayQ.getArray());
console.log(`Представлення матриці R у вигляді перетинів:`);
console.log(arrayR.getArray());

arrayResult.toArray(k);
console.log(`Представлення результату у вигляді перетинів:`);
console.log(arrayResult.getArray());
matrixTimeEnd = date.getTime();
console.log(`Час затрачений на виконання обчислень ${matrixTimeStart-matrixTimeEnd} мілісекунд`);