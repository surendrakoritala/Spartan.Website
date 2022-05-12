import { Component, Input } from '@angular/core';
import { ITeam } from './team.model';

@Component({
  selector: 'app-team-thumbnail',
  templateUrl: './team-thumbnail.component.html',
  styleUrls: ['./team-thumbnail.component.css'],
})
export class TeamThumbnailComponent {
  @Input() team: ITeam;
}
