import * as http from 'http';

const RESET_PATH : string = '/0a90182c2db12285722aa9bb2fce72a16bca6c28'

interface HttpMockServerRequest{
    method?: string,
    path: string,
}

interface HttpMockServerResponse{
    statusCode?: number,
    body?: string,
    headers?: Map<string, string>,
}

class HttpMockServer{
    constructor(){

    }

    startServer(port : number = 3000) : void {
        const hostname : string = '0.0.0.0';

        const server : http.Server = http.createServer((req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Hello, this is your simple TypeScript HTTP server!\n');
          });
    
        server.listen(port, () => {
            console.log(`Cypress-http-mock-server is listening on ${hostname}:${port}.`)
        })
    }
}

// runs in browser ??
function mockHttpApi(matcher : HttpMockServerRequest, response : HttpMockServerResponse, port : number = 3000) : void {
    //TODO implement this
    // fetch("www.example.com")
}

// runs in browser ??
function resetMockHttpApi(port : number = 3000){
    //TODO implement this
    // fetch("www.example.com")
}

/// call this function in your cypress.config.ts file to start the mock http server

// server should:
//   have its local database (could be a hashtable) {METHOD, URL} -> {}

// API
//   start function
//      hostname
//      port
//   /0a90182c2db12285722aa9bb2fce72a16bca6c28 - reset -- cypress custom task cy.mockHttpReset
//   /63b87237ef9f2f8ec7fc3a989285ccadb4cd72c3 - add endpoint -- cypress custom task cy.mockHttpApi
//   add endpoint object:
//   {
//      method:
//      path:
//      status:
//      body:
//      headers: map<string, string>
//   }
//

export { HttpMockServer, mockHttpApi, resetMockHttpApi }
