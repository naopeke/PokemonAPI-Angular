import { Pokemon } from "./pokemon";

export class Response
{
    constructor(public error: boolean, 
                public codigo: number,
                public message: string,
                public data: Pokemon[]){}
}

