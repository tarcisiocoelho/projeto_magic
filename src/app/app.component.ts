import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { FiltrosComponent } from '../components/filtros/filtros.component';
import { ResultadosComponent } from '../components/resultados/resultados.component';
import { MaterialComponentModule } from '../material-component/material-component.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HomeComponent, 
    FiltrosComponent, 
    ResultadosComponent,
    MaterialComponentModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'projeto_desafio_angular';
}
