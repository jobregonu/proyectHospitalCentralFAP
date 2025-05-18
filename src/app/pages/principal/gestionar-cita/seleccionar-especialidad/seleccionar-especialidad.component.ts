import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-seleccionar-especialidad',
  imports: [ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './seleccionar-especialidad.component.html',
  styleUrl: './seleccionar-especialidad.component.css'
})
export class SeleccionarEspecialidadComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router
  ){}

  seleccionarEspecialidadForm = this.fb.group({
    tipoDoc: ["", [Validators.required]],
    nroDoc: ["", [Validators.required]],
    pwd: ["", [Validators.required]]
  })
  
 
  btnAtraz(){
    if(this.seleccionarEspecialidadForm.valid)
      console.log(this.seleccionarEspecialidadForm.value)
    else
      this.router.navigate(['/reservar-medico']);
  }

  btnContinuar(){
    if(this.seleccionarEspecialidadForm.valid)
      console.log(this.seleccionarEspecialidadForm.value)
    else
      this.router.navigate(['/resumen-cita']);
  }
/*
  getTipoDocInvalido(){
    return this.seleccionarEspecialidadForm.get("tipoDoc")?.invalid && this.seleccionarEspecialidadForm.get("tipoDoc")?.touched
  }

  getNroDocInvalido(){
    return this.seleccionarEspecialidadForm.get("nroDoc")?.invalid && this.seleccionarEspecialidadForm.get("nroDoc")?.touched
  }

  getPwdInvalido(){
    return this.seleccionarEspecialidadForm.get("pwd")?.invalid && this.seleccionarEspecialidadForm.get("pwd")?.touched
  }
 */

}
