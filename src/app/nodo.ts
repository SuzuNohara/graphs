export interface nodoInterface{
    size: number,
    radius: number,
    top: number,
    left: number,
    border: number,
    bgcolor: string,
    value: string,
    font: number,
    padding: number,
    relaciones: number[],
    relval: number[],
    posicion: number,
    visitado: boolean,
    opacidad: number
}

export class Nodo implements nodoInterface{
    size: number;
    radius: number;
    top: number;
    left: number;
    border: number;
    bgcolor: string;
    value: string;
    font: number;
    padding: number;
    relaciones: number[];
    relval: number[];
    posicion: number;
    visitado: boolean;
    opacidad: number;

    constructor(){
        this.size = 0;
        this.radius = 0;
        this.top = 0;
        this.left = 0;
        this.border = 0;
        this.bgcolor = '#000';
        this.value = '-';
        this.font = 0;
        this.padding = 0;
        this.relaciones = [];
        this.relval = []; 
        this.posicion = 0;
        this.visitado = false;
        this.opacidad = 1;
    }
}