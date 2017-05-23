import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Store } from '@ngrx/store';
import { AppState } from './reducers/index';
import { ArtistState } from './reducers/artist';
import { APIService } from './services/api.service';

@Component({
  selector: 'last-fm',
  template: `
  
  <main>
    <header>
      <form class="artist-search" #artistSearch="ngForm" (ngSubmit)="getArtist(artistSearch.value.artist)">
        <input placeholder="search for artists" [(ngModel)]="search" type="text" name="artist" />
        <button type="submit">Search</button>
      </form>
    </header>
    
    <section [@fade]="visible" class="artist" *ngIf="state">
      <div class="image-container">
        <img src="{{state.artist?.images.slice(-1)[0]}}" alt="Grimes" />
        <h1>{{state.artist?.name}}</h1>
      </div>
      <p><span *ngFor="let tag of state.artist?.tags">{{tag}}</span></p>
    </section>
    
    <h2 class="status" [@fade]="visible" *ngIf="state">
      <span *ngIf="!state.isFiltered && state.similar.length < 50">Loading Artists ({{state.similar.length || 0}} / 50)</span>
      <span *ngIf="!state.isFiltered && state.similar.length === 50">Similar Artists</span>
      <span *ngIf="state.isFiltered">Similar Artists | {{state.genre}} ({{state.filtered.length}})</span>
    </h2>
    
    <section [@fade]="visible" *ngIf="state && state.similar.length === 50" class="similar-artists">
      <form
        class="tag-filter"
        #tagFilter="ngForm"
        (ngSubmit)="filterByTag(tagFilter.value.tag)"
        [@fade]="visible"
       >
        <input placeholder="filter by genre" [ngModel]="filter" type="text" name="tag" />
        <button type="submit">Filter</button>
      </form>
    
      <ul *ngIf="!state.isFiltered">
        <li *ngFor="let artist of state.similar" (click)="getArtist(artist.name)">
          <img src="{{artist.image[2]['#text']}}" alt="{{artist.name}}" />
          <p>{{artist.name}}</p>
        </li>
      </ul>
      
      <ul *ngIf="state.isFiltered">
        <li *ngFor="let artist of state.filtered" (click)="getArtist(artist.name)">
          <img src="{{artist.image[2]['#text']}}" alt="{{artist.name}}" />
          <p>{{artist.name}}</p>
        </li>
      </ul>
    </section>
  </main>
  
  `,

  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fade', [
      state('visible', style({
        opacity: 1
      })),

      transition(':enter', [
        style({
          opacity: 0
        }),
        animate(200)
      ]),

      transition(':leave', [
        animate(200, style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  private state: ArtistState;
  private search: string = '';
  private filter: string = '';

  constructor(
    private _store: Store<AppState>,
    private _apiService: APIService
  ) {}

  getArtist(artist: string): void {
    this.search = artist;

    this._store.dispatch({ type: 'CLEAR_FILTERED_ARTISTS' })

    this._apiService.getArtist(artist)
    this._apiService.getSimilarArtists(artist)
  }

  filterByTag(tag: string): void {
    if (tag.length > 0) {
      this._store.dispatch({ type: 'FILTER_SIMILAR_ARTISTS', payload: tag })
    } else {
      this._store.dispatch({ type: 'CLEAR_FILTERED_ARTISTS' })
    }
  }

  ngOnInit(): void {
    this._store.select('artist')
      .subscribe((artistState: ArtistState) => {
        this.state = artistState
      })
    }
}