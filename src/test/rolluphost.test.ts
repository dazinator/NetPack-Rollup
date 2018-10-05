import rollupHost from "../rolluphost";
import RollupInputOptions from "../RollupFileOptions";
import RollupOutputOptions from "../RollupOutputOptions";
import hypothetical = require("rollup-plugin-hypothetical")
import * as fs from "fs";
import { fail } from "assert";


describe("NetpackRollupHost", () => {

    describe("Bundling", () => {
        
        it("bundles multiple in memory files to single file", () => {

           // Arrange
            var classAFileContents = fs.readFileSync('testFiles/ModuleA/classa.js', "utf-8");
            var classBFileContents = fs.readFileSync('testFiles/ModuleB/classb.js', "utf-8");        

            //var webRoot = "testFiles";
            var filePathA = "/ModuleA/ClassA";
            var filePathB = "/ModuleB/ClassB";       

            var files = {

            };
            files[filePathA] = classAFileContents;
            files[filePathB] = classBFileContents;          

            var inputOptions = new RollupInputOptions();
            inputOptions.entry = "/ModuleB/ClassB";

            var hypotheticalPlugin = hypothetical({
                files: files
            });

            hypotheticalPlugin.cwd = false;
            inputOptions.plugins = [hypotheticalPlugin];                
                  
            var outputOptions = new RollupOutputOptions();
            outputOptions.format = "esm";
            let sut = new rollupHost();
            sut.build(inputOptions, outputOptions).then(result=>{
              var code =  result.Code;
              var sourceMap = result.SourceMap;           

            }).catch((reason)=>{
                fail("error " + reason)
            });                         
        });      
        
    });
});