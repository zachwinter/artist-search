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
var store_1 = require("@ngrx/store");
var http_1 = require("@angular/http");
require("rxjs/Rx");
var APIService = (function () {
    function APIService(_http, _store) {
        this._http = _http;
        this._store = _store;
        this.api = 'http://localhost:3333';
    }
    APIService.prototype.getArtist = function (artist) {
        var _this = this;
        this._http.get(this.api + '/artist/' + artist)
            .map(function (response) { return response.json(); })
            .subscribe(function (res) {
            _this._store.dispatch({ type: 'SELECT_ARTIST', payload: res });
        });
    };
    APIService.prototype.getTags = function (artist) {
        var _this = this;
        this._http.get(this.api + '/artist/' + artist + '/tags')
            .map(function (response) { return response.json(); })
            .subscribe(function (res) {
            res.tag.forEach(function (tag) {
                _this._store.dispatch({ type: 'SAVE_TAG', payload: tag });
            });
        });
    };
    APIService.prototype.getSimilarArtists = function (artist) {
        var _this = this;
        this._http.get(this.api + '/artist/' + artist + '/similar')
            .map(function (response) { return response.json(); })
            .subscribe(function (similarArtists) {
            _this._store.dispatch({ type: 'CLEAR_SIMILAR_ARTISTS' });
            similarArtists.artist.forEach(function (similarArtist) {
                _this._http.get(_this.api + '/artist/' + similarArtist.name + '/tags')
                    .map(function (response) { return response.json(); })
                    .subscribe(function (tags) {
                    similarArtist.tags = tags.tag;
                    _this._store.dispatch({ type: 'SAVE_SIMILAR_ARTIST', payload: similarArtist });
                });
            });
        });
    };
    return APIService;
}());
APIService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        store_1.Store])
], APIService);
exports.APIService = APIService;
//# sourceMappingURL=api.service.js.map