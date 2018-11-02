import {ClassA} from "../ModuleA/ClassA";


export class ClassB {
    constructor(another) { }
    doSomething() {
         return "fooo";
    }
};

var classB = new ClassB("Hello, world!");
classB.doSomething();

var classA = new ClassA("Hello, world!");
classA.doSomething();