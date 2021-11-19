import * as needle from "needle";
import config from 'src/config'
import {loggerProduction} from "./logger";

export async function process(imageBuff: Buffer): Promise<Buffer | undefined> {
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
        return undefined
    }
    let arr = res.body.image
    if (arr === undefined) {
        loggerProduction.warn('Not correctly answer')
        return undefined
    }
    return Buffer.from(arr)
}