import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepoService {

  private source = new Subject<any[]>();
  data$ = this.source.asObservable();

  public isLoading = new BehaviorSubject<boolean>(false);
  public errorInfo = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
  }

  getRepos(username: string) {
    this.source.next([]);
    this.isLoading.next(true);
    this.errorInfo.next('');

    const url = `https://api.github.com/users/${username}/repos`;

    this.http.get<any[]>(url).subscribe(data => {
      this.source.next(data.map((e) => {
        return {
          name: e.name,
          url: e.html_url,
          description: this.trimDescription(e.description) || 'Brak opisu',
          default_branch: e.default_branch,
          avatar: e.owner.avatar_url
        };
      }));
      this.isLoading.next(false);
    }, error => {
      this.errorInfo.next(`Nie znaleziono użytkownika o nazwie: ${username}`);
      this.isLoading.next(false);
    });
  }

  trimDescription(text: string) {
    const maxLen = 85;
    return text && text.length > maxLen ? `${text.slice(0, maxLen).split(' ').slice(0, -1).join(' ')} ...` : text;
  }
}
