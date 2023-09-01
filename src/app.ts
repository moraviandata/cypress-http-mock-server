import express, { Application, Request, Response } from 'express';
import { RESET_PATH, REGISTER_PATH } from './constants';
import { parse } from 'path';

const app: Application = express();
app.use(express.json())

const _storage = new Map<string, HttpMockServerResponse>()
app.set('storage', _storage)

interface HttpMockServerRequestArgs {
    method: string,
    path: string,
}

class HttpMockServerRequest {
    method: string;
    path: string;

    private static methods: Array<string> = [
        "GET",
        "POST",
        "PUT",
        "HEAD",
        "OPTIONS",
        "DELETE",
    ]

    private methodToNumber(method: string): number | undefined {
        let index = HttpMockServerRequest.methods.indexOf(method)
        if (index === -1) {
            return undefined
        }
        return index
    }

    constructor({ method, path }: HttpMockServerRequestArgs) {
        this.method = method;
        this.path = path;
    }

    convertToString(): string {
        return this.methodToNumber(this.method) + this.path
    }

    static fromString(input: string): HttpMockServerRequest {
        return new HttpMockServerRequest({
            method: HttpMockServerRequest.methods[parseInt(input[0])],
            path: input.slice(1)
        })
    }
}

interface HttpMockServerResponse {
    statusCode: number,
    body: string,
    headers: Map<string, string>,
}

interface RegisterApiRequest {
    path: string,
    method?: string,
    statusCode?: number,
    body?: string,
    headers?: Map<string, string>
}

app.post(RESET_PATH, (req: Request, res: Response) => {
    let storage: Map<string, HttpMockServerResponse> = req.app.get('storage')
    storage.clear()
    console.log("reseting mocked routes\n")
    res.status(200).send()
})

app.post(REGISTER_PATH, (req: Request<{}, {}, RegisterApiRequest>, res: Response) => {
    const parsedBody: RegisterApiRequest = req.body

    let storage: Map<string, HttpMockServerResponse> = req.app.get('storage')

    const request : HttpMockServerRequest = new HttpMockServerRequest({
        method: parsedBody.method ?? "GET",
        path: parsedBody.path,
    })


    const response: HttpMockServerResponse = {
        body: parsedBody.body ?? "",
        headers: parsedBody.headers ?? new Map<string, string>(),
        statusCode: parsedBody.statusCode ?? 200,
    }

    storage.set(request.convertToString(), response)
    console.log(`Registered mocked response: method: ${request.method}, path: ${request.path}`)
    res.status(200).send()
})

app.all('*', (req: Request, res: Response) => {
    const request: HttpMockServerRequest = new HttpMockServerRequest({
        method: req.method,
        path: req.path
    })

    let storage: Map<string, HttpMockServerResponse> = req.app.get('storage')

    let storedResponse: HttpMockServerResponse | undefined = storage.get(request.convertToString())

    if (storedResponse === undefined) {
        res.status(404).send()
        return
    } else {
        // set response headers
        storedResponse.headers.forEach((value, key) => {
            res.header(key, value)
        });

        res.status(storedResponse.statusCode).send(storedResponse.body)
    }
});

export default app
export { RegisterApiRequest, HttpMockServerRequest }
