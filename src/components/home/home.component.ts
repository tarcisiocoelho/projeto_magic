import { Component, Input, OnInit } from '@angular/core';
import { MagicService } from '../../service/magic.service';
import { FiltrosComponent } from '../filtros/filtros.component';
import { ResultadosComponent } from '../resultados/resultados.component';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FiltrosComponent, ResultadosComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  receberCardsEmitidos: any;
  constructor(private service: MagicService){}
  
  ngOnInit(): void {
  }

  recebendoRetornoCards(event:any){
    this.receberCardsEmitidos = event;
  }

}
