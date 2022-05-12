import { Genders } from './gender';

export class Claim {
  // Profile Information
  id!: number;
  beneId!: string;
  provider!: string;
  age!: number;
  isInpatient: boolean;
  Gender!: Genders;
  Race!: number;
  isDead: number;

  // History Of illness
  renalDiseaseIndicator: boolean;
  chronicCondAlzheimer: boolean;
  chronicCondHeartfailure: boolean;
  chronicCondKidneyDisease: boolean;
  chronicCondCancer: boolean;
  chronicCondObstrPulmonary: boolean;
  chronicCondDepression: boolean;
  chronicCondDiabetes: boolean;
  chronicCondIschemicHeart: boolean;
  chronicCondOsteoporasis: boolean;
  chronicCondRheumatoidarthritis: boolean;
  chronicCondStroke: boolean;

  // Medical Claims
  ipannualReimbursementAmt: number;
  ipannualDeductibleAmt: number;
  opannualReimbursementAmt: number;
  opannualDeductibleAmt: number;
  inscClaimAmtReimbursed: number;
  daysAdmitted: number;
  totalDiagnosis: number;
  totalProcedure: number;
  isDeleting: boolean;
  isVerifying: boolean;
}
