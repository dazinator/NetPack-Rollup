"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prettyBytes = require("pretty-bytes");
const turbocolor_1 = require("turbocolor");
function printTimings(timings) {
    Object.keys(timings).forEach(label => {
        const color = label[0] === '#' ? (label[1] !== '#' ? turbocolor_1.underline : turbocolor_1.bold) : (text) => text;
        const [time, memory, total] = timings[label];
        const row = `${label}: ${time.toFixed(0)}ms, ${prettyBytes(memory)} / ${prettyBytes(total)}`;
        console.info(color(row));
    });
}
exports.printTimings = printTimings;
//# sourceMappingURL=timings.js.map