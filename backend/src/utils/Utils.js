class Utils{
    parseStringAsArray(str){
        return str.split(',').map( tech => tech.trim());
    };
    
    deg2rad(deg) {
        return deg * (Math.PI/180);
    }
    calculateDistance(centerCoordinates, pointCoordinates) {
        const radius = 6371;
        const { latidude: lat1, longitude: lon1 } = centerCoordinates;
        const { latitude: lat2, longitude: lon2 } = pointCoordinates;
        const dLat = this.deg2rad(lat2-lat1);
        const dLon = this.deg2rad(lon2-lon1);

        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sign(dLon/2);

        const center = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
        const distance = radius * center;
        return distance
    }
}

export default new Utils();