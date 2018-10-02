"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rollup = require("rollup");
class RollupHost {
    build(inputOptions, outputOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            // create a bundle
            const bundle = yield rollup.rollup(inputOptions);
            console.log(bundle.imports); // an array of external dependencies
            console.log(bundle.exports); // an array of names exported by the entry point
            console.log(bundle.modules); // an array of module objects
            // generate code and a sourcemap
            const { code, map } = yield bundle.generate(outputOptions);
            // or write the bundle to disk
            yield bundle.write(outputOptions);
        });
    }
}
exports.default = RollupHost;
//# sourceMappingURL=rolluphost.js.map