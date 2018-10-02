"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rolluphost_1 = require("../rolluphost");
const RollupFileOptions_1 = require("../RollupFileOptions");
const RollupOutputOptions_1 = require("../RollupOutputOptions");
const fs = require("fs");
// var describe = mocha.describe;
//var it = mocha.it;
describe("NetpackRollupHost", () => {
    describe("Bundling", () => {
        it("bundles multiple in memory files to single file", () => {
            // Arrange
            var classAFileContents = fs.readFileSync('testFiles/moduleA/classa.ts', "utf-8");
            var classBFileContents = fs.readFileSync('testFiles/moduleB/classb.ts', "utf-8");
            // var args = '--module Amd -t es5 --outFile test.js --inlineSourceMap --traceResolution ';
            var webRoot = "testFiles";
            var filePathA = webRoot + "/ModuleA/ClassA.ts";
            var filePathB = webRoot + "/ModuleB/ClassB.ts";
            var files = {};
            files[filePathA] = classAFileContents;
            files[filePathB] = classBFileContents;
            var compileErrors = [];
            var errorHandler = function (err) {
                compileErrors.push(err);
            };
            var inputOptions = new RollupFileOptions_1.default();
            var outputOptions = new RollupOutputOptions_1.default();
            let sut = new rolluphost_1.default();
            sut.build(inputOptions, outputOptions);
            // expect(result.errors.length).to.equal(0);
            // expect(result.sources["test.js"]).is.not.undefined;
        });
    });
});
//# sourceMappingURL=rolluphost.test.js.map