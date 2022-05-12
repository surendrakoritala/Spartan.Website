import { Component, OnInit } from '@angular/core';
import { TeamService } from './team.service';
import { ActivatedRoute } from '@angular/router';
import { ITeam } from './team.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent implements OnInit {
  teams: ITeam[];

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.teamService.getTeams().subscribe((teams) => (this.teams = teams));
    console.log(this.teams);
  }
}
