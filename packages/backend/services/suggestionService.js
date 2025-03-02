
/**
 * Gets emotion with the highest value from emotion JSON (ie most present in facial detection)
 * @param {JSON} emotion - From Hume (or user form?)
 */
function getMainEmotion(emotion) {
    return emotion.reduce((max, em) => em.score > max.score ? em : max, emotion[0]).name;
}

/**
 * Gets track suggestions from Spotify Web API
 * @param {JSON} seed - Target values for danceability, energy, speechiness, and valence
 */
function getSuggestions(seed, emotion) {
    // Get users top artists and tracks and add to seed
    // with names seed_artists, seed_tracks

    // Get track suggestions with updated seed
    return {
        mood: getMainEmotion(emotion),
        name: 'placeholder',
        id: 'placeholder',
        dateSuggested: new Date(),
        tracks : []
    }
}

export {
    getSuggestions, getMainEmotion
}
