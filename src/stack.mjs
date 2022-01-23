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

export default {
    Stack,
    Node,
}