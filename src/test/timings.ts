import prettyBytes = require('pretty-bytes');
import { underline, bold } from 'turbocolor';
import { SerializedTimings } from 'rollup'; 

export function printTimings(timings: SerializedTimings) {
	Object.keys(timings).forEach(label => {
		const color =
			label[0] === '#' ? (label[1] !== '#' ? underline : bold) : (text: string) => text;
		const [time, memory, total] = timings[label];
		const row = `${label}: ${time.toFixed(0)}ms, ${prettyBytes(memory)} / ${prettyBytes(total)}`;
		console.info(color(row));
	});
}