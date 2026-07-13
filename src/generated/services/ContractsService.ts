/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { paths_1agents_get_responses_200_content_application_1json_schema_properties_meta } from '../models/paths_1agents_get_responses_200_content_application_1json_schema_properties_meta';
import type { paths_1my_1agent_get_responses_200_content_application_1json_schema_properties_data } from '../models/paths_1my_1agent_get_responses_200_content_application_1json_schema_properties_data';
import type { paths_1my_1contracts_1_contractId_get_responses_200_content_application_1json_schema_properties_data } from '../models/paths_1my_1contracts_1_contractId_get_responses_200_content_application_1json_schema_properties_data';
import type { paths_1my_1ships_1_shipSymbol_1cargo_get_responses_200_content_application_1json_schema_properties_data } from '../models/paths_1my_1ships_1_shipSymbol_1cargo_get_responses_200_content_application_1json_schema_properties_data';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ContractsService {
    /**
     * List Contracts
     * Return a paginated list of all your contracts.
     * @param page What entry offset to request
     * @param limit How many entries to return per page
     * @returns any Successfully listed contracts.
     * @throws ApiError
     */
    public static getContracts(
        page: number = 1,
        limit: number = 10,
    ): CancelablePromise<{
        data: Array<paths_1my_1contracts_1_contractId_get_responses_200_content_application_1json_schema_properties_data>;
        meta: paths_1agents_get_responses_200_content_application_1json_schema_properties_meta;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/my/contracts',
            query: {
                'page': page,
                'limit': limit,
            },
        });
    }
    /**
     * Get Contract
     * Get the details of a contract by ID.
     * @param contractId The contract ID
     * @returns any Successfully fetched contract.
     * @throws ApiError
     */
    public static getContract(
        contractId: string,
    ): CancelablePromise<{
        /**
         * Contract details.
         */
        data: {
            /**
             * ID of the contract.
             */
            id: string;
            /**
             * The symbol of the faction that this contract is for.
             */
            factionSymbol: string;
            /**
             * Type of contract.
             */
            type: 'PROCUREMENT' | 'TRANSPORT' | 'SHUTTLE';
            /**
             * The terms to fulfill the contract.
             */
            terms: {
                /**
                 * The deadline for the contract.
                 */
                deadline: string;
                /**
                 * Payments for the contract.
                 */
                payment: {
                    /**
                     * The amount of credits received up front for accepting the contract.
                     */
                    onAccepted: number;
                    /**
                     * The amount of credits received when the contract is fulfilled.
                     */
                    onFulfilled: number;
                };
                /**
                 * The cargo that needs to be delivered to fulfill the contract.
                 */
                deliver?: Array<{
                    /**
                     * The symbol of the trade good to deliver.
                     */
                    tradeSymbol: string;
                    /**
                     * The destination where goods need to be delivered.
                     */
                    destinationSymbol: string;
                    /**
                     * The number of units that need to be delivered on this contract.
                     */
                    unitsRequired: number;
                    /**
                     * The number of units fulfilled on this contract.
                     */
                    unitsFulfilled: number;
                }>;
            };
            /**
             * Whether the contract has been accepted by the agent
             */
            accepted: boolean;
            /**
             * Whether the contract has been fulfilled
             */
            fulfilled: boolean;
            /**
             * Deprecated in favor of deadlineToAccept
             * @deprecated
             */
            expiration: string;
            /**
             * The time at which the contract is no longer available to be accepted
             */
            deadlineToAccept?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/my/contracts/{contractId}',
            path: {
                'contractId': contractId,
            },
        });
    }
    /**
     * Accept Contract
     * Accept a contract by ID.
     *
     * You can only accept contracts that were offered to you, were not accepted yet, and whose deadlines has not passed yet.
     * @param contractId The contract ID to accept.
     * @returns any Successfully accepted contract.
     * @throws ApiError
     */
    public static acceptContract(
        contractId: string,
    ): CancelablePromise<{
        data: {
            agent: paths_1my_1agent_get_responses_200_content_application_1json_schema_properties_data;
            contract: paths_1my_1contracts_1_contractId_get_responses_200_content_application_1json_schema_properties_data;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/contracts/{contractId}/accept',
            path: {
                'contractId': contractId,
            },
        });
    }
    /**
     * Deliver Cargo to Contract
     * Deliver cargo to a contract.
     *
     * In order to use this API, a ship must be at the delivery location (denoted in the delivery terms as `destinationSymbol` of a contract) and must have a number of units of a good required by this contract in its cargo.
     *
     * Cargo that was delivered will be removed from the ship's cargo.
     * @param contractId The ID of the contract.
     * @param requestBody
     * @returns any Successfully delivered cargo to contract.
     * @throws ApiError
     */
    public static deliverContract(
        contractId: string,
        requestBody?: {
            /**
             * Symbol of a ship located in the destination to deliver a contract and that has a good to deliver in its cargo.
             */
            shipSymbol: string;
            /**
             * The symbol of the good to deliver.
             */
            tradeSymbol: string;
            /**
             * Amount of units to deliver.
             */
            units: number;
        },
    ): CancelablePromise<{
        data: {
            contract: paths_1my_1contracts_1_contractId_get_responses_200_content_application_1json_schema_properties_data;
            cargo: paths_1my_1ships_1_shipSymbol_1cargo_get_responses_200_content_application_1json_schema_properties_data;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/contracts/{contractId}/deliver',
            path: {
                'contractId': contractId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Fulfill Contract
     * Fulfill a contract. Can only be used on contracts that have all of their delivery terms fulfilled.
     * @param contractId The ID of the contract to fulfill.
     * @returns any Successfully fulfilled a contract.
     * @throws ApiError
     */
    public static fulfillContract(
        contractId: string,
    ): CancelablePromise<{
        data: {
            agent: paths_1my_1agent_get_responses_200_content_application_1json_schema_properties_data;
            contract: paths_1my_1contracts_1_contractId_get_responses_200_content_application_1json_schema_properties_data;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/contracts/{contractId}/fulfill',
            path: {
                'contractId': contractId,
            },
        });
    }
}
