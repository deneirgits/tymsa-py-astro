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


import * as runtime from '../runtime';
import type {
  PatchedTimerUpdate,
  Timer,
  TimerNew,
  TimerUpdate,
} from '../models/index';
import {
    PatchedTimerUpdateFromJSON,
    PatchedTimerUpdateToJSON,
    TimerFromJSON,
    TimerToJSON,
    TimerNewFromJSON,
    TimerNewToJSON,
    TimerUpdateFromJSON,
    TimerUpdateToJSON,
} from '../models/index';

export interface TimersCurrentNewRequest {
    timerNew?: TimerNew;
}

export interface TimersEditRequest {
    id: string;
    patchedTimerUpdate?: PatchedTimerUpdate;
}

export interface TimersRetrieveRequest {
    id: number;
}

/**
 * 
 */
export class TimersApi extends runtime.BaseAPI {

    /**
     */
    async timersCurrentNewRaw(requestParameters: TimersCurrentNewRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TimerNew>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("jwtAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/timers/new/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: TimerNewToJSON(requestParameters.timerNew),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TimerNewFromJSON(jsonValue));
    }

    /**
     */
    async timersCurrentNew(requestParameters: TimersCurrentNewRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TimerNew> {
        const response = await this.timersCurrentNewRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async timersCurrentRetrieveRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Timer>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("jwtAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/timers/current/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TimerFromJSON(jsonValue));
    }

    /**
     */
    async timersCurrentRetrieve(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Timer> {
        const response = await this.timersCurrentRetrieveRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async timersEditRaw(requestParameters: TimersEditRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TimerUpdate>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling timersEdit.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("jwtAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/timers/{id}/edit/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: PatchedTimerUpdateToJSON(requestParameters.patchedTimerUpdate),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TimerUpdateFromJSON(jsonValue));
    }

    /**
     */
    async timersEdit(requestParameters: TimersEditRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TimerUpdate> {
        const response = await this.timersEditRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async timersListRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Timer>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("jwtAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/timers/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TimerFromJSON));
    }

    /**
     */
    async timersList(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Timer>> {
        const response = await this.timersListRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async timersRetrieveRaw(requestParameters: TimersRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Timer>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling timersRetrieve.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("jwtAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/timers/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TimerFromJSON(jsonValue));
    }

    /**
     */
    async timersRetrieve(requestParameters: TimersRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Timer> {
        const response = await this.timersRetrieveRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
