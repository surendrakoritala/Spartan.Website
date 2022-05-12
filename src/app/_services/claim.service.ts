import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Claim } from '@app/_models';

const baseUrl = `${environment.apiUrl}`;
const mlUrl = `${environment.apiMlUrl}`;

@Injectable({ providedIn: 'root' })
export class Claimservice {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Claim[]>(baseUrl);
  }

  getById(id: number) {
    return this.http.get<Claim>(`${baseUrl}/${id}`);
  }

  create(params: any) {
    return this.http.post(baseUrl, params);
  }

  update(id: number, params: any) {
    return this.http.put(`${baseUrl}/${id}`, params);
  }

  delete(id: number) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  verify(params: Claim) {
    var content = {
      "beneId": params.beneId,
      "provider": params.provider,
      "inscClaimAmtReimbursed": params.inscClaimAmtReimbursed,
      "isInpatient": params.isInpatient,
      "gender": params.Gender,
      "race": params.Race,
      "renalDiseaseIndicator": params.renalDiseaseIndicator,
      "chronicCondAlzheimer": params.chronicCondAlzheimer,
      "chronicCondHeartfailure": params.chronicCondHeartfailure,
      "chronicCondKidneyDisease": params.chronicCondKidneyDisease,
      "chronicCondCancer": params.chronicCondCancer,
      "chronicCondObstrPulmonary": params.chronicCondObstrPulmonary,
      "chronicCondDepression": params.chronicCondDepression,
      "chronicCondDiabetes": params.chronicCondDiabetes,
      "chronicCondIschemicHeart": params.chronicCondIschemicHeart,
      "chronicCondOsteoporasis": params.chronicCondOsteoporasis,
      "chronicCondRheumatoidarthritis": params.chronicCondRheumatoidarthritis,
      "chronicCondStroke": params.chronicCondStroke,
      "ipannualReimbursementAmt": params.ipannualReimbursementAmt,
      "ipannualDeductibleAmt": params.ipannualDeductibleAmt,
      "opannualReimbursementAmt": params.opannualReimbursementAmt,
      "opannualDeductibleAmt": params.opannualDeductibleAmt,
      "age": params.age,
      "isDead": params.isDead,
      "daysAdmitted": params.daysAdmitted,
      "totalDiagnosis": params.totalDiagnosis,
      "totalProcedure": params.totalProcedure,
      "id": params.id,
    };

    return this.http.post(mlUrl, content);
  }
}
