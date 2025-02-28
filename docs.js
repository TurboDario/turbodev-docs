document.addEventListener("DOMContentLoaded", function () {
    const languageSelector = document.getElementById("language-selector");
    const appSelector = document.getElementById("app-selector");

    let currentLanguage = localStorage.getItem("selectedLanguage") || "en";
    let currentApp = localStorage.getItem("selectedApp") || "parkar";

    if (languageSelector) languageSelector.value = currentLanguage;
    if (appSelector) appSelector.value = currentApp;

    /**
     * Loads language strings from JSON files and updates UI.
     * @param {string} language - The selected language code (e.g., "en" or "es").
     */
    function loadLanguageStrings(language) {
        fetch(`locales/${language}.json`)
            .then(response => response.json())
            .then(strings => {
                setTextContent("page-title", strings.page_title);
                setTextContent("app-name", strings.app_name);
                setTextContent("label-app", strings.label_app);
                setTextContent("label-language", strings.label_language);
                setTextContent("welcome", strings.welcome);
                setTextContent("eula", strings.eula);
                setTextContent("terms", strings.terms);
                setTextContent("privacy-policy", strings.privacy_policy);
                setTextContent("developer", strings.developer);
                setTextContent("version", strings.version.replace("{version}", "1.0.0"));
                setTextContent("contact-support", strings.contact_support);
                setTextContent("rate-us", strings.rate_us);
                setTextContent("back-home", strings.back_home);
                setTextContent("developer-name", strings.developer);
                setTextContent("home-link", strings.home);
                updateDocumentLinks();
            })
            .catch(error => console.error("Error loading language file:", error));
    }

    /**
     * Sets the text content of an element by its ID.
     * @param {string} id - The element's ID.
     * @param {string} text - The text content to set.
     */
    function setTextContent(id, text) {
        const element = document.getElementById(id);
        if (element) element.textContent = text;
    }

    /**
     * Updates document links based on selected language and app.
     */
    function updateDocumentLinks() {
        setHref("eula", `${currentApp}/${currentLanguage}/EULA_${currentApp}.html`);
        setHref("terms", `${currentApp}/${currentLanguage}/Terms_${currentApp}.html`);
        setHref("privacy-policy", `${currentApp}/${currentLanguage}/Privacy_${currentApp}.html`);
    }

    /**
     * Updates the href attribute of an anchor tag.
     * @param {string} id - The element's ID.
     * @param {string} url - The URL to set.
     */
    function setHref(id, url) {
        const element = document.getElementById(id);
        if (element) element.setAttribute("href", url);
    }

    // Event listener for language selection
    if (languageSelector) {
        languageSelector.addEventListener("change", function () {
            currentLanguage = this.value;
            localStorage.setItem("selectedLanguage", currentLanguage);
            loadLanguageStrings(currentLanguage);
            updateDocumentLinks();
        });
    }

    // Event listener for app selection
    if (appSelector) {
        appSelector.addEventListener("change", function () {
            currentApp = this.value;
            localStorage.setItem("selectedApp", currentApp);
            updateDocumentLinks();
        });
    }

    // Load initial language and update links
    loadLanguageStrings(currentLanguage);
    updateDocumentLinks();
});
