import rollup = require('rollup');
import { OutputOptionsDir, OutputOptions, ModuleFormat } from "rollup";

export default class RollupOutputOptions implements OutputOptions
{    
    format?: ModuleFormat;
    sourcemap?: boolean | 'inline';
    globals?:rollup.GlobalsOption;
}

export class RollupOutputOptionsDir implements OutputOptionsDir
{    
    format?: ModuleFormat;
    sourcemap?: boolean | 'inline';
    globals?:rollup.GlobalsOption;
}