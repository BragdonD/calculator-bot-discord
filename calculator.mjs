import stack from "./stack.mjs"
const Stack = stack.Stack;
import regular from "./regular.mjs";
const RemoveSpace = regular.RemoveSpace;
const Tokenization = regular.Tokenization;
const Regex = regular.Regex;

/**
 * 
 * @param {String} str 
 */
const ShuntingYardAlgorithm = (str) => {
    str = RemoveSpace(str);
    const TokensArray = Tokenization(str, Regex.all);
    let OperatorStack = new Stack();
    let OutputStack = new Stack();

    console.log(TokensArray);

    for( let i = 0; i < TokensArray.length ; i++ ) {
        if ( Regex.number.test( TokensArray[ i ] ) ) {
            Regex.number.lastIndex = 0;
            OutputStack.insert( TokensArray[ i ] );
        }
        else if ( Regex.function.test( TokensArray[ i ] ) ) {
            Regex.function.lastIndex = 0;
            OperatorStack.insert( TokensArray[ i ] );
        }
        else if( TokensArray[ i ] === "," ) {
            while( OperatorStack.peek().get() != "(") {
                if(OperatorStack.peek().get() == null) throw new Error("Mismatched parenthesis");
                OutputStack.insert( OperatorStack.peek().get() );
                OperatorStack.pop();
            }
        }
        else if( Regex.operator.test( TokensArray[ i ] ) ) {
            Regex.operator.lastIndex = 0;
            while( OperatorStack.peek().get() != "(" && ( ( precedence[ TokensArray[ i ]  ] <= precedence[ OperatorStack.peek().get() ] && associativity[ TokensArray [ i ] ] == "Left" )  || ( precedence[ TokensArray[ i ]  ] < precedence[ OperatorStack.peek().get() ] && associativity[ TokensArray [ i ] ] == "Right" ) ) ) {
                OutputStack.insert( OperatorStack.peek().get() );
                OperatorStack.pop();
            }
            OperatorStack.insert( TokensArray[ i ] );
        }
        else if( TokensArray[ i ] === "(" ) {
            OperatorStack.insert( TokensArray[ i ] );
        }
        else if( TokensArray[ i ] == ")" ) {
            while( OperatorStack.peek().get() != "(") {
                OutputStack.insert( OperatorStack.peek().get() );
                OperatorStack.pop();
            }
            if( OperatorStack.peek().get() != "(" ) throw new Error("Mismatched parenthesis");
            OperatorStack.pop();
            if( Regex.function.test( OperatorStack.peek().get() ) ) {
                Regex.function.lastIndex = 0;
                OutputStack.insert( OperatorStack.peek().get() );
                OperatorStack.pop();
            }
        }
        
    }

    while( OperatorStack.peek().get() != null ) {
        if( OperatorStack.peek().get() === "(" ) throw new Error("Mismatched parenthesis");
        OutputStack.insert( OperatorStack.peek().get() );
        OperatorStack.pop();
    }
    
    return OutputStack;
}

const CalculPostfixExpression = (expression) => {
    let OperandsStack = new Stack();
    let output = 0;
    
    expression.pop();
    
    while( !expression.isEmpty() ) {
        if( Regex.number.test( expression.peek().get() ) ) {
            Regex.number.lastIndex = 0;
            OperandsStack.insert( expression.peek().get() );
        }
        else {
            if( Regex.function.test( expression.peek().get() ) ) {
                Regex.function.lastIndex = 0;
                let ope1 = OperandsStack.peek().get();
                OperandsStack.pop();
                if( expression.peek().get() == "sin" ) {
                    OperandsStack.insert( Math.sin( parseFloat( ope1 ) ) ); 
                }
                else if ( expression.peek().get() == "cos" ) {
                    OperandsStack.insert( Math.cos( parseFloat( ope1 ) ) );
                }
                else if ( expression.peek().get() == "tan" ) {
                    OperandsStack.insert( Math.tan( parseFloat( ope1 ) ) )
                }
                else if ( expression.peek().get() == "atan" ) {
                    OperandsStack.insert( Math.atan( parseFloat( ope1 ) ) );
                }
                else if ( expression.peek().get() == "acos" ) {
                    OperandsStack.insert( Math.acos( parseFloat( ope1 ) ) )
                }
                else if ( expression.peek().get() == "asin" ) {
                    OperandsStack.insert( Math.asin( parseFloat( ope1 ) ) )
                }
                else {
                    throw new Error("Unknown function");
                }
            }
            else if( Regex.operator.test( expression.peek().get() ) ){
                Regex.operator.lastIndex = 0;
                let ope1 = OperandsStack.peek().get();
                OperandsStack.pop();
                if(OperandsStack.peek() == null) throw new Error("Wrong Operands number")
                let ope2 = OperandsStack.peek().get();
                OperandsStack.pop();

                if( expression.peek().get() == "-" ){
                    OperandsStack.insert( parseFloat( ope2 ) - parseFloat( ope1 ) );
                }
                else if( expression.peek().get() == "+" ){
                    OperandsStack.insert( parseFloat( ope2 ) + parseFloat( ope1 ) );
                }
                else if( expression.peek().get() == "/" ){
                    OperandsStack.insert( parseFloat( ope2 ) / parseFloat( ope1 ) );
                }
                else if( expression.peek().get() == "*" ){
                    OperandsStack.insert( parseFloat( ope2 ) * parseFloat( ope1 ) );
                }
                else if( expression.peek().get() == "^" ){
                    OperandsStack.insert( Math.pow( parseFloat( ope2 ) , parseFloat( ope1 ) ) );
                }
                else {
                    throw new Error("Unknown Operator");
                }
            }
        }
        expression.pop();
    }

    return OperandsStack.peek().get();
}

const precedence = {
    "^": 4, 
    "*": 3, 
    "/": 3, 
    "+": 2, 
    "-": 2
};

const associativity = {
    "^": "Right",
    "*": "Left", 
    "/": "Left", 
    "+": "Left", 
    "-": "Left"
};

export default {
    CalculPostfixExpression,
    ShuntingYardAlgorithm,
}