import { Component, OnInit, Input } from '@angular/core';
import { Repo } from 'src/app/models/Repo';


@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.scss']
})
export class RepoComponent implements OnInit {

  @Input() repo: Repo;

  constructor() { }

  ngOnInit(): void {
  }

}
