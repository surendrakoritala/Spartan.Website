import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ITeam } from './team.model';
const TEAMS: ITeam[] = [
  {
    id: 1,
    firstName: 'Zim',
    lastName: 'Zuhaer',
    email: 'zuhaer.zim@newsignature.com',
    department: 'Microsoft Business Group',
  },
  {
    id: 2,
    firstName: 'Navneet',
    lastName: 'Sharma',
    email: 'navneet.sharma@newsignature.com',
    department: 'Microsoft Business Group',
  },
  {
    id: 3,
    firstName: 'Annie',
    lastName: 'Wong',
    email: 'annie.wong@newsignature.com',
    department: 'Microsoft Business Group',
  },
  {
    id: 4,
    firstName: 'Surendra',
    lastName: 'Koritala',
    email: 'surendra.koritala@newsignature.com',
    department: 'Microsoft Business Group',
  },
  {
    id: 5,
    firstName: 'Dan',
    lastName: 'De Sousa',
    email: 'dan.desousa@newsignature.com',
    department: 'Microsoft Business Group',
  },
];

@Injectable()
export class TeamService {
  getTeams(): Observable<ITeam[]> {
    const subject = new Subject<ITeam[]>();
    setTimeout(() => {
      subject.next(TEAMS);
      subject.complete();
    }, 200);
    return subject;
  }
}
