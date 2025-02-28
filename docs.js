document.addEventListener("DOMContentLoaded", function () {
    const languageSelector = document.getElementById("language-selector");

    function loadLanguage(lang) {
        fetch(`locales/${lang}.json`)
            .then(response => response.json())
            .then(data => {
                document.getElementById("app_name").textContent = data.app_name;
                document.getElementById("welcome").textContent = data.welcome;
                document.getElementById("eula").textContent = data.eula;
                document.getElementById("terms").textContent = data.terms;
                document.getElementById("privacy_policy").textContent = data.privacy_policy;
                document.getElementById("developer").textContent = data.developer;
                document.getElementById("version").textContent = data.version.replace("{version}", "1.0.0");
                document.getElementById("contact_support").textContent = data.contact_support;
                document.getElementById("rate_us").textContent = data.rate_us;
            })
            .catch(error => console.error("Error loading language file:", error));
    }

    // Cargar el idioma guardado o inglés por defecto
    const storedLang = localStorage.getItem("selectedLang") || "en";
    languageSelector.value = storedLang;
    loadLanguage(storedLang);

    languageSelector.addEventListener("change", function () {
        const selectedLang = this.value;
        localStorage.setItem("selectedLang", selectedLang);
        loadLanguage(selectedLang);
    });
});
