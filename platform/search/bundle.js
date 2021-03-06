/*****************************************************************************
 * Open MCT Web, Copyright (c) 2014-2015, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT Web is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT Web includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/
/*global define*/

define([
    "./src/controllers/SearchController",
    "./src/controllers/SearchMenuController",
    "./src/controllers/ClickAwayController",
    "./src/services/GenericSearchProvider",
    "./src/services/SearchAggregator",
    'legacyRegistry'
], function (
    SearchController,
    SearchMenuController,
    ClickAwayController,
    GenericSearchProvider,
    SearchAggregator,
    legacyRegistry
) {
    "use strict";

    legacyRegistry.register("platform/search", {
        "name": "Search",
        "description": "Allows the user to search through the file tree.",
        "extensions": {
            "constants": [
                {
                    "key": "GENERIC_SEARCH_ROOTS",
                    "value": [
                        "ROOT"
                    ],
                    "priority": "fallback"
                }
            ],
            "controllers": [
                {
                    "key": "SearchController",
                    "implementation": SearchController,
                    "depends": [
                        "$scope",
                        "searchService"
                    ]
                },
                {
                    "key": "SearchMenuController",
                    "implementation": SearchMenuController,
                    "depends": [
                        "$scope",
                        "types[]"
                    ]
                },
                {
                    "key": "ClickAwayController",
                    "implementation": ClickAwayController,
                    "depends": [
                        "$scope",
                        "$document"
                    ]
                }
            ],
            "representations": [
                {
                    "key": "search-item",
                    "templateUrl": "templates/search-item.html"
                }
            ],
            "templates": [
                {
                    "key": "search",
                    "templateUrl": "templates/search.html"
                },
                {
                    "key": "search-menu",
                    "templateUrl": "templates/search-menu.html"
                }
            ],
            "components": [
                {
                    "provides": "searchService",
                    "type": "provider",
                    "implementation": GenericSearchProvider,
                    "depends": [
                        "$q",
                        "$log",
                        "modelService",
                        "workerService",
                        "topic",
                        "GENERIC_SEARCH_ROOTS"
                    ]
                },
                {
                    "provides": "searchService",
                    "type": "aggregator",
                    "implementation": SearchAggregator,
                    "depends": [
                        "$q",
                        "objectService"
                    ]
                }
            ],
            "workers": [
                {
                    "key": "genericSearchWorker",
                    "scriptUrl": "services/GenericSearchWorker.js"
                }
            ]
        }
    });
});
