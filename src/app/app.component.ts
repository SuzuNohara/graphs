import { Component } from '@angular/core';
import { Nodo } from './nodo';
import { Arista } from './arista';
import { environment } from '../environments/environment'
import * as $ from 'jquery';
import { formatNumber } from '@angular/common';

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

  constructor(){
    this.NNodos = 3;
    this.nodos = [];
    this.aristas = [];
    this.log = "<h4>Acciones:</h4>";
    this.algoritmo = "prim";
  }

  generar(){
    let nodo: Nodo = new Nodo();
    let arista: Arista = new Arista();
    this.nodos = [];
    this.aristas = [];
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
        this.nodos.push(nodo);
        nodo = new Nodo();
      }
      for(let i = 0; i < this.nodos.length; i++){
        for(let j = i + 1; j < this.nodos.length; j++){
          if(Math.floor(Math.random() * Math.floor(this.NNodos / 3)) == Math.floor(this.NNodos / 3) - 1){
            this.nodos[i].relaciones.push(this.nodos[j].value);
            arista.relacion.push(this.nodos[i].value);
            arista.relacion.push(this.nodos[j].value);
            arista.width = Math.sqrt(Math.pow(this.nodos[j].top - this.nodos[i].top, 2) + Math.pow(this.nodos[j].left - this.nodos[i].left,2));
            arista.height = 0.3;
            arista.angle = ((Math.atan((this.nodos[j].top - this.nodos[i].top) / (this.nodos[j].left - this.nodos[i].left))) * 180) / Math.PI;
            // direccionamiento sobre nodo origen
            //arista.top = this.nodos[i].top < this.nodos[j].top ? this.nodos[i].top: this.nodos[j].top;
            //arista.left = this.nodos[i].left < this.nodos[j].left ? this.nodos[i].left: this.nodos[j].left;
            // direccionamiento sobre centro de nodos
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
            // direccionamiento sobre nodo destino
            //arista.top = this.nodos[j].top + this.nodos[j].size / 2;
            //arista.left = this.nodos[j].top + this.nodos[j].size / 2;
            arista.border = 0.05;
            arista.bgcolor = 'rgb(0,0,0,0.4)';
            arista.value = Math.floor((Math.random() * 90)) + 1;
            arista.font = 1;
            this.aristas.push(arista);
            arista = new Arista();
          }
        }
      }
    }
    /**
      nodo.size = (70 /(1.5 * this.NNodos))/ 2;
      nodo.radius = nodo.size;
      nodo.bgcolor = '#000';
      nodo.top = (85 / (2 * this.NNodos)) * (Math.random() * this.NNodos);
      nodo.left = (70 / this.NNodos) * (Math.random() * this.NNodos);
      nodo.border = (85 / this.NNodos) / 30;
      nodo.value = environment.chars.charAt(i);
      nodo.font = nodo.size / 3;
      nodo.padding = nodo.size / 6;
      this.nodos.push(nodo);
      nodo = new Nodo();
     */
    /*let nodo: Nodo;
    nodo = new Nodo();
    nodo.bgcolor = "#000";
    nodo.border = 0.5;
    nodo.left = 10;
    nodo.top = 20;
    nodo.radius = 3;
    nodo.size = 6;
    nodo.value = 'A';
    nodo.font = 2;
    nodo.padding = 1;
    this.nodos.push(nodo);*/
  }
}
