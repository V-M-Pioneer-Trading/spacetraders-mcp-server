/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DataService {
    /**
     * Get Supply Chain
     * Describes which import and exports map to each other.
     * @returns any Successfully retrieved the supply chain information
     * @throws ApiError
     */
    public static getSupplyChain(): CancelablePromise<{
        data: {
            exportToImportMap: Record<string, Array<string>>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/market/supply-chain',
        });
    }
}
