import {ClassA} from "../ModuleA/ClassA";


export class ClassB {
    constructor(another) { }
    doSomething() {
        // return ""<h1>"" + this.greeting + ""</h1>"";
    }
};

var classB = new ClassB("Hello, world!");
classB.doSomething();

var classA = new ClassA("Hello, world!");
classA.doSomething();