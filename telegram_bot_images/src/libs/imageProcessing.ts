import * as needle from "needle";
import config from 'src/config'
import {loggerProduction} from "./logger";

export async function process(imageBuff: Buffer): Promise<Buffer | false> {
    const host = config.urn.imageProcessing;
    const api = config.uri.imageProcessing.process;
    const url = host + api;

    const data = {
        image: imageBuff,
    }
    const options = {
        json: true,
    }
    let res
    try {
        res = await needle('post', url, data, options)
    } catch (e) {
        loggerProduction.error(e)
        return false
    }
    let byteArray = res.body.image
    if (!byteArray) {
        loggerProduction.warn('Not correctly answer')
        return false
    }
    return Buffer.from(byteArray)
}