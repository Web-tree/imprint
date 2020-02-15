import {Component, Input, OnInit} from '@angular/core';
import {ImprintService} from '../../_services/imprint.service';
import {Imprint} from '../../_models/Imprint';

@Component({
  selector: 'imprint-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input() usernames: string[];

  imprintMap: Map<string, Promise<number>>;

  constructor(private imprintService: ImprintService) { }

  ngOnInit() {
    this.imprintMap = this.imprintService.getUsersImprint(this.usernames);
  }

}
