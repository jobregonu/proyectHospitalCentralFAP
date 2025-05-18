import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { ProjectService } from '../../../../services/project.service';

@Component({
  selector: 'app-reservar-medico',
  imports: [ReactiveFormsModule, RouterLink, RouterModule, NgFor],
  templateUrl: './reservar-medico.component.html',
  styleUrl: './reservar-medico.component.css'
})
export class ReservarMedicoComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private readonly ps: ProjectService
  ){}

  reservaMedicoForm = this.fb.group({
    txtMedico: [""],
    selMedico: [""]
  })
  
 
  btnAtraz(){
    if(this.reservaMedicoForm.valid)
      console.log(this.reservaMedicoForm.value)
    else
      this.router.navigate(['/gestionar-cita']);
  }

  btnContinuar(){
    if(this.reservaMedicoForm.valid)
      console.log(this.reservaMedicoForm.value)
    else
      this.router.navigate(['/seleccionar-especialidad']);
  }

  medicos: any = []

  __listar_medicos(){
    this.ps.listar_medicos().subscribe((rest: any) => {
      this.medicos = rest.data
      console.log(this.medicos)
    })
  }

  ngOnInit(): void {
    this.__listar_medicos()
  }

}
