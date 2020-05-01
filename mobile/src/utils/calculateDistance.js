function getRelativeLogitudeDistance(latitude, longitudeDelta) {
    const radiusEarthMeters = 6371000;
    const longitudeDistance = Math.abs(longitudeDelta / 360 * (Math.cos(latitude) * 2 * (Math.PI) * radiusEarthMeters));

    return ~~longitudeDistance;
}

export {
    getRelativeLogitudeDistance
};