import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-excluir-pensamento',
  templateUrl: './excluir-pensamento.component.html',
  styleUrls: ['./excluir-pensamento.component.scss']
})
export class ExcluirPensamentoComponent implements OnInit {

  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: ''
  }

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    // snapshot — uma captura ou fotografia da rota no momento em que for acessada
    // paramMap, que retorna um mapa com informações obrigatórias e opcionais do pensamento

    // Esse é o operador de asserção não nulo ( ! ). 
    // o TypeScript garante que nenhuma variável seja involuntariamente null ou undefined.

    const id = this.route.snapshot.paramMap.get('id');
    this.service.buscarPorId(parseInt(id)).subscribe((pensamento) =>{
      this.pensamento = pensamento;
    })
  }

  excluirPensamento() {
    if(this.pensamento.id) {
      this.service.excluir(this.pensamento.id).subscribe(() => {
        this.router.navigate(['/listarPensamento'])
      })
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento'])
  }

}
