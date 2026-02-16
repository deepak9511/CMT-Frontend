import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PatientService } from '../../core/services/patient.service';

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html'
})
export class AdminDashboardComponent {

  patients: any[] = [];

  constructor(private service: PatientService, private router: Router) {
    this.service.getAll().subscribe((res: any) => {
      this.patients = res;
    });
  }

  edit(id: number) {
    this.router.navigate(['/edit', id]);
  }
}
