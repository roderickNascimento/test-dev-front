import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CarroService } from '../Services/carro.service';
import { Carro } from '../interfaces/carro';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {first} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MarcaService } from '../Services/marca.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.scss']
})
export class CarroComponent implements OnInit, OnDestroy {

  displayModal = false;

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  carro;
  carros;
  marcas;
  mensagem;

  newCarroForm = new FormGroup ( {
    id: new FormControl('', [Validators.required]),
    modelo: new FormControl( '' ),
    ano: new FormControl(''),
    marca_id: new FormControl(''),
  });



  constructor(
    private carroService: CarroService,
    private formBuilder: FormBuilder,
    private marcaService: MarcaService) { }

  ngOnInit(): void {
    this.getCarros();
    this.getMarcas();
    this.dtTrigger.next();
  }

  getCarro(id: number) {
    this.carroService.getCarro(id).pipe(first()).subscribe(
      res => {
        console.log(res);
        this.carro = res[0];
        this.newCarroForm.patchValue({
        id: this.carro.id,
        modelo: this.carro.modelo,
        ano: this.carro.ano,
        marca_id: this.carro.marca_id,
        });
      }
    );
  }

  getCarros() {
    this.carroService.getCarros().subscribe(
      res => {
        this.carros = res;
        this.dtTrigger.next();
      }
    );
  }
  getMarcas() {
    this.marcaService.getMarcas().subscribe(
      res => {
        this.marcas = res;
        console.log(this.marcas);
      }
    );
  }
  delete(id) {
    const confirmar = confirm('Deseja realmente deletar?');
    if (confirmar) {
      this.carroService.deleteCarro(id).subscribe(
        success => {
          this.rerender();
        }
      );
    }
  }

  viewCarro(id= null) {
    this.actionModal();
    if (id) {
      console.log(id);
      this.getCarro(id);
    }

  }
  compareFn(c1, c2): boolean {
    return c1 && c2 ? c1.numeroDex === c2.numeroDex : c1 === c2;
  }

  save() {
    const id = this.newCarroForm.value.id;

    if (id) {
      this.carroService.putCarros(this.newCarroForm.value).subscribe(
        success => {
          this.actionModal();
          this.mensagem = "Editar com Sucesso!!! =D ";
          this.rerender();
         },
        error => {
          this.mensagem = "Falha ao Editar";
        }
      );
    } else {
      this.carroService.postCarros(this.newCarroForm.value).subscribe(
        success => {
          this.actionModal();
          this.mensagem = "Cadastrado com Sucesso!!! =D ";
          this.rerender();
         },
        error => {
          this.mensagem = "Falha ao cadastrar";
        }
      );
    }
  }
  actionModal() {
    this.displayModal = !this.displayModal;
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.getCarros();
    });

  }

}
