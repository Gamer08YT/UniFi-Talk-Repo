class UniFiTalkRepository {
    container = "template-container";
    cache = [];

    /**
     * Loads a template from the provided file path using a GET request to the GitHub API
     * and caches the response data. Also updates a dropdown menu with the fetched template's name.
     *
     * @param {string} fileIO The path of the file to be loaded, appended to a predefined base URL.
     * @return {void} Does not return a value.
     */
    loadTemplate(fileIO) {
        const url = "https://raw.githubusercontent.com/Gamer08YT/UniFi-Talk-Repo/main/" + fileIO

        // Get Request to GitHub API.
        $.get(url, (response) => {
            const data = JSON.parse(response);

            console.log(data);
            if (data.name !== undefined) {
                // Add Option to Select.
                $("#provider-select").append(new Option(data.name, fileIO));
            }

            // Push Template into Cache.
            this.cache.push({file: fileIO, data: data});
        })

        console.log("Loading Template: " + fileIO);
    }

    /**
     * Fetches template files from a specified GitHub repository and loads them if they end with a `.json` extension.
     * Uses a GET request to retrieve the content from the repository and processes template files.
     *
     * @return {void} Does not return a value.
     */
    fetchTemplates() {
        const url = "https://api.github.com/repos/Gamer08YT/UniFi-Talk-Repo/contents/"

        // Get Request to GitHub API.
        $.get(url, (data) => {
            data.forEach(element => {
                if (element.name.endsWith(".json")) {
                    this.loadTemplate(element.name);
                }
            })

            console.log("Loaded all Templates.");
        });
    }

    /**
     * Initializes a new instance of the class and loads the UniFi Talk Repository.
     * Executes the necessary setup by invoking the `fetchTemplates` method.
     *
     * @return {void} Does not return a value.
     */
    constructor() {
        console.log("Loading UniFi Talk Repository");

        this.fetchTemplates();
        this.registerListeners();
    }

    /**
     **/
    registerListeners() {
        $("#provider-select").change((data) => {
            const value = data.target.value;

            this.renderTemplate(value);
        })
    }

    /**
     * Renders a template with the provided value by dynamically updating the DOM elements
     * and configuring them based on the template data retrieved from the cache.
     *
     * @param {string} value - The identifier used to retrieve the template from the cache.
     * @return {void} This method does not return any value, instead, it manipulates the DOM.
     */
    renderTemplate(value) {
        const template = this.cache.find(x => x.file === value);
        const container = $("#template-container");

        // First, clear old renders.
        container.empty();

        // Check if template is in cache.
        if (template !== undefined) {
            const data = template.data;

            // Show Template Settings.
            $("#template-settings").css("display", "block");

            // Set Template Alert.
            if (data.implementation !== undefined && data.implementation.version !== undefined) {
                $("#alert").text("Congratulations 🥳, this template has been implemented since Talk version " + data.implementation.version + "!");
            }

            // Set Settings.
            if (data.settings !== undefined) {
                if (data.settings.staticSignalingPort !== undefined) {
                    $("#staticSignalingPort").attr("checked", (data.settings.staticSignalingPort))
                }


            }


            // Toggle Alert Visibility State.
            $("#alert").css("display", (data.implementation !== undefined && data.implementation.implemented === true) ? "block" : "none");

            // Replace Description Text.
            if (data.description !== undefined) {
                $("#provider-description").text(data.description);
            }

            // Show or hide Description Field.
            $("#provider-description").css("display", (data.description !== undefined ? "block" : "none"));

            // Render Fields.
            data.fields.forEach(element => {
                console.log(element);

                // Add a new Field Wrapper.
                const domClone = $("#template-input").clone();

                // Edit ID Field of clone.
                domClone.attr("id", element.name);

                // Change Label of Clone.
                domClone.children("label").text(element.name);

                // Change Input of Clone.
                const input = domClone.children("div").children("input");

                // Set Value of Input if defined.
                if (element.value !== undefined) {
                    input.val(element.value);
                    input.attr("disabled", "disabled");
                }

                // Set Placeholder of Input if defined.
                if (element.placeholder !== undefined) {
                    input.attr("placeholder", element.placeholder);
                }

                // Add Helper Text if exists.
                if (element.description !== undefined) {
                    const inputForm = domClone.children(".template-form-input");
                    inputForm.append("<span class='helper-text'></span>");
                    inputForm.children(".helper-text").text(element.description);
                }

                // Append Dom Clone to Wrapper.
                container.append(domClone);
            });

        } else {
            // Hide Template Settings.
            $("#template-settings").css("display", "none");

            // Toggle Alert Visibility State.
            $("#alert").css("display", "none");

            // Hide Description Field.
            $("#provider-description").css("display", "none");
        }

    }
}

// Wait until document is ready.
$(document).ready(() => {
    new UniFiTalkRepository();
});
