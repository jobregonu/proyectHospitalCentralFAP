/* import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service'; 

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, RouterLink, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private readonly ps: ProjectService
  ){}

  loginForm = this.fb.group({
    tipo_documento: ["", [Validators.required]],
    numero_documento: ["", [Validators.required]],
    clave_hash: ["", [Validators.required]],
    /* captcha:["", [Validators.required]] */
  /*})

  get TipoDocInvalido(){
    return this.loginForm.get("tipo_documento")?.invalid && this.loginForm.get("tipo_documento")?.touched
  }

  get NroDocInvalido(){
    return this.loginForm.get("numero_documento")?.invalid && this.loginForm.get("numero_documento")?.touched
  }

  get PwdInvalido(){
    return this.loginForm.get("clave_hash")?.invalid && this.loginForm.get("clave_hash")?.touched
  }

  __validar_login(data: any){
    this.ps.validar_login(data).subscribe((rest: any) => {
      /* console.log(rest.data[0]) */
    /*  this.router.navigate(['/principal']);
    })
  }

  submit(){
    if(this.loginForm.valid){
      /* console.log(this.loginForm.value) */
     /* this.__validar_login(this.loginForm.value)
    }else{
      alert("Error de datos")
    }
  }


} 
  */
import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  intentosFallidos = 0;
  cuentaBloqueada = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private readonly ps: ProjectService
  ) {}

  loginForm = this.fb.group({
    tipo_documento: ['', Validators.required],
    numero_documento: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
    clave_hash: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
  });

  ngOnInit(): void {
    const intentosGuardados = localStorage.getItem('intentosFallidos');
    const cuentaBloqueadaStorage = localStorage.getItem('cuentaBloqueada');

    if (intentosGuardados) {
      this.intentosFallidos = parseInt(intentosGuardados, 10);
    }

    if (cuentaBloqueadaStorage === 'true') {
      this.cuentaBloqueada = true;
      this.loginForm.disable();
    }

    this.loginForm.get('tipo_documento')?.valueChanges.subscribe(tipo => {
      const numeroDoc = this.loginForm.get('numero_documento');
      if (tipo === 'DNI' || tipo === 'CE' || tipo === 'PASS') {
        numeroDoc?.setValidators([Validators.required, Validators.pattern(/^\d{8}$/)]);
      } else {
        numeroDoc?.clearValidators();
      }
      numeroDoc?.updateValueAndValidity();
    });
  }

  get TipoDocInvalido() {
    return this.loginForm.get('tipo_documento')?.invalid && this.loginForm.get('tipo_documento')?.touched;
  }

  get NroDocInvalido() {
    return this.loginForm.get('numero_documento')?.invalid && this.loginForm.get('numero_documento')?.touched;
  }

  get PwdInvalido() {
    return this.loginForm.get('clave_hash')?.invalid && this.loginForm.get('clave_hash')?.touched;
  }

  __validar_login(data: any) {
    this.ps.validar_login(data).subscribe({
      next: () => {
        this.intentosFallidos = 0;
        localStorage.removeItem('intentosFallidos');
        localStorage.removeItem('cuentaBloqueada');
        this.router.navigate(['/principal']);
      },
      error: () => {
        this.intentosFallidos++;
        localStorage.setItem('intentosFallidos', this.intentosFallidos.toString());

        if (this.intentosFallidos >= 3) {
          this.cuentaBloqueada = true;
          this.loginForm.disable();
          localStorage.setItem('cuentaBloqueada', 'true');
        } else {
          alert(`Credenciales incorrectas. Intento ${this.intentosFallidos} de 3`);
        }
      }
    });
  }

  submit() {
    if (this.loginForm.valid && !this.cuentaBloqueada) {
      this.__validar_login(this.loginForm.value);
    } else if (this.cuentaBloqueada) {
      alert('Cuenta bloqueada. Contacta al equipo de soporte para desbloquearla.');
    } else {
      alert('Error de datos');
    }
  }
}
