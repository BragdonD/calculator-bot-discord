# calculator-bot-discord

This project allows you to have your own discord bot which can solve maths calculs.

## Dependancies 

- Discord.js v3

## How to use it

To use this project you will need to add an .env file with your bot Token. If you don't want to modify the code, just use the name : `CLIENT_TOKEN`.
Then you will need to add the bot to your server. etc... (all the discord stuff to add a bot can be found on [discord/developers](https://discord.com/developers/) page.

## Commands

To call the bot you have the `!=` command. The bot will then calcul the line of calcul and send back a embed message with the calcul as input and the result as output. After calling the command you need to write the infix expressions to evaluate.

## Functions

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
