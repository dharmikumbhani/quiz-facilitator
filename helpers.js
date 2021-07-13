function printAllInConsole(arr, type) {
    if (type === "onlyQ") {
        arr.forEach((element, index) => {
            console.log(`Q.${index+1}`, JSON.stringify(element,undefined,2))
            console.log("")
            console.log("------------------------------------------")
        });
    } else if (type === "qWithO") {
        arr.forEach((element, index) => {
            console.log(`Q.${index+1}`, JSON.stringify(element.q,undefined,2))
            element.ops.forEach((el, index) => {
                const letter = String.fromCharCode(index + 97)
                console.log(`${letter}) `,el)
            })
            console.log("")
            console.log("------------------------------------------")
        });
    } else {
        console.log("The array you passed is,", JSON.stringify(arr, undefined, 2))
        console.log("Invalid type passed")
        console.log("The types are:")
        console.log("onlyQs -----> When the array has only Questions");
        console.log("qWithO -----> When the array passed has Questions and options")
    } 
}

/*
[
    {
        q:'',
        ops: [
            {
                op: "",
                upvo: 11,
                dovot: 0,
            }
        ]
    }
]
*/

function convertArrytoIncVotes (arr) {
    const initialArray = arr;
    let qOV = [];
    qOV = initialArray.map(qObj => {
        let options = []
        options = qObj.ops.forEach(opt => {
            return {
                option: opt,
                upVotes: 0,
                downVotes: 0,
            }
        })
        return {
            q: qObj.q,
            ops: options
        }
    })
}
module.exports = {printAllInConsole, convertArrytoIncVotes}