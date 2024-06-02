document.addEventListener("DOMContentLoaded", () => {
  const translations = {
    english: {
      search: "Search",
      news: "News",
      about: "About us",
      thing1: "thing1",
      thing2: "thing2",
      thing3: "thing3",
    },
    malagasy: {
      search: "Karoka",
      news: "Vaovao",
      about: "Momba anay",
      thing1: "zavatra1",
      thing2: "zavatra2",
      thing3: "zavatra3",
    },
    norwegian: {
      search: "Søk",
      news: "Nyheter",
      about: "Om oss",
      thing1: "ting1",
      thing2: "ting2",
      thing3: "ting3",
    },
  };

  const languageSelector = document.getElementById("languageSelector");
  const textElements = document.querySelectorAll("[data-translate]");

  function translatePage(language) {
    textElements.forEach((element) => {
      const key = element.getAttribute("data-translate");
      if (translations[language] && translations[language][key]) {
        element.textContent = translations[language][key];
      } else {
        console.error(`Translation key '${key}' not found for language '${language}'`);
      }
    });
  }

  languageSelector.addEventListener("change", (event) => {
    if (event.target.name === "language") {
      translatePage(event.target.id);
    }
  });

  // Initial translation
  translatePage("english");
});
