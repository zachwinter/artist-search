"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var store_1 = require("@ngrx/store");
var api_service_1 = require("./services/api.service");
var AppComponent = (function () {
    function AppComponent(_store, _apiService) {
        this._store = _store;
        this._apiService = _apiService;
        this.search = '';
        this.filter = '';
    }
    AppComponent.prototype.getArtist = function (artist) {
        this.search = artist;
        this._store.dispatch({ type: 'CLEAR_FILTERED_ARTISTS' });
        this._apiService.getArtist(artist);
        this._apiService.getSimilarArtists(artist);
    };
    AppComponent.prototype.filterByTag = function (tag) {
        if (tag.length > 0) {
            this._store.dispatch({ type: 'FILTER_SIMILAR_ARTISTS', payload: tag });
        }
        else {
            this._store.dispatch({ type: 'CLEAR_FILTERED_ARTISTS' });
        }
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._store.select('artist')
            .subscribe(function (artistState) {
            _this.state = artistState;
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'last-fm',
        template: "\n  \n  <main>\n    <header>\n      <form class=\"artist-search\" #artistSearch=\"ngForm\" (ngSubmit)=\"getArtist(artistSearch.value.artist)\">\n        <input placeholder=\"search for artists\" [(ngModel)]=\"search\" type=\"text\" name=\"artist\" />\n        <button type=\"submit\">Search</button>\n      </form>\n    </header>\n    \n    <section [@fade]=\"visible\" class=\"artist\" *ngIf=\"state\">\n      <div class=\"image-container\">\n        <img src=\"{{state.artist?.images.slice(-1)[0]}}\" alt=\"Grimes\" />\n        <h1>{{state.artist?.name}}</h1>\n      </div>\n      <p><span *ngFor=\"let tag of state.artist?.tags\">{{tag}}</span></p>\n    </section>\n    \n    <h2 class=\"status\" [@fade]=\"visible\" *ngIf=\"state\">\n      <span *ngIf=\"!state.isFiltered && state.similar.length < 50\">Loading Artists ({{state.similar.length || 0}} / 50)</span>\n      <span *ngIf=\"!state.isFiltered && state.similar.length === 50\">Similar Artists</span>\n      <span *ngIf=\"state.isFiltered\">Similar Artists | {{state.genre}} ({{state.filtered.length}})</span>\n    </h2>\n    \n    <section [@fade]=\"visible\" *ngIf=\"state && state.similar.length === 50\" class=\"similar-artists\">\n      <form\n        class=\"tag-filter\"\n        #tagFilter=\"ngForm\"\n        (ngSubmit)=\"filterByTag(tagFilter.value.tag)\"\n        [@fade]=\"visible\"\n       >\n        <input placeholder=\"filter by genre\" [ngModel]=\"filter\" type=\"text\" name=\"tag\" />\n        <button type=\"submit\">Filter</button>\n      </form>\n    \n      <ul *ngIf=\"!state.isFiltered\">\n        <li *ngFor=\"let artist of state.similar\" (click)=\"getArtist(artist.name)\">\n          <img src=\"{{artist.image[2]['#text']}}\" alt=\"{{artist.name}}\" />\n          <p>{{artist.name}}</p>\n        </li>\n      </ul>\n      \n      <ul *ngIf=\"state.isFiltered\">\n        <li *ngFor=\"let artist of state.filtered\" (click)=\"getArtist(artist.name)\">\n          <img src=\"{{artist.image[2]['#text']}}\" alt=\"{{artist.name}}\" />\n          <p>{{artist.name}}</p>\n        </li>\n      </ul>\n    </section>\n  </main>\n  \n  ",
        styleUrls: ['./app.component.css'],
        animations: [
            animations_1.trigger('fade', [
                animations_1.state('visible', animations_1.style({
                    opacity: 1
                })),
                animations_1.transition(':enter', [
                    animations_1.style({
                        opacity: 0
                    }),
                    animations_1.animate(200)
                ]),
                animations_1.transition(':leave', [
                    animations_1.animate(200, animations_1.style({
                        opacity: 0
                    }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [store_1.Store,
        api_service_1.APIService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map