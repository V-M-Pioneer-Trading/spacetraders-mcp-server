/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { paths_1my_1agent_get_responses_200_content_application_1json_schema_properties_data } from '../models/paths_1my_1agent_get_responses_200_content_application_1json_schema_properties_data';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AgentsService {
    /**
     * Get Agent
     * Fetch your agent's details.
     * @returns any Successfully fetched agent details.
     * @throws ApiError
     */
    public static getMyAgent(): CancelablePromise<{
        /**
         * Agent details.
         */
        data: {
            /**
             * Account ID that is tied to this agent. Only included on your own agent.
             */
            accountId?: string;
            /**
             * Symbol of the agent.
             */
            symbol: string;
            /**
             * The headquarters of the agent.
             */
            headquarters: string;
            /**
             * The number of credits the agent has available. Credits can be negative if funds have been overdrawn.
             */
            credits: number;
            /**
             * The faction the agent started with.
             */
            startingFaction: string;
            /**
             * How many ships are owned by the agent.
             */
            shipCount: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/my/agent',
        });
    }
    /**
     * List Agents
     * Fetch agents details.
     * @param page What entry offset to request
     * @param limit How many entries to return per page
     * @returns any Successfully fetched agents details.
     * @throws ApiError
     */
    public static getAgents(
        page: number = 1,
        limit: number = 10,
    ): CancelablePromise<{
        data: Array<paths_1my_1agent_get_responses_200_content_application_1json_schema_properties_data>;
        /**
         * Meta details for pagination.
         */
        meta: {
            /**
             * Shows the total amount of items of this kind that exist.
             */
            total: number;
            /**
             * A page denotes an amount of items, offset from the first item. Each page holds an amount of items equal to the `limit`.
             */
            page: number;
            /**
             * The amount of items in each page. Limits how many items can be fetched at once.
             */
            limit: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/agents',
            query: {
                'page': page,
                'limit': limit,
            },
        });
    }
    /**
     * Get Public Agent
     * Fetch agent details.
     * @param agentSymbol The agent symbol
     * @returns any Successfully fetched agent details.
     * @throws ApiError
     */
    public static getAgent(
        agentSymbol: string = 'FEBA66',
    ): CancelablePromise<{
        data: paths_1my_1agent_get_responses_200_content_application_1json_schema_properties_data;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/agents/{agentSymbol}',
            path: {
                'agentSymbol': agentSymbol,
            },
        });
    }
}
