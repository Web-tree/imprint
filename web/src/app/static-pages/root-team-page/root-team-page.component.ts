import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'imprint-root-team-page',
  templateUrl: './root-team-page.component.html',
  styleUrls: ['./root-team-page.component.scss']
})
export class RootTeamPageComponent implements OnInit {
  usernames: string[] = [
    'max-levitskiy',
    'Nadiine',
    'DePr',
    'UdjinSkobelev',
    'GenovaEmpera',
  ];

  constructor() { }

  ngOnInit() {
  }

}
