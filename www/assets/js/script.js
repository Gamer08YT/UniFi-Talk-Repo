class UniFiTalkRepository {
    container = "template-container";

    /**
     * Loads a template file from a pre-defined GitHub repository and logs its content
     * and the file name to the console.
     *
     * @param {string} fileIO - The name of the file to load from the GitHub repository.
     * @return {void} This method does not return any value.
     */
    loadTemplate(fileIO) {
        const url = "https://raw.githubusercontent.com/Gamer08YT/UniFi-Talk-Repo/refs/heads/main/" + fileIO

        // Get Request to GitHub API.
        $.get(url, (data) => {
            console.log(data);
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

    constructor() {
        console.log("Loading UniFi Talk Repository");

        this.fetchTemplates();
    }

}

// Wait until document is ready.
$(document).ready(() => {
    new UniFiTalkRepository();
});
