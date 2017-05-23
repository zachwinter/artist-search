"use strict";
var _ = require("lodash");
exports.initialState = {
    artist: undefined,
    tags: [],
    similar: [],
    filtered: [],
    isFiltered: false,
    genre: ''
};
function artistReducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    switch (action.type) {
        case 'SELECT_ARTIST':
            return {
                artist: action.payload,
                tags: state.tags,
                similar: state.similar,
                filtered: state.filtered,
                isFiltered: false,
                genre: ''
            };
        case 'SAVE_TAG':
            return {
                artist: state.artist,
                tags: state.tags.concat([action.payload]),
                similar: state.similar,
                filtered: state.filtered,
                isFiltered: false,
                genre: state.genre
            };
        case 'SAVE_SIMILAR_ARTIST':
            return {
                artist: state.artist,
                tags: state.tags,
                similar: state.similar.concat([action.payload]),
                filtered: state.filtered,
                isFiltered: false,
                genre: ''
            };
        case 'FILTER_SIMILAR_ARTISTS':
            var filtered = _.filter(state.similar, function (artist) {
                var tag = _.find(artist.tags, { name: action.payload });
                if (tag)
                    return tag.count > 50;
            });
            return {
                artist: state.artist,
                tags: state.tags,
                similar: state.similar,
                filtered: filtered,
                isFiltered: true,
                genre: action.payload
            };
        case 'CLEAR_SIMILAR_ARTISTS':
            return {
                artist: state.artist,
                tags: state.tags,
                similar: [],
                filtered: state.filtered,
                isFiltered: false,
                genre: ''
            };
    }
}
exports.artistReducer = artistReducer;
//# sourceMappingURL=artist.js.map