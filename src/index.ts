import { parse } from 'ts-command-line-args';
import yargs from 'yargs/yargs'
import app from "./app"

const DEFAULT_PORT : number = 3000;

interface IArguments {
    port?: number,
    help?: boolean
}


function main(){
    let args : IArguments
    
    try{
        args = parse<IArguments>(
            {
                port: { type: Number, optional: true, alias: 'p'},
                help: { type: Boolean, optional: true, alias: 'h', description: 'Prints this usage guide', defaultValue: false},
            },
            {
                helpArg: 'help',
                headerContentSections: [{ 
                    header: 'cypress-http-mock-server', 
                    content: 'This is a simple application that runs a http mock server, useful for testing SSR fetches in frameworks like Next.js wit cypress.' 
                }],
                footerContentSections: [{ header: '', content: `Copyright: moraviandata s.r.o.` }],
            },
        )
    }catch(e){
        console.log("Could not parse command line arguments. Run with -h to view the manual.")
        return
    }
    
    const port : number = args.port ?? DEFAULT_PORT
    
    app.listen(port, ()=> console.log('Started successfuly on port ' + port.toString()))
}

main()
