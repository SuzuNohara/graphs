import { Component } from '@angular/core';
import { Nodo } from './nodo';
import { Arista } from './arista';
import { environment } from '../environments/environment'
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  nodos: Nodo[];
  aristas: Arista[];
  log: string;
  NNodos: number;
  algoritmo: string;
  accion:string;
  velocidad: number;

  constructor(){
    this.NNodos = 3;
    this.nodos = [];
    this.aristas = [];
    this.log = "";
    this.algoritmo = "prim";
    this.accion = "Generar";
    this.velocidad = 1000;
  }

  generar(){
    this.log = "";
    if(this.nodos.length > 0 || this.aristas.length > 0){
      this.nodos = [];
      this.aristas = [];
    }
    let nodo: Nodo = new Nodo();
    let arista: Arista = new Arista();
    this.nodos = [];
    this.aristas = [];
    this.accion = "Resolver";
    if(this.NNodos <= 2){
      alert("El numero de nodos no puede ser menor o igual a 2");
    }else{
      for(let i = 0; i < this.NNodos; i++){
        nodo.size = 3;
        nodo.radius = nodo.size / 2;
        nodo.bgcolor = '#000';
        nodo.top = (3) * (Math.random() * this.NNodos) + 5;
        nodo.left = (6) * (Math.random() * this.NNodos);
        nodo.border = 0.25;
        nodo.value = environment.chars[i];
        nodo.font = 1;
        nodo.padding = 0.5;
        nodo.posicion = i;
        this.nodos.push(nodo);
        nodo = new Nodo();
      }
      for(let i = 0; i < this.nodos.length; i++){
        for(let j = i + 1; j < this.nodos.length; j++){
          if(Math.floor(Math.random() * Math.floor(this.NNodos / 3)) == Math.floor(this.NNodos / 3) - 1 || this.nodos[i].relaciones.length == 0){
            this.nodos[i].relaciones.push(this.nodos[j].posicion);
            this.nodos[j].relaciones.push(this.nodos[i].posicion);
            arista.relacion.push(this.nodos[i].posicion);
            arista.relacion.push(this.nodos[j].posicion);
            arista.width = Math.sqrt(Math.pow(this.nodos[j].top - this.nodos[i].top, 2) + Math.pow(this.nodos[j].left - this.nodos[i].left,2));
            arista.height = 0.3;
            arista.angle = ((Math.atan((this.nodos[j].top - this.nodos[i].top) / (this.nodos[j].left - this.nodos[i].left))) * 180) / Math.PI;
            if(this.nodos[j].top < this.nodos[i].top && this.nodos[j].left > this.nodos[i].left){
              arista.top = this.nodos[i].top + this.nodos[i].size / 2;
              arista.left = this.nodos[i].left + this.nodos[i].size / 2;
            }else if(this.nodos[j].top > this.nodos[i].top && this.nodos[j].left > this.nodos[i].left){
              arista.top = this.nodos[i].top + this.nodos[i].size / 2;
              arista.left = this.nodos[i].left + this.nodos[i].size / 2;
            }else if(this.nodos[j].top > this.nodos[i].top && this.nodos[j].left > this.nodos[i].left){
              arista.top = this.nodos[i].top + this.nodos[i].size / 2;
              arista.left = this.nodos[i].left + this.nodos[i].size / 2;
            }else if(this.nodos[j].top < this.nodos[i].top && this.nodos[j].left < this.nodos[i].left){
              arista.top = this.nodos[j].top + this.nodos[i].size / 2;
              arista.left = this.nodos[j].left + this.nodos[i].size / 2;
            }else if(this.nodos[j].top > this.nodos[i].top && this.nodos[j].left < this.nodos[i].left){
              arista.top = this.nodos[j].top + this.nodos[i].size / 2;
              arista.left = this.nodos[j].left + this.nodos[i].size / 2;
            }else if(this.nodos[i].top == this.nodos[j].top && this.nodos[i].left < this.nodos[j].left){
              arista.top = this.nodos[i].top + this.nodos[i].size / 2;
              arista.left = this.nodos[i].left + this.nodos[i].size / 2;
            }else if(this.nodos[i].top == this.nodos[j].top && this.nodos[i].left > this.nodos[j].left){
              arista.top = this.nodos[i].top + this.nodos[i].size / 2;
              arista.left = this.nodos[j].left + this.nodos[i].size / 2;
            }
            arista.border = 0.02;
            arista.bgcolor = 'rgb(0,0,0,0.5)';
            arista.value = Math.floor((Math.random() * 50)) + 1;
            this.nodos[i].relval.push(arista.value);
            this.nodos[j].relval.push(arista.value);
            arista.font = 1;
            this.aristas.push(arista);
            arista = new Arista();
          }
        }
      }
    }
    for(let i = 0; i < this.aristas.length; i++){
      this.aristas[i].posicion = i;
    }
  }

  async resolver(){
    if(this.nodos.length == 0 || this.aristas.length == 0){
      alert("No hay diagrama que resolver");
    }else{
      if(this.algoritmo == "prim"){
        this.prim();
      }else{
        this.kruskal();
      }
    }
  }


  async prim(){
    let arista: number;
    this.nodos[0].visitado = true;
    while(!this.resuelto()){
      arista = this.minAristaConnected();
      this.aristas[arista].bgcolor = 'rgb(32,194,14,0.5)';
      this.aristas[arista].final = 2;
      this.nodos[this.aristas[arista].relacion[0]].visitado = true;
      this.nodos[this.aristas[arista].relacion[1]].visitado = true;
      this.log = "<p>Rama minima encontrada: " + this.nodos[this.aristas[arista].relacion[0]].value + " - " + this.nodos[this.aristas[arista].relacion[1]].value + "; valor: " + this.aristas[arista].value + "</p>" + this.log;
      await this.delay(this.velocidad);
    }
    this.log = "<h3>Arbol mínimo encontrado. Peso = " + this.pesoArbol() + "</h3>" + this.log;
  }

  minAristaConnected(): number{
    let retorno: number;
    let menor: number = 0;
    for(let i: number = 0; i < this.aristas.length; i++){
      if(this.aristas[i].final == 0){
        if(this.nodos[this.aristas[i].relacion[0]].visitado && !this.nodos[this.aristas[i].relacion[1]].visitado || this.nodos[this.aristas[i].relacion[1]].visitado && !this.nodos[this.aristas[i].relacion[0]].visitado){
          if(menor == 0){
            menor = this.aristas[i].value;
            retorno = i;
          }else if(this.aristas[i].value < menor){
            menor = this.aristas[i].value;
            retorno = i;
          }
        }
      }
    }
    return retorno;
  }

  pesoArbol(): number{
    let retorno: number = 0;
    for(let i = 0; i < this.aristas.length; i++){
      retorno += this.aristas[i].final == 2? this.aristas[i].value: 0;
    }
    return retorno;
  }

  async kruskal(){
    let arista: number;
    let menor: number = 0;
    let posicion: number;
    while(!this.resueltoK()){
      menor = 0;
      posicion = 0;
      for(let i = 0; i < this.aristas.length; i++){
        if(menor == 0 && this.aristas[i].final == 0){
          menor = this.aristas[i].value;
          posicion = this.aristas[i].posicion;
        }else if(menor > this.aristas[i].value && this.aristas[i].final == 0){
          menor = this.aristas[i].value;
          posicion = this.aristas[i].posicion;
        }
      }
      this.log = "<p>Arista menor encontrada en " + this.aristas[posicion].relacion[0] + " - " + this.aristas[posicion].relacion[0] + "; valor = " + this.aristas[posicion].value + "</p>" + this.log;
      this.aristas[posicion].bgcolor = 'rgb(32,194,14,0.5)';
      this.aristas[posicion].final = 2;
      await this.delay(this.velocidad);
      if(this.bucles()){
        this.log = "<p>La arista " + this.aristas[posicion].relacion[0] + " - " + this.aristas[posicion].relacion[0] + " genera bucles, eliminando...</p>" + this.log;
        this.aristas[posicion].bgcolor = 'rgb(0,0,0,0.5)';
        this.aristas[posicion].final = 1;
        await this.delay(this.velocidad);
      }
    }
  }

  resueltoK(){
    let retorno: boolean = true;
    if(this.bucles()){
      retorno = false;
    }else{
      if(this.recorridoK([], 0) == this.nodos.length){
        retorno = true;
      }else{
        retorno = false;
      }
    }
    return retorno;
  }

  bucles(): boolean{
    let retorno: boolean = false;
    for(let i: number = 0; i < this.nodos.length; i++){
      retorno = retorno || this.buc([], this.nodos[i].posicion);
    }
    return retorno;
  }

  buc(anteriores: number[], actual: number): boolean{
    let retorno: boolean = false;
    for(let ant of anteriores){
      retorno =  retorno || ant == actual;
    }
    if(!retorno){
      for(let i = 0; i < this.aristas.length; i++){
        if((this.aristas[i].relacion[0] == actual || this.aristas[i].relacion[1] == actual)){
          if(anteriores.length == 0 || (this.aristas[i].relacion[0] != anteriores[anteriores.length - 1] && this.aristas[i].relacion[1] != anteriores[anteriores.length - 1])){
            if(this.aristas[i].final == 2){
              anteriores.push(actual);
              retorno = retorno || this.buc(anteriores, this.aristas[i].relacion[0] == actual ? this.aristas[i].relacion[1]: this.aristas[i].relacion[0]);
            }
          }
        }
      }
    }
    return retorno;
  }

  recorridoK(anteriores: number[], actual): number{
    let sum: number = 1;
    for(let i = 0; i < this.aristas.length; i++){
      if((this.aristas[i].relacion[0] == actual || this.aristas[i].relacion[1] == actual)){
        if(anteriores.length == 0 || (this.aristas[i].relacion[0] != anteriores[anteriores.length - 1] && this.aristas[i].relacion[1] != anteriores[anteriores.length - 1])){
          if(this.aristas[i].final == 2){
            anteriores.push(actual);
            sum += this.recorridoK(anteriores, this.aristas[i].relacion[0] == actual ? this.aristas[i].relacion[1]: this.aristas[i].relacion[0]);
          }
        }
      }
    }
    return sum;
  }

  resuelto(): boolean{
    let retorno: boolean = true;
    for(let i = 0; i < this.nodos.length; i++){
      retorno = retorno && this.nodos[i].visitado;
    }
    return retorno;
  }

  minimaArista(): number{
    let retorno: number;
    return retorno;
  }

  comprobarCiclos(): boolean{
    let retorno: boolean = true;
    return retorno;
  }

  blurAll(posicion: number){
    for(let i = 0; i < this.nodos.length; i++){
      if(i != posicion){
        this.nodos[i].opacidad = 0.2;
      }
    }
    for(let i = 0; i < this.aristas.length; i++){
      if(this.aristas[i].relacion[0] != posicion && this.aristas[i].relacion[1] != posicion){
        this.aristas[i].opacidad = 0.1;
      }
    }
  }

  blurDiagram(){
    if(this.log != ""){
      for(let i = 0; i < this.nodos.length; i++){
        this.nodos[i].opacidad = 0.1;
      }
      for(let i = 0; i < this.aristas.length; i++){
        this.aristas[i].opacidad = 0.1;
      }
    }
  }

  restoreAll(){
    for(let i = 0; i < this.nodos.length; i++){
      this.nodos[i].opacidad = 1;
    }
    for(let i = 0; i < this.aristas.length; i++){
      this.aristas[i].opacidad = 1;
    }
  }

  private delay(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}