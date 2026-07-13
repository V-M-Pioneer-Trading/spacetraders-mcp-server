/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { paths_1agents_get_responses_200_content_application_1json_schema_properties_meta } from '../models/paths_1agents_get_responses_200_content_application_1json_schema_properties_meta';
import type { paths_1my_1agent_get_responses_200_content_application_1json_schema_properties_data } from '../models/paths_1my_1agent_get_responses_200_content_application_1json_schema_properties_data';
import type { paths_1my_1contracts_1_contractId_get_responses_200_content_application_1json_schema_properties_data } from '../models/paths_1my_1contracts_1_contractId_get_responses_200_content_application_1json_schema_properties_data';
import type { paths_1my_1ships_1_shipSymbol_1cargo_get_responses_200_content_application_1json_schema_properties_data } from '../models/paths_1my_1ships_1_shipSymbol_1cargo_get_responses_200_content_application_1json_schema_properties_data';
import type { paths_1my_1ships_1_shipSymbol_1chart_post_responses_201_content_application_1json_schema_properties_data_properties_chart } from '../models/paths_1my_1ships_1_shipSymbol_1chart_post_responses_201_content_application_1json_schema_properties_data_properties_chart';
import type { paths_1my_1ships_1_shipSymbol_1cooldown_get_responses_200_content_application_1json_schema_properties_data } from '../models/paths_1my_1ships_1_shipSymbol_1cooldown_get_responses_200_content_application_1json_schema_properties_data';
import type { paths_1my_1ships_1_shipSymbol_1extract_1survey_post_requestBody_content_application_1json_schema } from '../models/paths_1my_1ships_1_shipSymbol_1extract_1survey_post_requestBody_content_application_1json_schema';
import type { paths_1my_1ships_1_shipSymbol_1extract_post_responses_201_content_application_1json_schema_properties_data_properties_extraction } from '../models/paths_1my_1ships_1_shipSymbol_1extract_post_responses_201_content_application_1json_schema_properties_data_properties_extraction';
import type { paths_1my_1ships_1_shipSymbol_1jump_post_responses_200_content_application_1json_schema_properties_data_properties_transaction } from '../models/paths_1my_1ships_1_shipSymbol_1jump_post_responses_200_content_application_1json_schema_properties_data_properties_transaction';
import type { paths_1my_1ships_1_shipSymbol_1modules_get_responses_200_content_application_1json_schema_properties_data_items } from '../models/paths_1my_1ships_1_shipSymbol_1modules_get_responses_200_content_application_1json_schema_properties_data_items';
import type { paths_1my_1ships_1_shipSymbol_1mounts_1remove_post_responses_201_content_application_1json_schema_properties_data_properties_transaction } from '../models/paths_1my_1ships_1_shipSymbol_1mounts_1remove_post_responses_201_content_application_1json_schema_properties_data_properties_transaction';
import type { paths_1my_1ships_1_shipSymbol_1mounts_get_responses_200_content_application_1json_schema_properties_data_items } from '../models/paths_1my_1ships_1_shipSymbol_1mounts_get_responses_200_content_application_1json_schema_properties_data_items';
import type { paths_1my_1ships_1_shipSymbol_1mounts_get_responses_200_content_application_1json_schema_properties_data_items_properties_requirements } from '../models/paths_1my_1ships_1_shipSymbol_1mounts_get_responses_200_content_application_1json_schema_properties_data_items_properties_requirements';
import type { paths_1my_1ships_1_shipSymbol_1nav_get_responses_200_content_application_1json_schema_properties_data } from '../models/paths_1my_1ships_1_shipSymbol_1nav_get_responses_200_content_application_1json_schema_properties_data';
import type { paths_1my_1ships_1_shipSymbol_1nav_get_responses_200_content_application_1json_schema_properties_data_properties_route_properties_origin } from '../models/paths_1my_1ships_1_shipSymbol_1nav_get_responses_200_content_application_1json_schema_properties_data_properties_route_properties_origin';
import type { paths_1my_1ships_1_shipSymbol_1nav_get_responses_200_content_application_1json_schema_properties_data_properties_systemSymbol } from '../models/paths_1my_1ships_1_shipSymbol_1nav_get_responses_200_content_application_1json_schema_properties_data_properties_systemSymbol';
import type { paths_1my_1ships_1_shipSymbol_1nav_get_responses_200_content_application_1json_schema_properties_data_properties_waypointSymbol } from '../models/paths_1my_1ships_1_shipSymbol_1nav_get_responses_200_content_application_1json_schema_properties_data_properties_waypointSymbol';
import type { paths_1my_1ships_1_shipSymbol_1nav_patch_requestBody_content_application_1json_schema_properties_flightMode } from '../models/paths_1my_1ships_1_shipSymbol_1nav_patch_requestBody_content_application_1json_schema_properties_flightMode';
import type { paths_1my_1ships_1_shipSymbol_1nav_patch_responses_200_content_application_1json_schema_properties_data_properties_events_items } from '../models/paths_1my_1ships_1_shipSymbol_1nav_patch_responses_200_content_application_1json_schema_properties_data_properties_events_items';
import type { paths_1my_1ships_1_shipSymbol_1nav_patch_responses_200_content_application_1json_schema_properties_data_properties_fuel } from '../models/paths_1my_1ships_1_shipSymbol_1nav_patch_responses_200_content_application_1json_schema_properties_data_properties_fuel';
import type { paths_1my_1ships_1_shipSymbol_1repair_get_responses_200_content_application_1json_schema_properties_data_properties_transaction } from '../models/paths_1my_1ships_1_shipSymbol_1repair_get_responses_200_content_application_1json_schema_properties_data_properties_transaction';
import type { paths_1my_1ships_1_shipSymbol_1scrap_get_responses_200_content_application_1json_schema_properties_data_properties_transaction } from '../models/paths_1my_1ships_1_shipSymbol_1scrap_get_responses_200_content_application_1json_schema_properties_data_properties_transaction';
import type { paths_1my_1ships_1_shipSymbol_1sell_post_requestBody_content_application_1json_schema_properties_symbol } from '../models/paths_1my_1ships_1_shipSymbol_1sell_post_requestBody_content_application_1json_schema_properties_symbol';
import type { paths_1my_1ships_1_shipSymbol_get_responses_200_content_application_1json_schema_properties_data } from '../models/paths_1my_1ships_1_shipSymbol_get_responses_200_content_application_1json_schema_properties_data';
import type { paths_1my_1ships_1_shipSymbol_get_responses_200_content_application_1json_schema_properties_data_properties_frame_properties_condition } from '../models/paths_1my_1ships_1_shipSymbol_get_responses_200_content_application_1json_schema_properties_data_properties_frame_properties_condition';
import type { paths_1my_1ships_1_shipSymbol_get_responses_200_content_application_1json_schema_properties_data_properties_frame_properties_integrity } from '../models/paths_1my_1ships_1_shipSymbol_get_responses_200_content_application_1json_schema_properties_data_properties_frame_properties_integrity';
import type { paths_1my_1ships_1_shipSymbol_get_responses_200_content_application_1json_schema_properties_data_properties_frame_properties_quality } from '../models/paths_1my_1ships_1_shipSymbol_get_responses_200_content_application_1json_schema_properties_data_properties_frame_properties_quality';
import type { paths_1my_1ships_1_shipSymbol_get_responses_200_content_application_1json_schema_properties_data_properties_registration } from '../models/paths_1my_1ships_1_shipSymbol_get_responses_200_content_application_1json_schema_properties_data_properties_registration';
import type { paths_1systems_1_systemSymbol_1waypoints_1_waypointSymbol_get_responses_200_content_application_1json_schema_properties_data } from '../models/paths_1systems_1_systemSymbol_1waypoints_1_waypointSymbol_get_responses_200_content_application_1json_schema_properties_data';
import type { paths_1systems_1_systemSymbol_1waypoints_1_waypointSymbol_get_responses_200_content_application_1json_schema_properties_data_properties_faction } from '../models/paths_1systems_1_systemSymbol_1waypoints_1_waypointSymbol_get_responses_200_content_application_1json_schema_properties_data_properties_faction';
import type { paths_1systems_1_systemSymbol_1waypoints_1_waypointSymbol_get_responses_200_content_application_1json_schema_properties_data_properties_orbitals_items } from '../models/paths_1systems_1_systemSymbol_1waypoints_1_waypointSymbol_get_responses_200_content_application_1json_schema_properties_data_properties_orbitals_items';
import type { paths_1systems_1_systemSymbol_1waypoints_1_waypointSymbol_get_responses_200_content_application_1json_schema_properties_data_properties_traits_items } from '../models/paths_1systems_1_systemSymbol_1waypoints_1_waypointSymbol_get_responses_200_content_application_1json_schema_properties_data_properties_traits_items';
import type { paths_1systems_1_systemSymbol_1waypoints_get_parameters_2_schema } from '../models/paths_1systems_1_systemSymbol_1waypoints_get_parameters_2_schema';
import type { paths_1systems_1_systemSymbol_get_responses_200_content_application_1json_schema_properties_data_properties_type } from '../models/paths_1systems_1_systemSymbol_get_responses_200_content_application_1json_schema_properties_data_properties_type';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FleetService {
    /**
     * List Ships
     * Return a paginated list of all of ships under your agent's ownership.
     * @param page What entry offset to request
     * @param limit How many entries to return per page
     * @returns any Successfully listed ships.
     * @throws ApiError
     */
    public static getMyShips(
        page: number = 1,
        limit: number = 10,
    ): CancelablePromise<{
        data: Array<paths_1my_1ships_1_shipSymbol_get_responses_200_content_application_1json_schema_properties_data>;
        meta: paths_1agents_get_responses_200_content_application_1json_schema_properties_meta;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/my/ships',
            query: {
                'page': page,
                'limit': limit,
            },
        });
    }
    /**
     * Purchase Ship
     * Purchase a ship from a Shipyard. In order to use this function, a ship under your agent's ownership must be in a waypoint that has the `Shipyard` trait, and the Shipyard must sell the type of the desired ship.
     *
     * Shipyards typically offer ship types, which are predefined templates of ships that have dedicated roles. A template comes with a preset of an engine, a reactor, and a frame. It may also include a few modules and mounts.
     * @param requestBody
     * @returns any Purchased ship successfully.
     * @throws ApiError
     */
    public static purchaseShip(
        requestBody?: {
            /**
             * Type of ship
             */
            shipType: 'SHIP_PROBE' | 'SHIP_MINING_DRONE' | 'SHIP_SIPHON_DRONE' | 'SHIP_INTERCEPTOR' | 'SHIP_LIGHT_HAULER' | 'SHIP_COMMAND_FRIGATE' | 'SHIP_EXPLORER' | 'SHIP_HEAVY_FREIGHTER' | 'SHIP_LIGHT_SHUTTLE' | 'SHIP_ORE_HOUND' | 'SHIP_REFINING_FREIGHTER' | 'SHIP_SURVEYOR' | 'SHIP_BULK_FREIGHTER';
            /**
             * The symbol of the waypoint you want to purchase the ship at.
             */
            waypointSymbol: string;
        },
    ): CancelablePromise<{
        data: {
            agent: paths_1my_1agent_get_responses_200_content_application_1json_schema_properties_data;
            ship: paths_1my_1ships_1_shipSymbol_get_responses_200_content_application_1json_schema_properties_data;
            /**
             * Results of a transaction with a shipyard.
             */
            transaction: {
                waypointSymbol: paths_1my_1ships_1_shipSymbol_1nav_get_responses_200_content_application_1json_schema_properties_data_properties_waypointSymbol;
                /**
                 * The symbol of the ship type (e.g. SHIP_MINING_DRONE) that was the subject of the transaction. Contrary to what the name implies, this is NOT the symbol of the ship that was purchased.
                 * @deprecated
                 */
                shipSymbol: string;
                /**
                 * The symbol of the ship type (e.g. SHIP_MINING_DRONE) that was the subject of the transaction.
                 */
                shipType: string;
                /**
                 * The price of the transaction.
                 */
                price: number;
                /**
                 * The symbol of the agent that made the transaction.
                 */
                agentSymbol: string;
                /**
                 * The timestamp of the transaction.
                 */
                timestamp: string;
            };
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get Ship
     * Retrieve the details of a ship under your agent's ownership.
     * @param shipSymbol The symbol of the ship.
     * @returns any Successfully fetched ship.
     * @throws ApiError
     */
    public static getMyShip(
        shipSymbol: string,
    ): CancelablePromise<{
        /**
         * Ship details.
         */
        data: {
            /**
             * The globally unique identifier of the ship in the following format: `[AGENT_SYMBOL]-[HEX_ID]`
             */
            symbol: string;
            /**
             * The public registration information of the ship
             */
            registration: {
                /**
                 * The agent's registered name of the ship
                 */
                name: string;
                /**
                 * The symbol of the faction the ship is registered with
                 */
                factionSymbol: string;
                /**
                 * The registered role of the ship
                 */
                role: 'FABRICATOR' | 'HARVESTER' | 'HAULER' | 'INTERCEPTOR' | 'EXCAVATOR' | 'TRANSPORT' | 'REPAIR' | 'SURVEYOR' | 'COMMAND' | 'CARRIER' | 'PATROL' | 'SATELLITE' | 'EXPLORER' | 'REFINERY';
            };
            nav: paths_1my_1ships_1_shipSymbol_1nav_get_responses_200_content_application_1json_schema_properties_data;
            /**
             * The ship's crew service and maintain the ship's systems and equipment.
             */
            crew: {
                /**
                 * The current number of crew members on the ship.
                 */
                current: number;
                /**
                 * The minimum number of crew members required to maintain the ship.
                 */
                required: number;
                /**
                 * The maximum number of crew members the ship can support.
                 */
                capacity: number;
                /**
                 * The rotation of crew shifts. A stricter shift improves the ship's performance. A more relaxed shift improves the crew's morale.
                 */
                rotation: 'STRICT' | 'RELAXED';
                /**
                 * A rough measure of the crew's morale. A higher morale means the crew is happier and more productive. A lower morale means the ship is more prone to accidents.
                 */
                morale: number;
                /**
                 * The amount of credits per crew member paid per hour. Wages are paid when a ship docks at a civilized waypoint.
                 */
                wages: number;
            };
            /**
             * The frame of the ship. The frame determines the number of modules and mounting points of the ship, as well as base fuel capacity. As the condition of the frame takes more wear, the ship will become more sluggish and less maneuverable.
             */
            frame: {
                /**
                 * Symbol of the frame.
                 */
                symbol: 'FRAME_PROBE' | 'FRAME_DRONE' | 'FRAME_INTERCEPTOR' | 'FRAME_RACER' | 'FRAME_FIGHTER' | 'FRAME_FRIGATE' | 'FRAME_SHUTTLE' | 'FRAME_EXPLORER' | 'FRAME_MINER' | 'FRAME_LIGHT_FREIGHTER' | 'FRAME_HEAVY_FREIGHTER' | 'FRAME_TRANSPORT' | 'FRAME_DESTROYER' | 'FRAME_CRUISER' | 'FRAME_CARRIER' | 'FRAME_BULK_FREIGHTER';
                /**
                 * Name of the frame.
                 */
                name: string;
                /**
                 * Description of the frame.
                 */
                description: string;
                /**
                 * The repairable condition of a component. A value of 0 indicates the component needs significant repairs, while a value of 1 indicates the component is in near perfect condition. As the condition of a component is repaired, the overall integrity of the component decreases.
                 */
                condition: number;
                /**
                 * The overall integrity of the component, which determines the performance of the component. A value of 0 indicates that the component is almost completely degraded, while a value of 1 indicates that the component is in near perfect condition. The integrity of the component is non-repairable, and represents permanent wear over time.
                 */
                integrity: number;
                /**
                 * The amount of slots that can be dedicated to modules installed in the ship. Each installed module take up a number of slots, and once there are no more slots, no new modules can be installed.
                 */
                moduleSlots: number;
                /**
                 * The amount of slots that can be dedicated to mounts installed in the ship. Each installed mount takes up a number of points, and once there are no more points remaining, no new mounts can be installed.
                 */
                mountingPoints: number;
                /**
                 * The maximum amount of fuel that can be stored in this ship. When refueling, the ship will be refueled to this amount.
                 */
                fuelCapacity: number;
                requirements: paths_1my_1ships_1_shipSymbol_1mounts_get_responses_200_content_application_1json_schema_properties_data_items_properties_requirements;
                /**
                 * The overall quality of the component, which determines the quality of the component. High quality components return more ships parts and ship plating when a ship is scrapped. But also require more of these parts to repair. This is transparent to the player, as the parts are bought from/sold to the marketplace.
                 */
                quality: number;
            };
            /**
             * The reactor of the ship. The reactor is responsible for powering the ship's systems and weapons.
             */
            reactor: {
                /**
                 * Symbol of the reactor.
                 */
                symbol: 'REACTOR_SOLAR_I' | 'REACTOR_FUSION_I' | 'REACTOR_FISSION_I' | 'REACTOR_CHEMICAL_I' | 'REACTOR_ANTIMATTER_I';
                /**
                 * Name of the reactor.
                 */
                name: string;
                /**
                 * Description of the reactor.
                 */
                description: string;
                condition: paths_1my_1ships_1_shipSymbol_get_responses_200_content_application_1json_schema_properties_data_properties_frame_properties_condition;
                integrity: paths_1my_1ships_1_shipSymbol_get_responses_200_content_application_1json_schema_properties_data_properties_frame_properties_integrity;
                /**
                 * The amount of power provided by this reactor. The more power a reactor provides to the ship, the lower the cooldown it gets when using a module or mount that taxes the ship's power.
                 */
                powerOutput: number;
                requirements: paths_1my_1ships_1_shipSymbol_1mounts_get_responses_200_content_application_1json_schema_properties_data_items_properties_requirements;
                quality: paths_1my_1ships_1_shipSymbol_get_responses_200_content_application_1json_schema_properties_data_properties_frame_properties_quality;
            };
            /**
             * The engine determines how quickly a ship travels between waypoints.
             */
            engine: {
                /**
                 * The symbol of the engine.
                 */
                symbol: 'ENGINE_IMPULSE_DRIVE_I' | 'ENGINE_ION_DRIVE_I' | 'ENGINE_ION_DRIVE_II' | 'ENGINE_HYPER_DRIVE_I';
                /**
                 * The name of the engine.
                 */
                name: string;
                /**
                 * The description of the engine.
                 */
                description: string;
                condition: paths_1my_1ships_1_shipSymbol_get_responses_200_content_application_1json_schema_properties_data_properties_frame_properties_condition;
                integrity: paths_1my_1ships_1_shipSymbol_get_responses_200_content_application_1json_schema_properties_data_properties_frame_properties_integrity;
                /**
                 * The speed stat of this engine. The higher the speed, the faster a ship can travel from one point to another. Reduces the time of arrival when navigating the ship.
                 */
                speed: number;
                requirements: paths_1my_1ships_1_shipSymbol_1mounts_get_responses_200_content_application_1json_schema_properties_data_items_properties_requirements;
                quality: paths_1my_1ships_1_shipSymbol_get_responses_200_content_application_1json_schema_properties_data_properties_frame_properties_quality;
            };
            cooldown: paths_1my_1ships_1_shipSymbol_1cooldown_get_responses_200_content_application_1json_schema_properties_data;
            /**
             * Modules installed in this ship.
             */
            modules: Array<paths_1my_1ships_1_shipSymbol_1modules_get_responses_200_content_application_1json_schema_properties_data_items>;
            /**
             * Mounts installed in this ship.
             */
            mounts: Array<paths_1my_1ships_1_shipSymbol_1mounts_get_responses_200_content_application_1json_schema_properties_data_items>;
            cargo: paths_1my_1ships_1_shipSymbol_1cargo_get_responses_200_content_application_1json_schema_properties_data;
            fuel: paths_1my_1ships_1_shipSymbol_1nav_patch_responses_200_content_application_1json_schema_properties_data_properties_fuel;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/my/ships/{shipSymbol}',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Get Ship Cargo
     * Retrieve the cargo of a ship under your agent's ownership.
     * @param shipSymbol The symbol of the ship.
     * @returns any Successfully fetched ship's cargo.
     * @throws ApiError
     */
    public static getMyShipCargo(
        shipSymbol: string,
    ): CancelablePromise<{
        /**
         * Ship cargo details.
         */
        data: {
            /**
             * The max number of items that can be stored in the cargo hold.
             */
            capacity: number;
            /**
             * The number of items currently stored in the cargo hold.
             */
            units: number;
            /**
             * The items currently in the cargo hold.
             */
            inventory: Array<{
                symbol: paths_1my_1ships_1_shipSymbol_1sell_post_requestBody_content_application_1json_schema_properties_symbol;
                /**
                 * The name of the cargo item type.
                 */
                name: string;
                /**
                 * The description of the cargo item type.
                 */
                description: string;
                /**
                 * The number of units of the cargo item.
                 */
                units: number;
            }>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/my/ships/{shipSymbol}/cargo',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Orbit Ship
     * Attempt to move your ship into orbit at its current location. The request will only succeed if your ship is capable of moving into orbit at the time of the request.
     *
     * Orbiting ships are able to do actions that require the ship to be above surface such as navigating or extracting, but cannot access elements in their current waypoint, such as the market or a shipyard.
     *
     * The endpoint is idempotent - successive calls will succeed even if the ship is already in orbit.
     * @param shipSymbol The symbol of the ship.
     * @returns any The ship has successfully moved into orbit at its current location.
     * @throws ApiError
     */
    public static orbitShip(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            nav: paths_1my_1ships_1_shipSymbol_1nav_get_responses_200_content_application_1json_schema_properties_data;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/orbit',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Ship Refine
     * Attempt to refine the raw materials on your ship. The request will only succeed if your ship is capable of refining at the time of the request. In order to be able to refine, a ship must have goods that can be refined and have installed a `Refinery` module that can refine it.
     *
     * When refining, 100 basic goods will be converted into 10 processed goods.
     * @param shipSymbol The symbol of the ship.
     * @param requestBody
     * @returns any The ship has successfully refined goods.
     * @throws ApiError
     */
    public static shipRefine(
        shipSymbol: string,
        requestBody?: {
            /**
             * The type of good to produce out of the refining process.
             */
            produce: 'IRON' | 'COPPER' | 'SILVER' | 'GOLD' | 'ALUMINUM' | 'PLATINUM' | 'URANITE' | 'MERITIUM' | 'FUEL';
        },
    ): CancelablePromise<{
        data: {
            cargo: paths_1my_1ships_1_shipSymbol_1cargo_get_responses_200_content_application_1json_schema_properties_data;
            cooldown: paths_1my_1ships_1_shipSymbol_1cooldown_get_responses_200_content_application_1json_schema_properties_data;
            /**
             * Goods that were produced by this refining process.
             */
            produced: Array<{
                /**
                 * Symbol of the good.
                 */
                tradeSymbol: string;
                /**
                 * Amount of units of the good.
                 */
                units: number;
            }>;
            /**
             * Goods that were consumed during this refining process.
             */
            consumed: Array<{
                /**
                 * Symbol of the good.
                 */
                tradeSymbol: string;
                /**
                 * Amount of units of the good.
                 */
                units: number;
            }>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/refine',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Create Chart
     * Command a ship to chart the waypoint at its current location.
     *
     * Most waypoints in the universe are uncharted by default. These waypoints have their traits hidden until they have been charted by a ship.
     *
     * Charting a waypoint will record your agent as the one who created the chart, and all other agents would also be able to see the waypoint's traits. Charting a waypoint gives you a one time reward of credits based on the rarity of the waypoint's traits.
     * @param shipSymbol The symbol of the ship.
     * @returns any Created
     * @throws ApiError
     */
    public static createChart(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            /**
             * The chart of a system or waypoint, which makes the location visible to other agents.
             */
            chart: {
                waypointSymbol?: paths_1my_1ships_1_shipSymbol_1nav_get_responses_200_content_application_1json_schema_properties_data_properties_waypointSymbol;
                /**
                 * The agent that submitted the chart for this waypoint.
                 */
                submittedBy?: string;
                /**
                 * The time the chart for this waypoint was submitted.
                 */
                submittedOn?: string;
            };
            waypoint: paths_1systems_1_systemSymbol_1waypoints_1_waypointSymbol_get_responses_200_content_application_1json_schema_properties_data;
            agent: paths_1my_1agent_get_responses_200_content_application_1json_schema_properties_data;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/chart',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Get Ship Cooldown
     * Retrieve the details of your ship's reactor cooldown. Some actions such as activating your jump drive, scanning, or extracting resources taxes your reactor and results in a cooldown.
     *
     * Your ship cannot perform additional actions until your cooldown has expired. The duration of your cooldown is relative to the power consumption of the related modules or mounts for the action taken.
     *
     * Response returns a 204 status code (no-content) when the ship has no cooldown.
     * @param shipSymbol The symbol of the ship.
     * @returns any Successfully fetched ship's cooldown.
     * @throws ApiError
     */
    public static getShipCooldown(
        shipSymbol: string,
    ): CancelablePromise<{
        /**
         * A cooldown is a period of time in which a ship cannot perform certain actions.
         */
        data: {
            /**
             * The symbol of the ship that is on cooldown
             */
            shipSymbol: string;
            /**
             * The total duration of the cooldown in seconds
             */
            totalSeconds: number;
            /**
             * The remaining duration of the cooldown in seconds
             */
            remainingSeconds: number;
            /**
             * The date and time when the cooldown expires in ISO 8601 format
             */
            expiration?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/my/ships/{shipSymbol}/cooldown',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Dock Ship
     * Attempt to dock your ship at its current location. Docking will only succeed if your ship is capable of docking at the time of the request.
     *
     * Docked ships can access elements in their current location, such as the market or a shipyard, but cannot do actions that require the ship to be above surface such as navigating or extracting.
     *
     * The endpoint is idempotent - successive calls will succeed even if the ship is already docked.
     * @param shipSymbol The symbol of the ship.
     * @returns any The ship has successfully docked at its current location.
     * @throws ApiError
     */
    public static dockShip(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            nav: paths_1my_1ships_1_shipSymbol_1nav_get_responses_200_content_application_1json_schema_properties_data;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/dock',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Create Survey
     * Create surveys on a waypoint that can be extracted such as asteroid fields. A survey focuses on specific types of deposits from the extracted location. When ships extract using this survey, they are guaranteed to procure a high amount of one of the goods in the survey.
     *
     * In order to use a survey, send the entire survey details in the body of the extract request.
     *
     * Each survey may have multiple deposits, and if a symbol shows up more than once, that indicates a higher chance of extracting that resource.
     *
     * Your ship will enter a cooldown after surveying in which it is unable to perform certain actions. Surveys will eventually expire after a period of time or will be exhausted after being extracted several times based on the survey's size. Multiple ships can use the same survey for extraction.
     *
     * A ship must have the `Surveyor` mount installed in order to use this function.
     * @param shipSymbol The symbol of the ship.
     * @returns any Surveys has been created.
     * @throws ApiError
     */
    public static createSurvey(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            cooldown: paths_1my_1ships_1_shipSymbol_1cooldown_get_responses_200_content_application_1json_schema_properties_data;
            /**
             * Surveys created by this action.
             */
            surveys: Array<paths_1my_1ships_1_shipSymbol_1extract_1survey_post_requestBody_content_application_1json_schema>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/survey',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Extract Resources
     * Extract resources from a waypoint that can be extracted, such as asteroid fields, into your ship. Send an optional survey as the payload to target specific yields.
     *
     * The ship must be in orbit to be able to extract and must have mining equipments installed that can extract goods, such as the `Gas Siphon` mount for gas-based goods or `Mining Laser` mount for ore-based goods.
     *
     * The survey property is now deprecated. See the `extract/survey` endpoint for more details.
     * @param shipSymbol The ship symbol.
     * @param requestBody
     * @returns any Extracted successfully.
     * @throws ApiError
     */
    public static extractResources(
        shipSymbol: string,
        requestBody?: {
            /**
             * @deprecated
             */
            survey?: paths_1my_1ships_1_shipSymbol_1extract_1survey_post_requestBody_content_application_1json_schema;
        },
    ): CancelablePromise<{
        data: {
            cooldown: paths_1my_1ships_1_shipSymbol_1cooldown_get_responses_200_content_application_1json_schema_properties_data;
            /**
             * Extraction details.
             */
            extraction: {
                /**
                 * Symbol of the ship that executed the extraction.
                 */
                shipSymbol: string;
                /**
                 * A yield from the extraction operation.
                 */
                yield: {
                    symbol: paths_1my_1ships_1_shipSymbol_1sell_post_requestBody_content_application_1json_schema_properties_symbol;
                    /**
                     * The number of units extracted that were placed into the ship's cargo hold.
                     */
                    units: number;
                };
            };
            cargo: paths_1my_1ships_1_shipSymbol_1cargo_get_responses_200_content_application_1json_schema_properties_data;
            modifiers?: Array<{
                /**
                 * The unique identifier of the modifier.
                 */
                symbol: 'STRIPPED' | 'UNSTABLE' | 'RADIATION_LEAK' | 'CRITICAL_LIMIT' | 'CIVIL_UNREST';
                /**
                 * The name of the trait.
                 */
                name: string;
                /**
                 * A description of the trait.
                 */
                description: string;
            }>;
            events: Array<paths_1my_1ships_1_shipSymbol_1nav_patch_responses_200_content_application_1json_schema_properties_data_properties_events_items>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/extract',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Siphon Resources
     * Siphon gases or other resources from gas giants.
     *
     * The ship must be in orbit to be able to siphon and must have siphon mounts and a gas processor installed.
     * @param shipSymbol The ship symbol.
     * @returns any Siphon successful.
     * @throws ApiError
     */
    public static siphonResources(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            cooldown: paths_1my_1ships_1_shipSymbol_1cooldown_get_responses_200_content_application_1json_schema_properties_data;
            /**
             * Siphon details.
             */
            siphon: {
                /**
                 * Symbol of the ship that executed the siphon.
                 */
                shipSymbol: string;
                /**
                 * A yield from the siphon operation.
                 */
                yield: {
                    symbol: paths_1my_1ships_1_shipSymbol_1sell_post_requestBody_content_application_1json_schema_properties_symbol;
                    /**
                     * The number of units siphoned that were placed into the ship's cargo hold.
                     */
                    units: number;
                };
            };
            cargo: paths_1my_1ships_1_shipSymbol_1cargo_get_responses_200_content_application_1json_schema_properties_data;
            events: Array<paths_1my_1ships_1_shipSymbol_1nav_patch_responses_200_content_application_1json_schema_properties_data_properties_events_items>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/siphon',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Extract Resources with Survey
     * Use a survey when extracting resources from a waypoint. This endpoint requires a survey as the payload, which allows your ship to extract specific yields.
     *
     * Send the full survey object as the payload which will be validated according to the signature. If the signature is invalid, or any properties of the survey are changed, the request will fail.
     * @param shipSymbol The ship symbol.
     * @param requestBody
     * @returns any Extracted successfully.
     * @throws ApiError
     */
    public static extractResourcesWithSurvey(
        shipSymbol: string,
        requestBody?: {
            /**
             * A unique signature for the location of this survey. This signature is verified when attempting an extraction using this survey.
             */
            signature: string;
            /**
             * The symbol of the waypoint that this survey is for.
             */
            symbol: string;
            /**
             * A list of deposits that can be found at this location. A ship will extract one of these deposits when using this survey in an extraction request. If multiple deposits of the same type are present, the chance of extracting that deposit is increased.
             */
            deposits: Array<{
                /**
                 * The symbol of the deposit.
                 */
                symbol: string;
            }>;
            /**
             * The date and time when the survey expires. After this date and time, the survey will no longer be available for extraction.
             */
            expiration: string;
            /**
             * The size of the deposit. This value indicates how much can be extracted from the survey before it is exhausted.
             */
            size: 'SMALL' | 'MODERATE' | 'LARGE';
        },
    ): CancelablePromise<{
        data: {
            cooldown: paths_1my_1ships_1_shipSymbol_1cooldown_get_responses_200_content_application_1json_schema_properties_data;
            extraction: paths_1my_1ships_1_shipSymbol_1extract_post_responses_201_content_application_1json_schema_properties_data_properties_extraction;
            cargo: paths_1my_1ships_1_shipSymbol_1cargo_get_responses_200_content_application_1json_schema_properties_data;
            events: Array<paths_1my_1ships_1_shipSymbol_1nav_patch_responses_200_content_application_1json_schema_properties_data_properties_events_items>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/extract/survey',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Jettison Cargo
     * Jettison cargo from your ship's cargo hold.
     * @param shipSymbol The ship symbol.
     * @param requestBody
     * @returns any Jettison successful.
     * @throws ApiError
     */
    public static jettison(
        shipSymbol: string,
        requestBody?: {
            symbol: paths_1my_1ships_1_shipSymbol_1sell_post_requestBody_content_application_1json_schema_properties_symbol;
            /**
             * Amount of units to jettison of this good.
             */
            units: number;
        },
    ): CancelablePromise<{
        data: {
            cargo: paths_1my_1ships_1_shipSymbol_1cargo_get_responses_200_content_application_1json_schema_properties_data;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/jettison',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Jump Ship
     * Jump your ship instantly to a target connected waypoint. The ship must be in orbit to execute a jump.
     *
     * A unit of antimatter is purchased and consumed from the market when jumping. The price of antimatter is determined by the market and is subject to change. A ship can only jump to connected waypoints
     * @param shipSymbol The ship symbol.
     * @param requestBody
     * @returns any Jump successful.
     * @throws ApiError
     */
    public static jumpShip(
        shipSymbol: string,
        requestBody?: {
            /**
             * The symbol of the waypoint to jump to. The destination must be a connected waypoint.
             */
            waypointSymbol: string;
        },
    ): CancelablePromise<{
        data: {
            nav: paths_1my_1ships_1_shipSymbol_1nav_get_responses_200_content_application_1json_schema_properties_data;
            cooldown: paths_1my_1ships_1_shipSymbol_1cooldown_get_responses_200_content_application_1json_schema_properties_data;
            /**
             * Result of a transaction with a market.
             */
            transaction: {
                waypointSymbol: paths_1my_1ships_1_shipSymbol_1nav_get_responses_200_content_application_1json_schema_properties_data_properties_waypointSymbol;
                /**
                 * The symbol of the ship that made the transaction.
                 */
                shipSymbol: string;
                /**
                 * The symbol of the trade good.
                 */
                tradeSymbol: string;
                /**
                 * The type of transaction.
                 */
                type: 'PURCHASE' | 'SELL';
                /**
                 * The number of units of the transaction.
                 */
                units: number;
                /**
                 * The price per unit of the transaction.
                 */
                pricePerUnit: number;
                /**
                 * The total price of the transaction.
                 */
                totalPrice: number;
                /**
                 * The timestamp of the transaction.
                 */
                timestamp: string;
            };
            agent: paths_1my_1agent_get_responses_200_content_application_1json_schema_properties_data;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/jump',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Navigate Ship
     * Navigate to a target destination. The ship must be in orbit to use this function. The destination waypoint must be within the same system as the ship's current location. Navigating will consume the necessary fuel from the ship's manifest based on the distance to the target waypoint.
     *
     * The returned response will detail the route information including the expected time of arrival. Most ship actions are unavailable until the ship has arrived at it's destination.
     *
     * To travel between systems, see the ship's Warp or Jump actions.
     * @param shipSymbol The ship symbol.
     * @param requestBody
     * @returns any The successful transit information including the route details and changes to ship fuel. The route includes the expected time of arrival.
     * @throws ApiError
     */
    public static navigateShip(
        shipSymbol: string,
        requestBody?: {
            /**
             * The target destination.
             */
            waypointSymbol: string;
        },
    ): CancelablePromise<{
        data: {
            fuel: paths_1my_1ships_1_shipSymbol_1nav_patch_responses_200_content_application_1json_schema_properties_data_properties_fuel;
            nav: paths_1my_1ships_1_shipSymbol_1nav_get_responses_200_content_application_1json_schema_properties_data;
            events: Array<paths_1my_1ships_1_shipSymbol_1nav_patch_responses_200_content_application_1json_schema_properties_data_properties_events_items>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/navigate',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Patch Ship Nav
     * Update the nav configuration of a ship.
     *
     * Currently only supports configuring the Flight Mode of the ship, which affects its speed and fuel consumption.
     * @param shipSymbol The ship symbol.
     * @param requestBody
     * @returns any The updated data of the ship.
     * @throws ApiError
     */
    public static patchShipNav(
        shipSymbol: string,
        requestBody?: {
            /**
             * The ship's set speed when traveling between waypoints or systems.
             */
            flightMode?: 'DRIFT' | 'STEALTH' | 'CRUISE' | 'BURN';
        },
    ): CancelablePromise<{
        data: {
            nav: paths_1my_1ships_1_shipSymbol_1nav_get_responses_200_content_application_1json_schema_properties_data;
            /**
             * Details of the ship's fuel tanks including how much fuel was consumed during the last transit or action.
             */
            fuel: {
                /**
                 * The current amount of fuel in the ship's tanks.
                 */
                current: number;
                /**
                 * The maximum amount of fuel the ship's tanks can hold.
                 */
                capacity: number;
                /**
                 * An object that only shows up when an action has consumed fuel in the process. Shows the fuel consumption data.
                 */
                consumed?: {
                    /**
                     * The amount of fuel consumed by the most recent transit or action.
                     */
                    amount: number;
                    /**
                     * The time at which the fuel was consumed.
                     */
                    timestamp: string;
                };
            };
            events: Array<{
                symbol: 'REACTOR_OVERLOAD' | 'ENERGY_SPIKE_FROM_MINERAL' | 'SOLAR_FLARE_INTERFERENCE' | 'COOLANT_LEAK' | 'POWER_DISTRIBUTION_FLUCTUATION' | 'MAGNETIC_FIELD_DISRUPTION' | 'HULL_MICROMETEORITE_STRIKES' | 'STRUCTURAL_STRESS_FRACTURES' | 'CORROSIVE_MINERAL_CONTAMINATION' | 'THERMAL_EXPANSION_MISMATCH' | 'VIBRATION_DAMAGE_FROM_DRILLING' | 'ELECTROMAGNETIC_FIELD_INTERFERENCE' | 'IMPACT_WITH_EXTRACTED_DEBRIS' | 'FUEL_EFFICIENCY_DEGRADATION' | 'COOLANT_SYSTEM_AGEING' | 'DUST_MICROABRASIONS' | 'THRUSTER_NOZZLE_WEAR' | 'EXHAUST_PORT_CLOGGING' | 'BEARING_LUBRICATION_FADE' | 'SENSOR_CALIBRATION_DRIFT' | 'HULL_MICROMETEORITE_DAMAGE' | 'SPACE_DEBRIS_COLLISION' | 'THERMAL_STRESS' | 'VIBRATION_OVERLOAD' | 'PRESSURE_DIFFERENTIAL_STRESS' | 'ELECTROMAGNETIC_SURGE_EFFECTS' | 'ATMOSPHERIC_ENTRY_HEAT';
                component: 'FRAME' | 'REACTOR' | 'ENGINE';
                /**
                 * The name of the event.
                 */
                name: string;
                /**
                 * A description of the event.
                 */
                description: string;
            }>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/my/ships/{shipSymbol}/nav',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get Ship Nav
     * Get the current nav status of a ship.
     * @param shipSymbol The ship symbol.
     * @returns any The current nav status of the ship.
     * @throws ApiError
     */
    public static getShipNav(
        shipSymbol: string,
    ): CancelablePromise<{
        /**
         * The navigation information of the ship.
         */
        data: {
            /**
             * The symbol of the system.
             */
            systemSymbol: string;
            /**
             * The symbol of the waypoint.
             */
            waypointSymbol: string;
            /**
             * The routing information for the ship's most recent transit or current location.
             */
            route: {
                destination: paths_1my_1ships_1_shipSymbol_1nav_get_responses_200_content_application_1json_schema_properties_data_properties_route_properties_origin;
                /**
                 * The destination or departure of a ships nav route.
                 */
                origin: {
                    /**
                     * The symbol of the waypoint.
                     */
                    symbol: string;
                    type: paths_1systems_1_systemSymbol_1waypoints_get_parameters_2_schema;
                    systemSymbol: paths_1my_1ships_1_shipSymbol_1nav_get_responses_200_content_application_1json_schema_properties_data_properties_systemSymbol;
                    /**
                     * Position in the universe in the x axis.
                     */
                    'x': number;
                    /**
                     * Position in the universe in the y axis.
                     */
                    'y': number;
                };
                /**
                 * The date time of the ship's departure.
                 */
                departureTime: string;
                /**
                 * The date time of the ship's arrival. If the ship is in-transit, this is the expected time of arrival.
                 */
                arrival: string;
            };
            /**
             * The current status of the ship
             */
            status: 'IN_TRANSIT' | 'IN_ORBIT' | 'DOCKED';
            flightMode: paths_1my_1ships_1_shipSymbol_1nav_patch_requestBody_content_application_1json_schema_properties_flightMode;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/my/ships/{shipSymbol}/nav',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Warp Ship
     * Warp your ship to a target destination in another system. The ship must be in orbit to use this function and must have the `Warp Drive` module installed. Warping will consume the necessary fuel from the ship's manifest.
     *
     * The returned response will detail the route information including the expected time of arrival. Most ship actions are unavailable until the ship has arrived at its destination.
     * @param shipSymbol The ship symbol.
     * @param requestBody
     * @returns any The successful transit information including the route details and changes to ship fuel. The route includes the expected time of arrival.
     * @throws ApiError
     */
    public static warpShip(
        shipSymbol: string,
        requestBody?: {
            /**
             * The target destination.
             */
            waypointSymbol: string;
        },
    ): CancelablePromise<{
        data: {
            fuel: paths_1my_1ships_1_shipSymbol_1nav_patch_responses_200_content_application_1json_schema_properties_data_properties_fuel;
            nav: paths_1my_1ships_1_shipSymbol_1nav_get_responses_200_content_application_1json_schema_properties_data;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/warp',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Sell Cargo
     * Sell cargo in your ship to a market that trades this cargo. The ship must be docked in a waypoint that has the `Marketplace` trait in order to use this function.
     * @param shipSymbol Symbol of a ship.
     * @param requestBody
     * @returns any Cargo was successfully sold.
     * @throws ApiError
     */
    public static sellCargo(
        shipSymbol: string,
        requestBody?: {
            /**
             * The good's symbol.
             */
            symbol: 'PRECIOUS_STONES' | 'QUARTZ_SAND' | 'SILICON_CRYSTALS' | 'AMMONIA_ICE' | 'LIQUID_HYDROGEN' | 'LIQUID_NITROGEN' | 'ICE_WATER' | 'EXOTIC_MATTER' | 'ADVANCED_CIRCUITRY' | 'GRAVITON_EMITTERS' | 'IRON' | 'IRON_ORE' | 'COPPER' | 'COPPER_ORE' | 'ALUMINUM' | 'ALUMINUM_ORE' | 'SILVER' | 'SILVER_ORE' | 'GOLD' | 'GOLD_ORE' | 'PLATINUM' | 'PLATINUM_ORE' | 'DIAMONDS' | 'URANITE' | 'URANITE_ORE' | 'MERITIUM' | 'MERITIUM_ORE' | 'HYDROCARBON' | 'ANTIMATTER' | 'FAB_MATS' | 'FERTILIZERS' | 'FABRICS' | 'FOOD' | 'JEWELRY' | 'MACHINERY' | 'FIREARMS' | 'ASSAULT_RIFLES' | 'MILITARY_EQUIPMENT' | 'EXPLOSIVES' | 'LAB_INSTRUMENTS' | 'AMMUNITION' | 'ELECTRONICS' | 'SHIP_PLATING' | 'SHIP_PARTS' | 'EQUIPMENT' | 'FUEL' | 'MEDICINE' | 'DRUGS' | 'CLOTHING' | 'MICROPROCESSORS' | 'PLASTICS' | 'POLYNUCLEOTIDES' | 'BIOCOMPOSITES' | 'QUANTUM_STABILIZERS' | 'NANOBOTS' | 'AI_MAINFRAMES' | 'QUANTUM_DRIVES' | 'ROBOTIC_DRONES' | 'CYBER_IMPLANTS' | 'GENE_THERAPEUTICS' | 'NEURAL_CHIPS' | 'MOOD_REGULATORS' | 'VIRAL_AGENTS' | 'MICRO_FUSION_GENERATORS' | 'SUPERGRAINS' | 'LASER_RIFLES' | 'HOLOGRAPHICS' | 'SHIP_SALVAGE' | 'RELIC_TECH' | 'NOVEL_LIFEFORMS' | 'BOTANICAL_SPECIMENS' | 'CULTURAL_ARTIFACTS' | 'FRAME_PROBE' | 'FRAME_DRONE' | 'FRAME_INTERCEPTOR' | 'FRAME_RACER' | 'FRAME_FIGHTER' | 'FRAME_FRIGATE' | 'FRAME_SHUTTLE' | 'FRAME_EXPLORER' | 'FRAME_MINER' | 'FRAME_LIGHT_FREIGHTER' | 'FRAME_HEAVY_FREIGHTER' | 'FRAME_TRANSPORT' | 'FRAME_DESTROYER' | 'FRAME_CRUISER' | 'FRAME_CARRIER' | 'FRAME_BULK_FREIGHTER' | 'REACTOR_SOLAR_I' | 'REACTOR_FUSION_I' | 'REACTOR_FISSION_I' | 'REACTOR_CHEMICAL_I' | 'REACTOR_ANTIMATTER_I' | 'ENGINE_IMPULSE_DRIVE_I' | 'ENGINE_ION_DRIVE_I' | 'ENGINE_ION_DRIVE_II' | 'ENGINE_HYPER_DRIVE_I' | 'MODULE_MINERAL_PROCESSOR_I' | 'MODULE_GAS_PROCESSOR_I' | 'MODULE_CARGO_HOLD_I' | 'MODULE_CARGO_HOLD_II' | 'MODULE_CARGO_HOLD_III' | 'MODULE_CREW_QUARTERS_I' | 'MODULE_ENVOY_QUARTERS_I' | 'MODULE_PASSENGER_CABIN_I' | 'MODULE_MICRO_REFINERY_I' | 'MODULE_SCIENCE_LAB_I' | 'MODULE_JUMP_DRIVE_I' | 'MODULE_JUMP_DRIVE_II' | 'MODULE_JUMP_DRIVE_III' | 'MODULE_WARP_DRIVE_I' | 'MODULE_WARP_DRIVE_II' | 'MODULE_WARP_DRIVE_III' | 'MODULE_SHIELD_GENERATOR_I' | 'MODULE_SHIELD_GENERATOR_II' | 'MODULE_ORE_REFINERY_I' | 'MODULE_FUEL_REFINERY_I' | 'MOUNT_GAS_SIPHON_I' | 'MOUNT_GAS_SIPHON_II' | 'MOUNT_GAS_SIPHON_III' | 'MOUNT_SURVEYOR_I' | 'MOUNT_SURVEYOR_II' | 'MOUNT_SURVEYOR_III' | 'MOUNT_SENSOR_ARRAY_I' | 'MOUNT_SENSOR_ARRAY_II' | 'MOUNT_SENSOR_ARRAY_III' | 'MOUNT_MINING_LASER_I' | 'MOUNT_MINING_LASER_II' | 'MOUNT_MINING_LASER_III' | 'MOUNT_LASER_CANNON_I' | 'MOUNT_MISSILE_LAUNCHER_I' | 'MOUNT_TURRET_I' | 'SHIP_PROBE' | 'SHIP_MINING_DRONE' | 'SHIP_SIPHON_DRONE' | 'SHIP_INTERCEPTOR' | 'SHIP_LIGHT_HAULER' | 'SHIP_COMMAND_FRIGATE' | 'SHIP_EXPLORER' | 'SHIP_HEAVY_FREIGHTER' | 'SHIP_LIGHT_SHUTTLE' | 'SHIP_ORE_HOUND' | 'SHIP_REFINING_FREIGHTER' | 'SHIP_SURVEYOR' | 'SHIP_BULK_FREIGHTER';
            /**
             * Amounts of units to sell of the selected good.
             */
            units: number;
        },
    ): CancelablePromise<{
        data: {
            agent: paths_1my_1agent_get_responses_200_content_application_1json_schema_properties_data;
            cargo: paths_1my_1ships_1_shipSymbol_1cargo_get_responses_200_content_application_1json_schema_properties_data;
            transaction: paths_1my_1ships_1_shipSymbol_1jump_post_responses_200_content_application_1json_schema_properties_data_properties_transaction;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/sell',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Scan Systems
     * Scan for nearby systems, retrieving information on the systems' distance from the ship and their waypoints. Requires a ship to have the `Sensor Array` mount installed to use.
     *
     * The ship will enter a cooldown after using this function, during which it cannot execute certain actions.
     * @param shipSymbol The ship symbol.
     * @returns any Successfully scanned for nearby systems.
     * @throws ApiError
     */
    public static createShipSystemScan(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            cooldown: paths_1my_1ships_1_shipSymbol_1cooldown_get_responses_200_content_application_1json_schema_properties_data;
            /**
             * List of scanned systems.
             */
            systems: Array<{
                /**
                 * Symbol of the system.
                 */
                symbol: string;
                /**
                 * Symbol of the system's sector.
                 */
                sectorSymbol: string;
                type: paths_1systems_1_systemSymbol_get_responses_200_content_application_1json_schema_properties_data_properties_type;
                /**
                 * Position in the universe in the x axis.
                 */
                'x': number;
                /**
                 * Position in the universe in the y axis.
                 */
                'y': number;
                /**
                 * The system's distance from the scanning ship.
                 */
                distance: number;
            }>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/scan/systems',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Scan Waypoints
     * Scan for nearby waypoints, retrieving detailed information on each waypoint in range. Scanning uncharted waypoints will allow you to ignore their uncharted state and will list the waypoints' traits.
     *
     * Requires a ship to have the `Sensor Array` mount installed to use.
     *
     * The ship will enter a cooldown after using this function, during which it cannot execute certain actions.
     * @param shipSymbol The ship symbol.
     * @returns any Successfully scanned for nearby waypoints.
     * @throws ApiError
     */
    public static createShipWaypointScan(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            cooldown: paths_1my_1ships_1_shipSymbol_1cooldown_get_responses_200_content_application_1json_schema_properties_data;
            /**
             * List of scanned waypoints.
             */
            waypoints: Array<{
                symbol: paths_1my_1ships_1_shipSymbol_1nav_get_responses_200_content_application_1json_schema_properties_data_properties_waypointSymbol;
                type: paths_1systems_1_systemSymbol_1waypoints_get_parameters_2_schema;
                systemSymbol: paths_1my_1ships_1_shipSymbol_1nav_get_responses_200_content_application_1json_schema_properties_data_properties_systemSymbol;
                /**
                 * Position in the universe in the x axis.
                 */
                'x': number;
                /**
                 * Position in the universe in the y axis.
                 */
                'y': number;
                /**
                 * List of waypoints that orbit this waypoint.
                 */
                orbitals: Array<paths_1systems_1_systemSymbol_1waypoints_1_waypointSymbol_get_responses_200_content_application_1json_schema_properties_data_properties_orbitals_items>;
                faction?: paths_1systems_1_systemSymbol_1waypoints_1_waypointSymbol_get_responses_200_content_application_1json_schema_properties_data_properties_faction;
                /**
                 * The traits of the waypoint.
                 */
                traits: Array<paths_1systems_1_systemSymbol_1waypoints_1_waypointSymbol_get_responses_200_content_application_1json_schema_properties_data_properties_traits_items>;
                chart?: paths_1my_1ships_1_shipSymbol_1chart_post_responses_201_content_application_1json_schema_properties_data_properties_chart;
            }>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/scan/waypoints',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Scan Ships
     * Scan for nearby ships, retrieving information for all ships in range.
     *
     * Requires a ship to have the `Sensor Array` mount installed to use.
     *
     * The ship will enter a cooldown after using this function, during which it cannot execute certain actions.
     * @param shipSymbol The ship symbol.
     * @returns any Successfully scanned for nearby ships.
     * @throws ApiError
     */
    public static createShipShipScan(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            cooldown: paths_1my_1ships_1_shipSymbol_1cooldown_get_responses_200_content_application_1json_schema_properties_data;
            /**
             * List of scanned ships.
             */
            ships: Array<{
                /**
                 * The globally unique identifier of the ship.
                 */
                symbol: string;
                registration: paths_1my_1ships_1_shipSymbol_get_responses_200_content_application_1json_schema_properties_data_properties_registration;
                nav: paths_1my_1ships_1_shipSymbol_1nav_get_responses_200_content_application_1json_schema_properties_data;
                /**
                 * The frame of the ship.
                 */
                frame?: {
                    /**
                     * The symbol of the frame.
                     */
                    symbol: string;
                };
                /**
                 * The reactor of the ship.
                 */
                reactor?: {
                    /**
                     * The symbol of the reactor.
                     */
                    symbol: string;
                };
                /**
                 * The engine of the ship.
                 */
                engine: {
                    /**
                     * The symbol of the engine.
                     */
                    symbol: string;
                };
                /**
                 * List of mounts installed in the ship.
                 */
                mounts?: Array<{
                    /**
                     * The symbol of the mount.
                     */
                    symbol: string;
                }>;
            }>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/scan/ships',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Refuel Ship
     * Refuel your ship by buying fuel from the local market.
     *
     * Requires the ship to be docked in a waypoint that has the `Marketplace` trait, and the market must be selling fuel in order to refuel.
     *
     * Each fuel bought from the market replenishes 100 units in your ship's fuel.
     *
     * Ships will always be refuel to their frame's maximum fuel capacity when using this action.
     * @param shipSymbol The ship symbol.
     * @param requestBody
     * @returns any Refueled successfully.
     * @throws ApiError
     */
    public static refuelShip(
        shipSymbol: string,
        requestBody?: {
            /**
             * The amount of fuel to fill in the ship's tanks. When not specified, the ship will be refueled to its maximum fuel capacity. If the amount specified is greater than the ship's remaining capacity, the ship will only be refueled to its maximum fuel capacity. The amount specified is not in market units but in ship fuel units.
             */
            units?: number;
            /**
             * Wether to use the FUEL thats in your cargo or not. Default: false
             */
            fromCargo?: boolean;
        },
    ): CancelablePromise<{
        data: {
            agent: paths_1my_1agent_get_responses_200_content_application_1json_schema_properties_data;
            fuel: paths_1my_1ships_1_shipSymbol_1nav_patch_responses_200_content_application_1json_schema_properties_data_properties_fuel;
            transaction: paths_1my_1ships_1_shipSymbol_1jump_post_responses_200_content_application_1json_schema_properties_data_properties_transaction;
            cargo?: paths_1my_1ships_1_shipSymbol_1cargo_get_responses_200_content_application_1json_schema_properties_data;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/refuel',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Purchase Cargo
     * Purchase cargo from a market.
     *
     * The ship must be docked in a waypoint that has `Marketplace` trait, and the market must be selling a good to be able to purchase it.
     *
     * The maximum amount of units of a good that can be purchased in each transaction are denoted by the `tradeVolume` value of the good, which can be viewed by using the Get Market action.
     *
     * Purchased goods are added to the ship's cargo hold.
     * @param shipSymbol The ship's symbol.
     * @param requestBody
     * @returns any Purchased goods successfully.
     * @throws ApiError
     */
    public static purchaseCargo(
        shipSymbol: string,
        requestBody?: {
            symbol: paths_1my_1ships_1_shipSymbol_1sell_post_requestBody_content_application_1json_schema_properties_symbol;
            /**
             * Amounts of units to purchase.
             */
            units: number;
        },
    ): CancelablePromise<{
        data: {
            agent: paths_1my_1agent_get_responses_200_content_application_1json_schema_properties_data;
            cargo: paths_1my_1ships_1_shipSymbol_1cargo_get_responses_200_content_application_1json_schema_properties_data;
            transaction: paths_1my_1ships_1_shipSymbol_1jump_post_responses_200_content_application_1json_schema_properties_data_properties_transaction;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/purchase',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Transfer Cargo
     * Transfer cargo between ships.
     *
     * The receiving ship must be in the same waypoint as the transferring ship, and it must able to hold the additional cargo after the transfer is complete. Both ships also must be in the same state, either both are docked or both are orbiting.
     *
     * The response body's cargo shows the cargo of the transferring ship after the transfer is complete.
     * @param shipSymbol The transferring ship's symbol.
     * @param requestBody
     * @returns any Transfer successful.
     * @throws ApiError
     */
    public static transferCargo(
        shipSymbol: string,
        requestBody?: {
            tradeSymbol: paths_1my_1ships_1_shipSymbol_1sell_post_requestBody_content_application_1json_schema_properties_symbol;
            /**
             * Amount of units to transfer.
             */
            units: number;
            /**
             * The symbol of the ship to transfer to.
             */
            shipSymbol: string;
        },
    ): CancelablePromise<{
        data: {
            cargo: paths_1my_1ships_1_shipSymbol_1cargo_get_responses_200_content_application_1json_schema_properties_data;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/transfer',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Negotiate Contract
     * Negotiate a new contract with the HQ.
     *
     * In order to negotiate a new contract, an agent must not have ongoing or offered contracts over the allowed maximum amount. Currently the maximum contracts an agent can have at a time is 1.
     *
     * Once a contract is negotiated, it is added to the list of contracts offered to the agent, which the agent can then accept.
     *
     * The ship must be present at any waypoint with a faction present to negotiate a contract with that faction.
     * @param shipSymbol The ship's symbol.
     * @returns any Successfully negotiated a new contract.
     * @throws ApiError
     */
    public static negotiateContract(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            contract: paths_1my_1contracts_1_contractId_get_responses_200_content_application_1json_schema_properties_data;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/negotiate/contract',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Get Mounts
     * Get the mounts installed on a ship.
     * @param shipSymbol The ship's symbol.
     * @returns any Got installed mounts.
     * @throws ApiError
     */
    public static getMounts(
        shipSymbol: string,
    ): CancelablePromise<{
        data: Array<{
            /**
             * Symbo of this mount.
             */
            symbol: 'MOUNT_GAS_SIPHON_I' | 'MOUNT_GAS_SIPHON_II' | 'MOUNT_GAS_SIPHON_III' | 'MOUNT_SURVEYOR_I' | 'MOUNT_SURVEYOR_II' | 'MOUNT_SURVEYOR_III' | 'MOUNT_SENSOR_ARRAY_I' | 'MOUNT_SENSOR_ARRAY_II' | 'MOUNT_SENSOR_ARRAY_III' | 'MOUNT_MINING_LASER_I' | 'MOUNT_MINING_LASER_II' | 'MOUNT_MINING_LASER_III' | 'MOUNT_LASER_CANNON_I' | 'MOUNT_MISSILE_LAUNCHER_I' | 'MOUNT_TURRET_I';
            /**
             * Name of this mount.
             */
            name: string;
            /**
             * Description of this mount.
             */
            description?: string;
            /**
             * Mounts that have this value, such as mining lasers, denote how powerful this mount's capabilities are.
             */
            strength?: number;
            /**
             * Mounts that have this value denote what goods can be produced from using the mount.
             */
            deposits?: Array<'QUARTZ_SAND' | 'SILICON_CRYSTALS' | 'PRECIOUS_STONES' | 'ICE_WATER' | 'AMMONIA_ICE' | 'IRON_ORE' | 'COPPER_ORE' | 'SILVER_ORE' | 'ALUMINUM_ORE' | 'GOLD_ORE' | 'PLATINUM_ORE' | 'DIAMONDS' | 'URANITE_ORE' | 'MERITIUM_ORE'>;
            /**
             * The requirements for installation on a ship
             */
            requirements: {
                /**
                 * The amount of power required from the reactor.
                 */
                power?: number;
                /**
                 * The number of crew required for operation.
                 */
                crew?: number;
                /**
                 * The number of module slots required for installation.
                 */
                slots?: number;
            };
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/my/ships/{shipSymbol}/mounts',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Install Mount
     * Install a mount on a ship.
     *
     * In order to install a mount, the ship must be docked and located in a waypoint that has a `Shipyard` trait. The ship also must have the mount to install in its cargo hold.
     *
     * An installation fee will be deduced by the Shipyard for installing the mount on the ship.
     * @param shipSymbol The ship's symbol.
     * @param requestBody
     * @returns any Successfully installed the mount.
     * @throws ApiError
     */
    public static installMount(
        shipSymbol: string,
        requestBody?: {
            symbol: string;
        },
    ): CancelablePromise<{
        data: {
            agent: paths_1my_1agent_get_responses_200_content_application_1json_schema_properties_data;
            /**
             * List of installed mounts after the installation of the new mount.
             */
            mounts: Array<paths_1my_1ships_1_shipSymbol_1mounts_get_responses_200_content_application_1json_schema_properties_data_items>;
            cargo: paths_1my_1ships_1_shipSymbol_1cargo_get_responses_200_content_application_1json_schema_properties_data;
            transaction: paths_1my_1ships_1_shipSymbol_1mounts_1remove_post_responses_201_content_application_1json_schema_properties_data_properties_transaction;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/mounts/install',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Remove Mount
     * Remove a mount from a ship.
     *
     * The ship must be docked in a waypoint that has the `Shipyard` trait, and must have the desired mount that it wish to remove installed.
     *
     * A removal fee will be deduced from the agent by the Shipyard.
     * @param shipSymbol The ship's symbol.
     * @param requestBody
     * @returns any Successfully removed the mount.
     * @throws ApiError
     */
    public static removeMount(
        shipSymbol: string,
        requestBody?: {
            /**
             * The symbol of the mount to remove.
             */
            symbol: string;
        },
    ): CancelablePromise<{
        data: {
            agent: paths_1my_1agent_get_responses_200_content_application_1json_schema_properties_data;
            /**
             * List of installed mounts after the removal of the selected mount.
             */
            mounts: Array<paths_1my_1ships_1_shipSymbol_1mounts_get_responses_200_content_application_1json_schema_properties_data_items>;
            cargo: paths_1my_1ships_1_shipSymbol_1cargo_get_responses_200_content_application_1json_schema_properties_data;
            /**
             * Result of a transaction for a ship modification, such as installing a mount or a module.
             */
            transaction: {
                /**
                 * The symbol of the waypoint where the transaction took place.
                 */
                waypointSymbol: string;
                /**
                 * The symbol of the ship that made the transaction.
                 */
                shipSymbol: string;
                /**
                 * The symbol of the trade good.
                 */
                tradeSymbol: string;
                /**
                 * The total price of the transaction.
                 */
                totalPrice: number;
                /**
                 * The timestamp of the transaction.
                 */
                timestamp: string;
            };
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/mounts/remove',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get Scrap Ship
     * Get the amount of value that will be returned when scrapping a ship.
     * @param shipSymbol The ship symbol.
     * @returns any Successfully retrieved the amount of value that will be returned when scrapping a ship.
     * @throws ApiError
     */
    public static getScrapShip(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            /**
             * Result of a scrap transaction.
             */
            transaction: {
                waypointSymbol: paths_1my_1ships_1_shipSymbol_1nav_get_responses_200_content_application_1json_schema_properties_data_properties_waypointSymbol;
                /**
                 * The symbol of the ship.
                 */
                shipSymbol: string;
                /**
                 * The total price of the transaction.
                 */
                totalPrice: number;
                /**
                 * The timestamp of the transaction.
                 */
                timestamp: string;
            };
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/my/ships/{shipSymbol}/scrap',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Scrap Ship
     * Scrap a ship, removing it from the game and returning a portion of the ship's value to the agent. The ship must be docked in a waypoint that has the `Shipyard` trait in order to use this function. To preview the amount of value that will be returned, use the Get Ship action.
     * @param shipSymbol The ship symbol.
     * @returns any Ship scrapped successfully.
     * @throws ApiError
     */
    public static scrapShip(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            agent: paths_1my_1agent_get_responses_200_content_application_1json_schema_properties_data;
            transaction: paths_1my_1ships_1_shipSymbol_1scrap_get_responses_200_content_application_1json_schema_properties_data_properties_transaction;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/scrap',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Get Repair Ship
     * Get the cost of repairing a ship.
     * @param shipSymbol The ship symbol.
     * @returns any Successfully retrieved the cost of repairing a ship.
     * @throws ApiError
     */
    public static getRepairShip(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            /**
             * Result of a repair transaction.
             */
            transaction: {
                waypointSymbol: paths_1my_1ships_1_shipSymbol_1nav_get_responses_200_content_application_1json_schema_properties_data_properties_waypointSymbol;
                /**
                 * The symbol of the ship.
                 */
                shipSymbol: string;
                /**
                 * The total price of the transaction.
                 */
                totalPrice: number;
                /**
                 * The timestamp of the transaction.
                 */
                timestamp: string;
            };
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/my/ships/{shipSymbol}/repair',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Repair Ship
     * Repair a ship, restoring the ship to maximum condition. The ship must be docked at a waypoint that has the `Shipyard` trait in order to use this function. To preview the cost of repairing the ship, use the Get action.
     * @param shipSymbol The ship symbol.
     * @returns any Ship repaired successfully.
     * @throws ApiError
     */
    public static repairShip(
        shipSymbol: string,
    ): CancelablePromise<{
        data: {
            agent: paths_1my_1agent_get_responses_200_content_application_1json_schema_properties_data;
            ship: paths_1my_1ships_1_shipSymbol_get_responses_200_content_application_1json_schema_properties_data;
            transaction: paths_1my_1ships_1_shipSymbol_1repair_get_responses_200_content_application_1json_schema_properties_data_properties_transaction;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/repair',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Get Ship Modules
     * Get the modules installed on a ship.
     * @param shipSymbol The symbol of the ship
     * @returns any Successfully retrieved ship modules.
     * @throws ApiError
     */
    public static getShipModules(
        shipSymbol: string,
    ): CancelablePromise<{
        data: Array<{
            /**
             * The symbol of the module.
             */
            symbol: 'MODULE_MINERAL_PROCESSOR_I' | 'MODULE_GAS_PROCESSOR_I' | 'MODULE_CARGO_HOLD_I' | 'MODULE_CARGO_HOLD_II' | 'MODULE_CARGO_HOLD_III' | 'MODULE_CREW_QUARTERS_I' | 'MODULE_ENVOY_QUARTERS_I' | 'MODULE_PASSENGER_CABIN_I' | 'MODULE_MICRO_REFINERY_I' | 'MODULE_ORE_REFINERY_I' | 'MODULE_FUEL_REFINERY_I' | 'MODULE_SCIENCE_LAB_I' | 'MODULE_JUMP_DRIVE_I' | 'MODULE_JUMP_DRIVE_II' | 'MODULE_JUMP_DRIVE_III' | 'MODULE_WARP_DRIVE_I' | 'MODULE_WARP_DRIVE_II' | 'MODULE_WARP_DRIVE_III' | 'MODULE_SHIELD_GENERATOR_I' | 'MODULE_SHIELD_GENERATOR_II';
            /**
             * Modules that provide capacity, such as cargo hold or crew quarters will show this value to denote how much of a bonus the module grants.
             */
            capacity?: number;
            /**
             * Modules that have a range will such as a sensor array show this value to denote how far can the module reach with its capabilities.
             */
            range?: number;
            /**
             * Name of this module.
             */
            name: string;
            /**
             * Description of this module.
             */
            description: string;
            requirements: paths_1my_1ships_1_shipSymbol_1mounts_get_responses_200_content_application_1json_schema_properties_data_items_properties_requirements;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/my/ships/{shipSymbol}/modules',
            path: {
                'shipSymbol': shipSymbol,
            },
        });
    }
    /**
     * Install Ship Module
     * Install a module on a ship. The module must be in your cargo.
     * @param shipSymbol The symbol of the ship
     * @param requestBody
     * @returns any Successfully installed the module on the ship.
     * @throws ApiError
     */
    public static installShipModule(
        shipSymbol: string,
        requestBody?: {
            /**
             * The symbol of the module to install
             */
            symbol: string;
        },
    ): CancelablePromise<{
        data: {
            agent: paths_1my_1agent_get_responses_200_content_application_1json_schema_properties_data;
            modules: Array<paths_1my_1ships_1_shipSymbol_1modules_get_responses_200_content_application_1json_schema_properties_data_items>;
            cargo: paths_1my_1ships_1_shipSymbol_1cargo_get_responses_200_content_application_1json_schema_properties_data;
            transaction: {
                waypointSymbol: string;
                shipSymbol: string;
                tradeSymbol: string;
                totalPrice: number;
                timestamp: string;
            };
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/modules/install',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Remove Ship Module
     * Remove a module from a ship. The module will be placed in cargo.
     * @param shipSymbol The symbol of the ship
     * @param requestBody
     * @returns any Successfully removed the module from the ship.
     * @throws ApiError
     */
    public static removeShipModule(
        shipSymbol: string,
        requestBody?: {
            /**
             * The symbol of the module to remove
             */
            symbol: string;
        },
    ): CancelablePromise<{
        data: {
            agent: paths_1my_1agent_get_responses_200_content_application_1json_schema_properties_data;
            modules: Array<paths_1my_1ships_1_shipSymbol_1modules_get_responses_200_content_application_1json_schema_properties_data_items>;
            cargo: paths_1my_1ships_1_shipSymbol_1cargo_get_responses_200_content_application_1json_schema_properties_data;
            transaction: {
                waypointSymbol: string;
                shipSymbol: string;
                tradeSymbol: string;
                totalPrice: number;
                timestamp: string;
            };
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/my/ships/{shipSymbol}/modules/remove',
            path: {
                'shipSymbol': shipSymbol,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
