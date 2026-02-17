import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { couldStartTrivia } from 'typescript';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-form.html',
  styleUrls: ['./patient-form.scss']
})
export class PatientFormComponent {

  step = 0;
  form!: FormGroup;

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

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({

      /* STEP 1 */
      fullName: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      permanentAddress: ['', Validators.required],
      ethnicity: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],

      /* STEP 2 */
      symptomAge: ['', Validators.required],
      firstSymptoms: [[], Validators.required],
      diagnosisAge: ['', Validators.required],
      diagnosedBy: ['', Validators.required],
      diagnosticMethod: ['', Validators.required],

      /* STEP 3 */
      geneticTesting: ['', Validators.required],
      mutation: [''],
      report: [null],

      /* STEP 4 */
      familyHistory: ['', Validators.required],
      affectedRelatives: [[]],
      consanguinity: ['', Validators.required],

      /* STEP 5 */
      lowerLimb: ['', Validators.required],
      upperLimb: ['', Validators.required],
      sensory: ['', Validators.required],

      /* STEP 6 */
      mobility: ['', Validators.required],
      walkingDistance: ['', Validators.required],
      falls: [''],

      /* STEP 7 */
      treatments: [[], Validators.required],
      clinicalTrials: [''],
      accessToCare: ['', Validators.required]
    });
  }

  /* STEP FIELD MAP */
  stepFields: any = {
    0: ['fullName','dob','gender','permanentAddress','ethnicity','maritalStatus','height','weight'],
    1: ['symptomAge','firstSymptoms','diagnosisAge','diagnosedBy','diagnosticMethod'],
    2: ['geneticTesting','mutation','report'],
    3: ['familyHistory','affectedRelatives','consanguinity'],
    4: ['lowerLimb','upperLimb','sensory'],
    5: ['mobility','walkingDistance','falls'],
    6: ['treatments','clinicalTrials','accessToCare']
  };

  isCurrentStepValid(): boolean {
    return this.stepFields[this.step].every((field: string) => {
      return this.form.get(field)?.valid;
    });
  }

  markStepTouched() {
    this.stepFields[this.step].forEach((field: string) => {
      this.form.get(field)?.markAsTouched();
    });
  }

  next() {
    if (this.isCurrentStepValid()) {
      this.step++;
    } else {
      this.markStepTouched();
    }
  }

  prev() {
    if (this.step > 0) this.step--;
  }

  goToStep(index: number) {
    if (index <= this.step || this.isCurrentStepValid()) {
      this.step = index;
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ report: file });
      this.form.get('report')?.updateValueAndValidity();
    }
  }

  submit() {
    if (this.form.invalid) {
      console.log(this.form);
      this.markStepTouched();
      return;
    }
    console.log(this.form.value);
    alert('Form Submitted Successfully!');
  }

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }

  get progress() {
    return ((this.step + 1) / 7) * 100;
  }

}
