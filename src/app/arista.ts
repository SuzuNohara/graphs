export interface aristaInterface{
    width: number,
    height: number,
    angle: number,
    top: number,
    left: number,
    border: number,
    bgcolor: string,
    value: number,
    relacion: string[],
    font: number
}

export class Arista implements aristaInterface{
    width: number;
    height: number;
    angle: number;
    top: number;
    left: number;
    border: number;
    bgcolor: string;
    value: number;
    relacion: string[];
    font: number;

    constructor(){
        this.width = 0;
        this.height = 0;
        this.angle = 0;
        this.top = 0;
        this.left = 0;
        this.border = 0;
        this.bgcolor = '#000';
        this.value = 0;
        this.relacion = [];
        this.font = 0;
    }
}