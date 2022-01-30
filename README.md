# calculator-bot-discord

This project allows you to have your own discord bot which can solve maths calculs.

## How to use it

To use this project you will need to add an .env file with your bot Token. If you don't want to modify the code, just use the name : `CLIENT_TOKEN`.
Then you will need to add the bot to your server. etc... (all the discord stuff to add a bot can be found on [discord/developers](https://discord.com/developers/) page.

## Commands

To call the bot you have the `!=` command. The bot will then calcul the line of calcul and send back a embed message with the calcul as input and the result as output. After calling the command you need to write the infix expressions to evaluate.

## Function 

There are multiple functions that are taken in charge :

| Function |
| :---: |
| sin |
| cos | 
| tan | 
| acos | 
| asin | 
| atan |

| Operator | Priority |
| --- | :---: |
| + | 2 |
| - | 2 | 
| * | 3 |
| / | 3 | 
| ^ | 4 | 
| ( | 4 |
| ) | 4 |
| function | 4 |

## Algorithm

The whole project repose on the [Shunting Yard](https://en.wikipedia.org/wiki/Shunting-yard_algorithm) algorithm :

```c
/* This implementation does not implement composite functions, functions with variable number of arguments, and unary operators. */

while there are tokens to be read:
    read a token
    if the token is:
    - a number:
        put it into the output queue
    - a function:
        push it onto the operator stack 
    - an operator o1:
        while (
            there is an operator o2 other than the left parenthesis at the top
            of the operator stack, and (o2 has greater precedence than o1
            or they have the same precedence and o1 is left-associative)
        ):
            pop o2 from the operator stack into the output queue
        push o1 onto the operator stack
    - a left parenthesis (i.e. "("):
        push it onto the operator stack
    - a right parenthesis (i.e. ")"):
        while the operator at the top of the operator stack is not a left parenthesis:
            {assert the operator stack is not empty}
            /* If the stack runs out without finding a left parenthesis, then there are mismatched parentheses. */
            pop the operator from the operator stack into the output queue
        {assert there is a left parenthesis at the top of the operator stack}
        pop the left parenthesis from the operator stack and discard it
        if there is a function token at the top of the operator stack, then:
            pop the function from the operator stack into the output queue
/* After the while loop, pop the remaining items from the operator stack into the output queue. */
while there are tokens on the operator stack:
    /* If the operator token on the top of the stack is a parenthesis, then there are mismatched parentheses. */
    {assert the operator on top of the stack is not a (left) parenthesis}
    pop the operator from the operator stack onto the output queue
```
This algorithm allows us to transform an infix expression into a postfix expression.

you can find more information about those two type of expression at :
- [Infix Expression](https://en.wikipedia.org/wiki/Infix_notation)
- [Postfix Expression](https://en.wikipedia.org/wiki/Reverse_Polish_notation)

In resume, postfix expression are easier to interprete for a computer.

So the algorithm has become the code : 
```javascript
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
```
It use regex to tokenize the string. Then it reuse the same regex to analyze each token and create two stack : 
- Operator stack where are kept all the functions and operators.
- Output stack where we will store our suffix expression

## Stack Class

In this project, a stack is use to comply with the algorithm. The stack use an other class Node.
```javascript
class Stack {
    constructor(data) {
        try {
            if(data) {
                this.node = new Node(data);
                this.top = this.node;
            } 
            else {
                this.node = new Node(null);
                this.top = this.node;
            }
        } 
        catch (e) {
            console.log(e);
        }
    }

    insert(data) {
        let newNode = new Node(data);
        newNode.next = this.top;
        this.top = newNode;
    }

    print() {
        let temp = this.top;
        if(temp === null) {
            console.log("The stack is empty");
        }
        else {
            while(temp !== null) {
                temp.print();
                temp = temp.next
            }
        }
    }

    peek() {
        if(this.top === null) {
            console.log("The stack is empty");
        }
        else {
            return this.top;
        }
    }

    pop() {
        if(this.top === null) {
            console.log("The stack is empty");
        }
        else {
            this.top = this.top.next;
        }
    }

    get() {
        return this.node;
    }

    invert() {
        let temp = new Stack(this.peek().get());
        this.pop();
        while(this.peek() != null) {
            temp.insert(this.peek().get());
            this.pop();
        }
        return temp;     
    }

    isEmpty() {
        if(this.top == null) return true;
        else return false
    }
}

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }

    print() {
        if(this.data !== null) {
            console.log(this.data);
        }
    }

    get() {
        return this.data;
    }
}
```
But you can always change those class to be a simple array wich act as a stack.
