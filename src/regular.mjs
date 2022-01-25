/**
 * 
 * @param {String} str 
 * @returns                                         
 */
const RemoveSpace = (str) => {
    return str.replaceAll(" ", "");
}

const NumberRegex = /([0-9]+)/g;
const FunctionRegex = /(\bsin|cos|acos|asin|tan|atan|int\b)/g;
const OperatorsRegex =/([-*+\/^])/g
const MathsOperationRegex = /(([-*+\/()^])|(\bsin|cos|acos|asin|int\b)|([0-9]+))/g;

/**
 * 
 * @param {String} str 
 * @param {RegExp} regex
 * @returns 
 */
const Tokenization = (str, regex) => {
    let temp;
    let TokenArray = []
    while((temp = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (temp.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        //console.log(temp);
        TokenArray.push(temp[0])
    }
    return TokenArray;
}

export default {
    RemoveSpace,
    Tokenization,
    Regex: { 
        all: MathsOperationRegex,
        number: NumberRegex,
        function: FunctionRegex,
        operator: OperatorsRegex
    }
    
}
