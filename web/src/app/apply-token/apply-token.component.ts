import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {TokenService} from '../_services/token.service';

@Component({
  selector: 'imprint-app-apply-token',
  templateUrl: './apply-token.component.html',
  styleUrls: ['./apply-token.component.scss']
})
export class ApplyTokenComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService
  ) {
  }

  ngOnInit() {
    this.route.fragment.subscribe((fragment: string) => {
      const params = new HttpParams({fromString: fragment});
      this.tokenService.saveToken(params.get('token'));
      this.router.navigate(['/']).then(() => window.location.reload());
    });
  }

}
