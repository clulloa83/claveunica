
class Params {

    constructor(){
        this.clientId = '';
        this.clientSecret = '';
        this.accessTokenUri = process.env.CLAVEUNICA_TOKEN_ENDPOINT;
        this.authorizationUri = process.env.CLAVEUNICA_AUTH_ENDPOINT;
        this.redirectUri = '';
        this.scopes = ['openid run name'];
        this.state = process.env.TOKEN_SECRET;
    }
}

module.exports = {
    Params
}