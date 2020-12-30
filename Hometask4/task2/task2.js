const { matrix } = require("./matrix")

let expectedOutput
let realOutput

console.log("Expected output:", expectedOutput = [[0,0],[0,1],[0,2],[0,3]])
console.log("Real output:\t", realOutput = matrix(1, 4, 0, 0))
console.log("Correct:", arraysEqual(realOutput, expectedOutput), "\n")

console.log("Expected output:", expectedOutput =  [[1,4],[1,5],[2,5],[2,4],[2,3],[1,3],[0,3],[0,4],[0,5],[3,5],[3,4],[3,3],[3,2],[2,2],[1,2],[0,2],[4,5],[4,4],[4,3],[4,2],[4,1],[3,1],[2,1],[1,1],[0,1],[4,0],[3,0],[2,0],[1,0],[0,0]])
console.log("Real output:", realOutput = matrix(5, 6, 1, 4))
console.log("Correct:", arraysEqual(realOutput, expectedOutput))

function arraysEqual(array1, array2) {
    return JSON.stringify(array1) === JSON.stringify(array2);
}
