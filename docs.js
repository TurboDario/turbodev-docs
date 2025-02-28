document.addEventListener("DOMContentLoaded", function () {
    const languageSelector = document.getElementById("language-selector");
    const homeSection = document.getElementById("home-section");
    const contentSection = document.getElementById("content-section");
    const contentContainer = document.getElementById("content-container");
    const eulaLink = document.getElementById("eula");
    const termsLink = document.getElementById("terms");
    const privacyLink = document.getElementById("privacy_policy");
    const backHomeLink = document.getElementById("back-home");
  
    let currentLanguage = localStorage.getItem("selectedLanguage") || "en";
    let currentFile = null;
    languageSelector.value = currentLanguage;
  
    function loadLanguageStrings(language) {
      fetch(`locales/${language}.json`)
        .then((response) => response.json())
        .then((strings) => {
          document.getElementById("page-title").textContent = strings.page_title;
          document.getElementById("app-name").textContent = strings.app_name;
          document.getElementById("label-language").textContent = strings.label_language;
          languageSelector.options[0].textContent = strings.language_english;
          languageSelector.options[1].textContent = strings.language_spanish;
          document.getElementById("welcome").textContent = strings.welcome;
          eulaLink.textContent = strings.eula;
          termsLink.textContent = strings.terms;
          privacyLink.textContent = strings.privacy_policy;
          document.getElementById("developer").textContent = strings.developer;
          document.getElementById("version").textContent = strings.version.replace("{version}", "1.0.0");
          document.getElementById("contact_support").textContent = strings.contact_support;
          document.getElementById("rate_us").textContent = strings.rate_us;
          document.getElementById("developer-name").textContent = strings.developer;
          document.getElementById("home-link").textContent = strings.home;
          backHomeLink.textContent = strings.back_home;
        })
        .catch((error) => console.error("Error loading language file:", error));
    }
  
    function showHome() {
      homeSection.style.display = "block";
      contentSection.style.display = "none";
      contentContainer.innerHTML = "";
      currentFile = null;
      history.replaceState(null, "", window.location.pathname);
    }
  
    function showContent(fileName) {
      homeSection.style.display = "none";
      contentSection.style.display = "block";
      currentFile = fileName;
      history.replaceState(null, "", `#${fileName}`);
      const path = `parkar/${currentLanguage}/${fileName}`;
      fetch(path)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error loading content file: ${path}`);
          }
          return response.text();
        })
        .then((html) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          const newContent = doc.querySelector("article");
          if (newContent) {
            contentContainer.innerHTML = newContent.innerHTML;
          } else {
            contentContainer.innerHTML = "<p>Content not found.</p>";
          }
        })
        .catch((error) => {
          console.error("Error loading content:", error);
          contentContainer.innerHTML = "<p>Unable to load content.</p>";
        });
    }
  
    languageSelector.addEventListener("change", function () {
      currentLanguage = this.value;
      localStorage.setItem("selectedLanguage", currentLanguage);
      loadLanguageStrings(currentLanguage);
      if (currentFile) {
        showContent(currentFile);
      }
    });
  
    eulaLink.addEventListener("click", function (event) {
      event.preventDefault();
      showContent("EULA_ParKar.html");
    });
  
    termsLink.addEventListener("click", function (event) {
      event.preventDefault();
      showContent("Terms_ParKar.html");
    });
  
    privacyLink.addEventListener("click", function (event) {
      event.preventDefault();
      showContent("Privacy_ParKar.html");
    });
  
    backHomeLink.addEventListener("click", function (event) {
      event.preventDefault();
      showHome();
    });
  
    loadLanguageStrings(currentLanguage);
  
    if (window.location.hash) {
      const file = window.location.hash.substring(1);
      showContent(file);
    }
  });
  