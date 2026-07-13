/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { paths_1factions_1_factionSymbol_get_responses_200_content_application_1json_schema_properties_data } from '../models/paths_1factions_1_factionSymbol_get_responses_200_content_application_1json_schema_properties_data';
import type { paths_1my_1agent_get_responses_200_content_application_1json_schema_properties_data } from '../models/paths_1my_1agent_get_responses_200_content_application_1json_schema_properties_data';
import type { paths_1my_1contracts_1_contractId_get_responses_200_content_application_1json_schema_properties_data } from '../models/paths_1my_1contracts_1_contractId_get_responses_200_content_application_1json_schema_properties_data';
import type { paths_1my_1ships_1_shipSymbol_get_responses_200_content_application_1json_schema_properties_data } from '../models/paths_1my_1ships_1_shipSymbol_get_responses_200_content_application_1json_schema_properties_data';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GlobalService {
    /**
     * Get Status
     * Return the status of the game server.
     * This also includes a few global elements, such as announcements, server reset dates and leaderboards.
     * @returns any Fetched status successfully.
     * @throws ApiError
     */
    public static getStatus(): CancelablePromise<{
        /**
         * The current status of the game server.
         */
        status: string;
        /**
         * The current version of the API.
         */
        version: string;
        /**
         * The date when the game server was last reset.
         */
        resetDate: string;
        description: string;
        stats: {
            /**
             * Total number of accounts registered on the game server.
             */
            accounts?: number;
            /**
             * Number of registered agents in the game.
             */
            agents: number;
            /**
             * Total number of ships in the game.
             */
            ships: number;
            /**
             * Total number of systems in the game.
             */
            systems: number;
            /**
             * Total number of waypoints in the game.
             */
            waypoints: number;
        };
        leaderboards: {
            /**
             * Top agents with the most credits.
             */
            mostCredits: Array<{
                /**
                 * Symbol of the agent.
                 */
                agentSymbol: string;
                /**
                 * Amount of credits.
                 */
                credits: number;
            }>;
            /**
             * Top agents with the most charted submitted.
             */
            mostSubmittedCharts: Array<{
                /**
                 * Symbol of the agent.
                 */
                agentSymbol: string;
                /**
                 * Amount of charts done by the agent.
                 */
                chartCount: number;
            }>;
        };
        serverResets: {
            /**
             * The date and time when the game server will reset.
             */
            next: string;
            /**
             * How often we intend to reset the game server.
             */
            frequency: string;
        };
        announcements: Array<{
            title: string;
            body: string;
        }>;
        links: Array<{
            name: string;
            url: string;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }
    /**
     * Register New Agent
     * Creates a new agent and ties it to an account.
     * The agent symbol must consist of a 3-14 character string, and will be used to represent your agent. This symbol will prefix the symbol of every ship you own. Agent symbols will be cast to all uppercase characters.
     *
     * This new agent will be tied to a starting faction of your choice, which determines your starting location, and will be granted an authorization token, a contract with their starting faction, a command ship that can fly across space with advanced capabilities, a small probe ship that can be used for reconnaissance, and 175,000 credits.
     *
     * > #### Keep your token safe and secure
     * >
     * > Keep careful track of where you store your token. You can generate a new token from our account dashboard, but if someone else gains access to your token they will be able to use it to make API requests on your behalf until the end of the reset.
     *
     * If you are new to SpaceTraders, It is recommended to register with the COSMIC faction, a faction that is well connected to the rest of the universe. After registering, you should try our interactive [quickstart guide](https://docs.spacetraders.io/quickstart/new-game) which will walk you through a few basic API requests in just a few minutes.
     * @param requestBody
     * @returns any Successfully registered.
     * @throws ApiError
     */
    public static register(
        requestBody?: {
            /**
             * The symbol of the faction.
             */
            faction: 'COSMIC' | 'VOID' | 'GALACTIC' | 'QUANTUM' | 'DOMINION' | 'ASTRO' | 'CORSAIRS' | 'OBSIDIAN' | 'AEGIS' | 'UNITED' | 'SOLITARY' | 'COBALT' | 'OMEGA' | 'ECHO' | 'LORDS' | 'CULT' | 'ANCIENTS' | 'SHADOW' | 'ETHEREAL';
            /**
             * Your desired agent symbol. This will be a unique name used to represent your agent, and will be the prefix for your ships.
             */
            symbol: string;
            /**
             * Your email address. This is used if you reserved your call sign between resets.
             */
            email?: string;
        },
    ): CancelablePromise<{
        data: {
            agent: paths_1my_1agent_get_responses_200_content_application_1json_schema_properties_data;
            contract: paths_1my_1contracts_1_contractId_get_responses_200_content_application_1json_schema_properties_data;
            faction: paths_1factions_1_factionSymbol_get_responses_200_content_application_1json_schema_properties_data;
            ships?: Array<paths_1my_1ships_1_shipSymbol_get_responses_200_content_application_1json_schema_properties_data>;
            /**
             * A Bearer token for accessing secured API endpoints.
             */
            token: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
