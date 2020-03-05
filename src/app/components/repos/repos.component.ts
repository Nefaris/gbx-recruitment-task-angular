import {Component, OnInit} from '@angular/core';
import {Repo} from 'src/app/models/Repo';
import {RepoService} from 'src/app/services/repo.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent implements OnInit {

  repoList: Repo[];
  isLoading: boolean;
  errorInfo: string;

  constructor(private repoService: RepoService) {
  }

  ngOnInit(): void {
    this.repoService.data$.subscribe(value => this.repoList = value);
    this.repoService.isLoading.subscribe(value => this.isLoading = value);
    this.repoService.errorInfo.subscribe(value => this.errorInfo = value);
  }
}
