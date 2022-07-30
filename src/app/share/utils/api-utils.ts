import {Base64Utils} from './base64-encode-decode';
import {ResponseApiModel} from '../../modules/auth/_models/response-api';
import {sha256} from 'js-sha256';
import * as moment from 'moment';


export function buildRequest(request: any, seabReq: boolean) {
    request.header.traceid = moment.now();
    if (seabReq) {
        request = {seabReq: request};
    }
    console.log('data request >>>>> ::', request);
    const dataBase64 = Base64Utils.encode(JSON.stringify(request));
    return {
        data: dataBase64,
        checksum: getCheckSum(dataBase64)
    };
}

export function getResponseApi(response: ResponseApiModel) {
    const dataResBase64 = response.data;
    const checkSumRes = response.checksum;
    const appCheckSum = getCheckSum(dataResBase64);

    if (checkSumRes != appCheckSum) {
        console.log(`---------- CheckSum invalid ---------`);
        return null;
    } else {
        const result = Base64Utils.decode(dataResBase64);
        console.log('data response >>>> ::', result);
        return JSON.parse(result);
    }
}

export function getCheckSum(dataReqBase64) {
    const secretKey = localStorage.getItem('secretKey');
    if (secretKey) {
        return sha256.hmac(secretKey, dataReqBase64);
    }
}
