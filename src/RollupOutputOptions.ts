import rollup = require('rollup');
import { OutputOptionsDir, OutputOptions, ModuleFormat } from "rollup";

export default class RollupOutputOptions implements OutputOptions
{    
    file?: string;
    format?: ModuleFormat;
    sourcemap?: boolean | 'inline';
    globals?:rollup.GlobalsOption;
    paths?: rollup.OptionsPaths;    
}

export class RollupOutputOptionsDir implements OutputOptionsDir
{    
    format?: ModuleFormat;
    sourcemap?: boolean | 'inline';
    globals?:rollup.GlobalsOption;
    paths?: rollup.OptionsPaths;
    dir?: string;
}