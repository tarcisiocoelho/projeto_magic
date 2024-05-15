import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { MagicService } from '../../service/magic.service';
import { ModalComponent } from '../modal/modal.component';
import { error } from 'console';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.scss'
})
export class ResultadosComponent {
  @Input() cardsEmitidos: any;
  creatureCards: any[] = [];
  carregarLoadingCircle: boolean = false;
  carregarComponente: boolean = false;

  constructor(private service: MagicService){
    this.carregarComponente = false;
  }

  recuperarDetalhesCards(retorno:any){
    this.creatureCards = [];
    this.carregarLoadingCircle = true;
    console.log("recuperando cada card::", retorno)
    this.service.getCreatureCards(retorno.code).subscribe(res => {
      if(res.length > 0){
        this.creatureCards = res;
        this.carregarLoadingCircle = false;
      }else{
        this.carregarComponente = true;
        this.creatureCards = []
        this.carregarLoadingCircle = false;
      }
      console.log("retorno:", this.creatureCards)
    }, error => {
      this.creatureCards = []
      this.carregarLoadingCircle = false;
      this.carregarComponente = true;
    })
  }

}
