export class AuthModel {
    username: string;
    responseCode: string;
    secretKey: string;
    responseDesc: string;
    jwt: string;

    setAuth(auth: any) {
        this.responseCode = auth.responseCode;
        this.secretKey = auth.secretKey;
        this.responseDesc = auth.responseDesc;
        this.jwt = auth.jwt;
    }
}
