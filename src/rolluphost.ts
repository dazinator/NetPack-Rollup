import rollup = require('rollup');


export interface RollupResult
{
    Code: string;
    SourceMap: rollup.SourceMap
}

export default class RollupHost
{
    public async build(inputOptions: rollup.RollupFileOptions, outputOptions: rollup.OutputOptions) : Promise<RollupResult>
     {

        // create a bundle
        const bundle = await rollup.rollup(inputOptions);
  
        console.log(bundle.imports); // an array of external dependencies
        console.log(bundle.exports); // an array of names exported by the entry point
        console.log(bundle.modules); // an array of module objects

        // generate code and a sourcemap
        try 
        {
            const { code, map } = await bundle.generate(outputOptions);
           // var result = new RollupResult();
            return {Code: code, SourceMap:map }
        }
        catch(e) {
            console.log(e); // 30
          }
      

        // or write the bundle to disk
        // await bundle.write(outputOptions);
     }
}

   
