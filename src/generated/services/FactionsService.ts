/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { paths_1agents_get_responses_200_content_application_1json_schema_properties_meta } from '../models/paths_1agents_get_responses_200_content_application_1json_schema_properties_meta';
import type { paths_1factions_1_factionSymbol_get_responses_200_content_application_1json_schema_properties_data } from '../models/paths_1factions_1_factionSymbol_get_responses_200_content_application_1json_schema_properties_data';
import type { paths_1register_post_requestBody_content_application_1json_schema_properties_faction } from '../models/paths_1register_post_requestBody_content_application_1json_schema_properties_faction';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FactionsService {
    /**
     * List Factions
     * Return a paginated list of all the factions in the game.
     * @param page What entry offset to request
     * @param limit How many entries to return per page
     * @returns any Successfully fetched factions.
     * @throws ApiError
     */
    public static getFactions(
        page: number = 1,
        limit: number = 10,
    ): CancelablePromise<{
        data: Array<paths_1factions_1_factionSymbol_get_responses_200_content_application_1json_schema_properties_data>;
        meta: paths_1agents_get_responses_200_content_application_1json_schema_properties_meta;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/factions',
            query: {
                'page': page,
                'limit': limit,
            },
        });
    }
    /**
     * Get Faction
     * View the details of a faction.
     * @param factionSymbol The faction symbol
     * @returns any Successfully fetched a faction.
     * @throws ApiError
     */
    public static getFaction(
        factionSymbol: string,
    ): CancelablePromise<{
        /**
         * Faction details.
         */
        data: {
            symbol: paths_1register_post_requestBody_content_application_1json_schema_properties_faction;
            /**
             * Name of the faction.
             */
            name: string;
            /**
             * Description of the faction.
             */
            description: string;
            /**
             * The waypoint in which the faction's HQ is located in.
             */
            headquarters?: string;
            /**
             * List of traits that define this faction.
             */
            traits: Array<{
                /**
                 * The unique identifier of the trait.
                 */
                symbol: 'BUREAUCRATIC' | 'SECRETIVE' | 'CAPITALISTIC' | 'INDUSTRIOUS' | 'PEACEFUL' | 'DISTRUSTFUL' | 'WELCOMING' | 'SMUGGLERS' | 'SCAVENGERS' | 'REBELLIOUS' | 'EXILES' | 'PIRATES' | 'RAIDERS' | 'CLAN' | 'GUILD' | 'DOMINION' | 'FRINGE' | 'FORSAKEN' | 'ISOLATED' | 'LOCALIZED' | 'ESTABLISHED' | 'NOTABLE' | 'DOMINANT' | 'INESCAPABLE' | 'INNOVATIVE' | 'BOLD' | 'VISIONARY' | 'CURIOUS' | 'DARING' | 'EXPLORATORY' | 'RESOURCEFUL' | 'FLEXIBLE' | 'COOPERATIVE' | 'UNITED' | 'STRATEGIC' | 'INTELLIGENT' | 'RESEARCH_FOCUSED' | 'COLLABORATIVE' | 'PROGRESSIVE' | 'MILITARISTIC' | 'TECHNOLOGICALLY_ADVANCED' | 'AGGRESSIVE' | 'IMPERIALISTIC' | 'TREASURE_HUNTERS' | 'DEXTEROUS' | 'UNPREDICTABLE' | 'BRUTAL' | 'FLEETING' | 'ADAPTABLE' | 'SELF_SUFFICIENT' | 'DEFENSIVE' | 'PROUD' | 'DIVERSE' | 'INDEPENDENT' | 'SELF_INTERESTED' | 'FRAGMENTED' | 'COMMERCIAL' | 'FREE_MARKETS' | 'ENTREPRENEURIAL';
                /**
                 * The name of the trait.
                 */
                name: string;
                /**
                 * A description of the trait.
                 */
                description: string;
            }>;
            /**
             * Whether or not the faction is currently recruiting new agents.
             */
            isRecruiting: boolean;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/factions/{factionSymbol}',
            path: {
                'factionSymbol': factionSymbol,
            },
        });
    }
}
