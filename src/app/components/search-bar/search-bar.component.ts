import {Component, OnInit} from '@angular/core';
import {RepoService} from '../../services/repo.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  username = '';
  isLoading: boolean;

  constructor(private repoService: RepoService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.repoService.getRepos(this.username);
    this.repoService.isLoading.subscribe(value => this.isLoading = value);
  }
}
