import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PatientService {

  private api = 'http://localhost:3000/api/patients';

  constructor(private http: HttpClient) {}

  create(data: any) {
    return this.http.post(this.api, data);
  }

  update(id: number, data: any) {
    return this.http.put(`${this.api}/${id}`, data);
  }

  getAll() {
    return this.http.get(this.api);
  }

  getById(id: number) {
    return this.http.get(`${this.api}/${id}`);
  }
}
