document.addEventListener("DOMContentLoaded", function () {
    const languageSelector = document.getElementById("language-selector");
    const appSelector = document.getElementById("app-selector");
    const contentContainer = document.querySelector("article");

    let currentLanguage = localStorage.getItem("selectedLanguage") || "en";
    let currentApp = localStorage.getItem("selectedApp") || "parkar";

    if (languageSelector) languageSelector.value = currentLanguage;
    if (appSelector) appSelector.value = currentApp;

    function loadLanguageStrings(language) {
        fetch(`locales/${language}.json`)
            .then(response => response.json())
            .then(strings => {
                setTextContent("page-title", strings.page_title);
                setTextContent("app-name", strings.app_name);
                setTextContent("label-app", strings.label_app);
                setTextContent("label-language", strings.label_language);
                setTextContent("welcome", strings.welcome);
                setTextContent("developer", strings.developer);
                setTextContent("version", strings.version.replace("{version}", "1.0.0"));
                setTextContent("contact-support", strings.contact_support);
                setTextContent("rate-us", strings.rate_us);
                setTextContent("back-home", strings.back_home);
                setTextContent("developer-name", strings.developer);
                setTextContent("home-link", strings.home);
                updateDocumentContent();
            })
            .catch(error => console.error("Error loading language file:", error));
    }

    function setTextContent(id, text) {
        const element = document.getElementById(id);
        if (element) element.textContent = text;
    }

    function updateDocumentContent() {
        const filename = window.location.pathname.split('/').pop(); // Get the current file name
        const newPath = `/${currentApp}/${currentLanguage}/${filename}`; // New path based on selected language

        fetch(newPath)
            .then(response => {
                if (!response.ok) throw new Error(`Error loading content file: ${newPath}`);
                return response.text();
            })
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                const newContent = doc.querySelector("article");

                if (newContent) {
                    contentContainer.innerHTML = newContent.innerHTML; // Replace only the article content
                } else {
                    console.error("No <article> found in:", newPath);
                }
            })
            .catch(error => console.error("Error loading content:", error));
    }

    if (languageSelector) {
        languageSelector.addEventListener("change", function () {
            currentLanguage = this.value;
            localStorage.setItem("selectedLanguage", currentLanguage);
            loadLanguageStrings(currentLanguage);
            updateDocumentContent();
        });
    }

    if (appSelector) {
        appSelector.addEventListener("change", function () {
            currentApp = this.value;
            localStorage.setItem("selectedApp", currentApp);
            updateDocumentContent();
        });
    }

    loadLanguageStrings(currentLanguage);
    updateDocumentContent();
});
