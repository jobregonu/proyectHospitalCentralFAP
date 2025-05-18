import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private readonly http: HttpClient
  ) { }

  validar_login(data: any){
    return this.http.post("https://yerwug2msl.execute-api.us-east-1.amazonaws.com/v1fap/login", data, {responseType: "json"})
  }

  listar_medicos(){
    return this.http.get("https://yerwug2msl.execute-api.us-east-1.amazonaws.com/v1fap/medicos",{responseType: "json"})
  }

}
