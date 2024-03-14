function printShortenedStrings(stringArray = []) {
    stringArray.forEach(
        str => {
            let ret = ""; //store shortened string
            const len = str.length; // get number of characters in string
            if (len >= 2) { //if more than 2 characters
                ret = str[0] + str[1] + str[len - 2] + str[len - 1]; // result is the first two characters and last two characters cocatenated
            }
            console.log(`"${str}" : "${ret}"`);
        }
    )
}

const stringArray = ["jupiter", "spring", "it", "cat", "a", ""];
printShortenedStrings(stringArray);