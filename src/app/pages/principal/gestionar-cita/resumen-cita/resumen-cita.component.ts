import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-resumen-cita',
  imports: [ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './resumen-cita.component.html',
  styleUrl: './resumen-cita.component.css'
})
export class ResumenCitaComponent {
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
      this.router.navigate(['/seleccionar-especialidad']);
  }

  btnContinuar(){
    if(this.seleccionarEspecialidadForm.valid)
      console.log(this.seleccionarEspecialidadForm.value)
    else
      this.router.navigate(['/mensaje-confirmacion-cita']);
  }

}
