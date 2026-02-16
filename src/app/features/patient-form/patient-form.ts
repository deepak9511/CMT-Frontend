import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../core/services/patient.service';

@Component({
  standalone: true,
  selector: 'app-patient-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-form.html',
  styleUrls: ['./patient-form.scss']
})
export class PatientFormComponent {

  step = 0;
  editId: any = null;
  form!: FormGroup;

  /* ================= LOV OPTIONS ================= */

  firstSymptomsOptions = [
    'Tripping / Falls',
    'High Foot Arches',
    'Weak Ankles',
    'Numbness in Feet',
    'Hand Weakness',
    'Delayed Walking',
    'Scoliosis'
  ];

  diagnosedByOptions = [
    'Neurologist',
    'Pediatrician',
    'Orthopedic',
    'General Physician',
    'Other'
  ];

  diagnosisMethodOptions = [
    'Clinical Exam Only',
    'NCS / EMG',
    'Genetic Testing',
    'Muscle Biopsy',
    'Nerve Biopsy',
    'Other'
  ];

  yesNoOptions = ['Yes', 'No'];

  yesNoPendingOptions = ['Yes', 'No', 'Pending'];

  relationshipOptions = [
    'Father',
    'Mother',
    'Sibling',
    'Grandparent',
    'Cousin',
    'Child',
    'Other'
  ];

  consanguinityOptions = [
    'No',
    'First Cousins',
    'Second Cousins',
    'Uncle-Niece',
    'Other'
  ];

  mobilityOptions = [
    'Walks Independently',
    'Uses AFOs / Braces',
    'Uses Cane / Walker',
    'Wheelchair',
    'Bed Bound'
  ];

  walkingDistanceOptions = [
    '< 50 meters',
    '50 – 200 meters',
    '200 – 500 meters',
    '> 500 meters'
  ];

  treatmentOptions = [
    'Physical Therapy',
    'Occupational Therapy',
    'Orthotics (AFOs)',
    'Gabapentin',
    'Pregabalin',
    'Vitamins / Supplements',
    'Experimental Therapy'
  ];

  /* ================= CONSTRUCTOR ================= */

  constructor(
    private fb: FormBuilder,
    private service: PatientService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.initForm();

    this.editId = this.route.snapshot.paramMap.get('id');

    if (this.editId) {
      this.service.getById(+this.editId).subscribe((res: any) => {
        this.form.patchValue(res);
      });
    }
  }

  /* ================= INIT FORM ================= */

  initForm() {
    this.form = this.fb.group({

      // DEMOGRAPHICS
      fullName: [''],
      dob: [''],
      gender: [''],
      permanentAddress: [''],
      ethnicity: [''],
      maritalStatus: [''],
      height: [''],
      weight: [''],

      // DIAGNOSIS
      symptomAge: [''],
      firstSymptoms: [[]],
      diagnosisAge: [''],
      diagnosedBy: [''],
      diagnosticMethod: [''],

      // GENETIC
      geneticTesting: [''],
      mutation: [''],
      report: [null],

      // FAMILY
      familyHistory: [''],
      affectedRelatives: [[]],
      consanguinity: [''],

      // SYMPTOMS
      lowerLimb: [''],
      upperLimb: [''],
      sensory: [''],

      // FUNCTIONAL
      mobility: [''],
      walkingDistance: [''],
      falls: [''],

      // TREATMENT
      treatments: [[]],
      clinicalTrials: [''],
      accessToCare: ['']

    });
  }

  /* ================= STEP NAVIGATION ================= */

  next() {
    if (this.step < 6) this.step++;
  }

  prev() {
    if (this.step > 0) this.step--;
  }

  get progress() {
    return ((this.step + 1) / 7) * 100;
  }

  /* ================= FILE UPLOAD ================= */

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ report: file });
    }
  }

  /* ================= SUBMIT ================= */

  submit() {

    const formData = new FormData();
    Object.keys(this.form.value).forEach(key => {

      const value = this.form.value[key];

      // Handle arrays (multi-select)
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    if (this.editId) {
      this.service.update(this.editId, formData).subscribe(() => {
        alert('Updated Successfully');
        this.router.navigate(['/admin']);
      });
    } else {
      console.log(this.form);
    console.log(formData);
      this.service.create(formData).subscribe(() => {
        alert('Created Successfully');
        this.form.reset();
        this.step = 0;
      });
    }
  }

}
