import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-gestionar-cita',
  imports: [ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './gestionar-cita.component.html',
  styleUrl: './gestionar-cita.component.css'
})
export class GestionarCitaComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router
  ){}

  gestionarCitaForm = this.fb.group({
    tipoDoc: ["", [Validators.required]],
    nroDoc: ["", [Validators.required]],
    pwd: ["", [Validators.required]]
  })
  
/* 
  submit(){
    if(this.gestionarCitaForm.valid)
      console.log(this.gestionarCitaForm.value)
    else
      this.router.navigate(['/principal']);
  }

  getTipoDocInvalido(){
    return this.gestionarCitaForm.get("tipoDoc")?.invalid && this.gestionarCitaForm.get("tipoDoc")?.touched
  }

  getNroDocInvalido(){
    return this.gestionarCitaForm.get("nroDoc")?.invalid && this.gestionarCitaForm.get("nroDoc")?.touched
  }

  getPwdInvalido(){
    return this.gestionarCitaForm.get("pwd")?.invalid && this.gestionarCitaForm.get("pwd")?.touched
  }
 */
}
