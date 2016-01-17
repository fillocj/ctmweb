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
/*global define,Promise*/

/**
 * Module defining MCTForm. Created by vwoeltje on 11/10/14.
 */
define(
    ["./controllers/FormController"],
    function (FormController) {
        "use strict";

        /**
         * The mct-toolbar directive allows generation of displayable
         * forms based on a declarative description of the form's
         * structure.
         *
         * This directive accepts three attributes:
         *
         * * `ng-model`: The model for the form; where user input
         *   where be stored.
         * * `structure`: The declarative structure of the toolbar.
         *   Describes what controls should be shown and where
         *   their values should be read/written in the model.
         * * `name`: The name under which to expose the form's
         *   dirty/valid state. This is similar to ng-form's use
         *   of name, except this will be made available in the
         *   parent scope.
         *
         * @memberof platform/forms
         * @constructor
         */
        function MCTForm() {
            var templatePath = [
                "platform/forms", //MCTForm.bundle.path,
                "res", //MCTForm.bundle.resources,
                "templates/toolbar.html"
            ].join("/");

            return {
                // Only show at the element level
                restrict: "E",

                // Load the forms template
                templateUrl: templatePath,

                // Use FormController to populate/respond to changes in scope
                controller: [ '$scope', FormController ],

                // Initial an isolate scope
                scope: {

                    // The model: Where form input will actually go
                    ngModel: "=",

                    // Form structure; what sections/rows to show
                    structure: "=",

                    // Name under which to publish the form
                    name: "@"
                }
            };
        }

        return MCTForm;
    }
);