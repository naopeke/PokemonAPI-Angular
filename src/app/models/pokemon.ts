export class Pokemon {
    constructor(
        public id: number, 
        public image: string,
        public name: string,
        public types: string[],
        public abilities: string[],
        public sprites?: {front_default: string}){}
}
