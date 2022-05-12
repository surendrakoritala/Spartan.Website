import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Claimservice, AlertService } from '@app/_services';
import { Claim } from '@app/_models';
import { Result } from '@app/_models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
  claims!: Claim[];

  constructor(
    private Claimservice: Claimservice,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.Claimservice.getAll()
      .pipe(first())
      .subscribe((claims) => (this.claims = claims));
  }

  deleteClaim(id: number) {
    const Claim = this.claims.find((x) => x.id === id);
    if (!Claim) return;
    Claim.isDeleting = true;
    this.Claimservice.delete(id)
      .pipe(first())
      .subscribe(() => (this.claims = this.claims.filter((x) => x.id !== id)));
  }

  verifyClaim(id: number) {
    const Claim = this.claims.find((x) => x.id === id);
    if (!Claim) return;

    this.Claimservice.verify(Claim)
      .pipe(first())
      .subscribe((data: Result) => Boolean(data[0]) ? this.alertService.success("Not Fraud Claim") : this.alertService.error("Fraud Claim"));
  }
}
