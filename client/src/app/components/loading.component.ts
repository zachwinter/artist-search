import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { LoadingState } from '../reducers/loading';

@Component({
  selector: 'loading',
  template: `

  <section [@fade]="'visible'" class="loading-container" *ngIf="state.isLoading" >
    <i class="loading" fa [name]="'circle-o-notch'"></i>
  </section>

  `,
  styleUrls: ['./loading.component.scss'],
  animations: [
    trigger('fade', [
      state('visible', style({ opacity: 1 })),

      transition(':enter', [
        style({ opacity: 0 }),
        animate(150)
      ]),

      transition(':leave', [
        animate(150, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LoadingComponent implements OnInit {
  public state: LoadingState;

  constructor(private _store: Store<AppState>) {}

  ngOnInit() {
    this._store.select('loading')
      .subscribe((state: LoadingState) => this.state = state)
  }
}
