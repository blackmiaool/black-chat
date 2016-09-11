let serverUrl = `${location.hostname}:3000`;
let config = {
    url: {
        ws: `ws://${serverUrl}/pipe/submit`,
        getRoom: `//${serverUrl}/pipe/getRoom`,
        signup:`//${serverUrl}/pipe/signup`,
        signin:`//${serverUrl}/pipe/signin`,
    }

};


export default config;