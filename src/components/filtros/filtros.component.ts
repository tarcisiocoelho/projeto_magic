import { Component, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MagicService } from '../../service/magic.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [
    NgbDropdownModule, 
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.scss'
})
export class FiltrosComponent {
  meuForm: FormGroup;
  @Output() emitirRetornoCards = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private service: MagicService) {
    this.meuForm = this.fb.group({
      name: [''],
      bloco: ['', Validators.required]
    });

    // Assinar alterações nos campos do formulário
    this.meuForm.valueChanges.subscribe(() => {
      this.atualizarEstadoBotao();
    });
  }

  // Verificar se o botão de envio deve ser habilitado
  atualizarEstadoBotao() {
    const nameControl = this.meuForm.get('name');
    const selectControl = this.meuForm.get('bloco');
    return nameControl?.valid && selectControl?.valid;
  }

  onSubmit() {
    // Lógica para enviar os dados do formulário
    console.log(this.meuForm.value);
    this.service.setCards(this.meuForm.get('bloco')?.value).subscribe(res => {
      console.log("primeiro retorno",res)
      this.emitirRetornoCards.emit(res);
    })
  }

 
}
