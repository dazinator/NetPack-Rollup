import rollup = require('rollup');
import { OutputOptionsDir, OutputOptions, ModuleFormat } from "rollup";

export default class RollupOutputOptions implements OutputOptions
{    
    format?: ModuleFormat;
}

export class RollupOutputOptionsDir implements OutputOptionsDir
{    
    format?: ModuleFormat;
    sourcemap?: boolean | 'inline';
}