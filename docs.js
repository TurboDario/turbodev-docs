document.addEventListener("DOMContentLoaded", function () {
    const languageSelector = document.getElementById("language-selector");
    const appSelector = document.getElementById("app-selector");

    if (!languageSelector || !appSelector) {
        console.error("Selectors not found in the document. Make sure they exist.");
        return;
    }

    let currentLanguage = localStorage.getItem("selectedLanguage") || "en";
    let currentApp = localStorage.getItem("selectedApp") || "parkar";

    languageSelector.value = currentLanguage;
    appSelector.value = currentApp;

    function loadLanguageStrings(language) {
        fetch(`locales/${language}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Language file not found: locales/${language}.json`);
                }
                return response.json();
            })
            .then(strings => {
                setTextContent("app_name", strings.app_name);
                setTextContent("welcome", strings.welcome);
                setTextContent("eula", strings.eula);
                setTextContent("terms", strings.terms);
                setTextContent("privacy_policy", strings.privacy_policy);
                setTextContent("developer", strings.developer);
                setTextContent("version", strings.version.replace("{version}", "1.0.0"));
                setTextContent("contact_support", strings.contact_support);
                setTextContent("rate_us", strings.rate_us);

                updateDocumentLinks();
            })
            .catch(error => console.error("Error loading language file:", error));
    }

    function setTextContent(id, text) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = text;
        }
    }

    function updateDocumentLinks() {
        setHref("eula", `${currentApp}/${currentLanguage}/EULA_${currentApp}.html`);
        setHref("terms", `${currentApp}/${currentLanguage}/Terms_${currentApp}.html`);
        setHref("privacy_policy", `${currentApp}/${currentLanguage}/Privacy_${currentApp}.html`);
    }

    function setHref(id, url) {
        const element = document.getElementById(id);
        if (element) {
            element.setAttribute("href", url);
        }
    }

    languageSelector.addEventListener("change", function () {
        currentLanguage = this.value;
        localStorage.setItem("selectedLanguage", currentLanguage);
        loadLanguageStrings(currentLanguage);
        updateDocumentLinks();
    });

    appSelector.addEventListener("change", function () {
        currentApp = this.value;
        localStorage.setItem("selectedApp", currentApp);
        updateDocumentLinks();
    });

    loadLanguageStrings(currentLanguage);
});
