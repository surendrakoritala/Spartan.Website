import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs/operators';

import { Claimservice, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';
import { Genders } from '@app/_models';

@Component({
  templateUrl: 'add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit {
  form!: FormGroup;
  id!: number;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  keys = Object.keys;
  genders = Genders;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private Claimservice: Claimservice,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      id: [0, Validators.required],
      // Patient Information
      beneId: ['', Validators.required],
      provider: ['', Validators.required],
      age: [0, Validators.required],
      isInpatient: [0, Validators.required],
      gender: [0, Validators.required],
      race: [0, Validators.required],
      isDead: [0, Validators.required],

      // Historical conditions
      renalDiseaseIndicator: [false, Validators.required],
      chronicCondAlzheimer: [false, Validators.required],
      chronicCondHeartfailure: [false, Validators.required],
      chronicCondKidneyDisease: [false, Validators.required],
      chronicCondCancer: [false, Validators.required],
      chronicCondObstrPulmonary: [false, Validators.required],
      chronicCondDepression: [false, Validators.required],
      chronicCondDiabetes: [false, Validators.required],
      chronicCondIschemicHeart: [false, Validators.required],
      chronicCondOsteoporasis: [false, Validators.required],
      chronicCondRheumatoidarthritis: [false, Validators.required],
      chronicCondStroke: [false, Validators.required],

      // Medical Claims
      ipannualReimbursementAmt: [0, Validators.required],
      ipannualDeductibleAmt: [0, Validators.required],
      opannualReimbursementAmt: [0, Validators.required],
      opannualDeductibleAmt: [0, Validators.required],
      inscClaimAmtReimbursed: [0, Validators.required],
      daysAdmitted: [0, Validators.required],
      totalDiagnosis: [0, Validators.required],
      totalProcedure: [0, Validators.required],
    });

    if (!this.isAddMode) {
      this.Claimservice.getById(this.id)
        .pipe(first())
        .subscribe((x) => this.form.patchValue(x));
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createClaim();
    } else {
      this.updateClaim();
    }
  }

  private createClaim() {
    this.Claimservice.create(this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.alertService.success('Claim added', {
          keepAfterRouteChange: true,
        });
        this.router.navigate(['../'], { relativeTo: this.route });
      })
      .add(() => (this.loading = false));
  }

  private updateClaim() {
    this.Claimservice.update(this.id, this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.alertService.success('Claim updated', {
          keepAfterRouteChange: true,
        });
        this.router.navigate(['../../'], { relativeTo: this.route });
      })
      .add(() => (this.loading = false));
  }
}
