import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, ReplaySubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepoService {

  private source = new Subject<any[]>();
  data$ = this.source.asObservable();

  constructor(private http: HttpClient) {
  }

  next(username: string) {
    const url = `https://api.github.com/users/${username}/repos`;
    const response = this.http.get<any[]>(url);
    response.subscribe(value => {
      const newRepos = value.map((e) => {
        return {
          name: e.name,
          url: e.html_url,
          description: this.trimDescription(e.description) || 'Brak opisu',
          default_branch: e.default_branch,
          avatar: e.owner.avatar_url
        };
      });
      this.source.next(newRepos);
    });
  }

  trimDescription(text: string) {
    const maxLen = 85;
    return text && text.length > maxLen ? `${text.slice(0, maxLen).split(' ').slice(0, -1).join(' ')} ...` : text;
  }
}
