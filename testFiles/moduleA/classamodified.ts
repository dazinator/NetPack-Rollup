export class ClassA {
    constructor(public another: string) { }
    doSomething() {
         return "<h1>foo</h1>";
    }
}

var classA = new ClassA("Hello, world!");
classA.doSomething();

