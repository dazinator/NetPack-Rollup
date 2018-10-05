import rollup = require('rollup');
import { OutputOptions, ModuleFormat } from "rollup";

export default class RollupOutputOptions implements OutputOptions
{    
    format?: ModuleFormat;

}