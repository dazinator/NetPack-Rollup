"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rolluphost_1 = require("../rolluphost");
const RollupFileOptions_1 = require("../RollupFileOptions");
const RollupOutputOptions_1 = require("../RollupOutputOptions");
const hypothetical = require("rollup-plugin-hypothetical");
const fs = require("fs");
const assert_1 = require("assert");
describe("NetpackRollupHost", () => {
    describe("Bundling", () => {
        it("bundles multiple in memory files to single file", () => {
            // Arrange
            var classAFileContents = fs.readFileSync('testFiles/ModuleA/classa.js', "utf-8");
            var classBFileContents = fs.readFileSync('testFiles/ModuleB/classb.js', "utf-8");
            //var webRoot = "testFiles";
            var filePathA = "/ModuleA/ClassA";
            var filePathB = "/ModuleB/ClassB";
            var files = {};
            files[filePathA] = classAFileContents;
            files[filePathB] = classBFileContents;
            var inputOptions = new RollupFileOptions_1.default();
            inputOptions.entry = "/ModuleB/ClassB";
            var hypotheticalPlugin = hypothetical({
                files: files
            });
            hypotheticalPlugin.cwd = false;
            inputOptions.plugins = [hypotheticalPlugin];
            var outputOptions = new RollupOutputOptions_1.default();
            outputOptions.format = "esm";
            let sut = new rolluphost_1.default();
            sut.build(inputOptions, outputOptions).then(result => {
                var code = result.Code;
                var sourceMap = result.SourceMap;
            }).catch((reason) => {
                assert_1.fail("error " + reason);
            });
        });
    });
});
//# sourceMappingURL=rolluphost.test.js.map