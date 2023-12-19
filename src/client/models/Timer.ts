/* tslint:disable */
/* eslint-disable */
/**
 * Tymsa API
 * API for Tymsa time-tracking
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { Project } from './Project';
import {
    ProjectFromJSON,
    ProjectFromJSONTyped,
    ProjectToJSON,
} from './Project';

/**
 * 
 * @export
 * @interface Timer
 */
export interface Timer {
    /**
     * 
     * @type {number}
     * @memberof Timer
     */
    readonly id: number;
    /**
     * 
     * @type {string}
     * @memberof Timer
     */
    readonly url: string;
    /**
     * 
     * @type {number}
     * @memberof Timer
     */
    readonly timesince: number;
    /**
     * 
     * @type {Project}
     * @memberof Timer
     */
    project: Project;
    /**
     * 
     * @type {Date}
     * @memberof Timer
     */
    readonly startDatetime: Date;
    /**
     * 
     * @type {Date}
     * @memberof Timer
     */
    readonly endDatetime: Date | null;
    /**
     * 
     * @type {string}
     * @memberof Timer
     */
    note?: string;
    /**
     * 
     * @type {string}
     * @memberof Timer
     */
    readonly duration: string | null;
}

/**
 * Check if a given object implements the Timer interface.
 */
export function instanceOfTimer(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "url" in value;
    isInstance = isInstance && "timesince" in value;
    isInstance = isInstance && "project" in value;
    isInstance = isInstance && "startDatetime" in value;
    isInstance = isInstance && "endDatetime" in value;
    isInstance = isInstance && "duration" in value;

    return isInstance;
}

export function TimerFromJSON(json: any): Timer {
    return TimerFromJSONTyped(json, false);
}

export function TimerFromJSONTyped(json: any, ignoreDiscriminator: boolean): Timer {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'url': json['url'],
        'timesince': json['timesince'],
        'project': ProjectFromJSON(json['project']),
        'startDatetime': (new Date(json['start_datetime'])),
        'endDatetime': (json['end_datetime'] === null ? null : new Date(json['end_datetime'])),
        'note': !exists(json, 'note') ? undefined : json['note'],
        'duration': json['duration'],
    };
}

export function TimerToJSON(value?: Timer | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'project': ProjectToJSON(value.project),
        'note': value.note,
    };
}

