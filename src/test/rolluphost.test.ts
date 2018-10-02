import rollupHost from "../rolluphost";
import RollupInputOptions from "../RollupFileOptions";
import RollupOutputOptions from "../RollupOutputOptions";


import * as fs from "fs";
import * as mocha from "mocha";
import { expect } from 'chai';

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

            var files = {

            };
            files[filePathA] = classAFileContents;
            files[filePathB] = classBFileContents;

            var compileErrors = [];
            var errorHandler = function (err) {
                compileErrors.push(err);
            };

            var inputOptions = new RollupInputOptions();
            var outputOptions = new RollupOutputOptions();


            let sut = new rollupHost();
            sut.build(inputOptions, outputOptions);         
                  
         
        
            // expect(result.errors.length).to.equal(0);
            // expect(result.sources["test.js"]).is.not.undefined;
           
        });      

        
    });
});