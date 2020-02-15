import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Imprint} from '../_models/Imprint';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImprintService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getUsersImprint(usernames: string[]): Map<string, Promise<number>> {
    const results = new Map<string, Promise<number>>();
    usernames.forEach(username => {
      const imprintPromise = this.http.get<Imprint>(`${environment.githubBackUrl}/user/${username}/imprint`).toPromise().then(value => value.imprint);
      results.set(username, imprintPromise);
    });
    return results;
  }
}
