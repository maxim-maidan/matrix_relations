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
        matrix.forEach((elem, indexY) => {
            elem.forEach((element, indexX) => {
                if (element == 1) {
                    this.array.push([indexY, indexX]);
                }
            });
        });
    }
}

let matrixP =  [[1, 0, 0, 0, 0],
                [0, 1, 1, 0, 0],
                [0, 1, 0, 1, 0],
                [0, 0, 1, 0, 1],
                [0, 0, 0, 1, 0]],

    matrixQ =  [[0, 1, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 1, 0, 0, 0],
                [0, 0, 0, 1, 0],
                [0, 0, 1, 0, 0]],

    matrixR =  [[0, 1, 0, 0, 0],
                [0, 0, 1, 1, 1],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 1],
                [0, 0, 0, 1, 0]];

let matrix = new RelationMatrix();

let pAndQ = matrix.matrixComposition(matrixP, matrixQ);
console.log(pAndQ);
let d = matrix.matrixDuality(matrixR);

let k = matrix.matrixDifference(pAndQ, d);
console.log(k);
