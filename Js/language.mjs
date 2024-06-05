const textContent = {
  en: {
    search: "Search",
    contact: "Contact",
    about: "About MMF",
    thing1: "Option 1",
    thing2: "Option 2",
    thing3: "Option 3",
    home: "Home",
    aboutUs: "About Us",
    services: "Services",
    blog: "Blog",
    faq: "FAQ",
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    careers: "Careers",
    backToTop: "Back to Top",
  },
  no: {
    search: "Søk",
    contact: "Kontakt",
    about: "Om MMF",
    thing1: "Alternativ 1",
    thing2: "Alternativ 2",
    thing3: "Alternativ 3",
    home: "Hjem",
    aboutUs: "Om Oss",
    services: "Tjenester",
    blog: "Blogg",
    faq: "FAQ",
    terms: "Vilkår for bruk",
    privacy: "Personvern",
    careers: "Karrierer",
    backToTop: "Tilbake til toppen",
  },
  mg: {
    search: "Karoka",
    contact: "Mifandraisa",
    about: "Momba an'i MMF",
    thing1: "Safidy 1",
    thing2: "Safidy 2",
    thing3: "Safidy 3",
    home: "Trano",
    aboutUs: "Momba anay",
    services: "Serivisy",
    blog: "Blaogy",
    faq: "FAQ",
    terms: "Fepetra fampiasana",
    privacy: "Politika tsiambaratelo",
    careers: "Asa",
    backToTop: "Miverina any ambony",
  },
};

export function updateTextContent(language) {
  const elementsToTranslate = document.querySelectorAll("[data-translate]");
  elementsToTranslate.forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (textContent[language] && textContent[language][key]) {
      element.textContent = textContent[language][key];
    }
  });
}

export function initializeLanguage() {
  const pathSegments = window.location.pathname.split("/");
  const supportedLanguages = ["no", "mg", "en"];
  let language = "en";

  if (supportedLanguages.includes(pathSegments[1])) {
    language = pathSegments[1];
  }

  updateTextContent(language);
  document.getElementById("activeLanguage").innerHTML = `
    <img src="/assets/icons8-globe-50.png" alt="globe icon" />
    ${language === "en" ? "English" : language === "no" ? "Norsk" : "Malagasy"}
    <img src="/assets/down-arrow-5-svgrepo-com.svg" alt="arrow down" />
  `;
  return language;
}

export function redirectToLanguage(languageCode) {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const pathSegments = url.pathname.split("/");

  const supportedLanguages = ["no", "mg", "en"];

  if (languageCode === "default") {
    if (supportedLanguages.includes(pathSegments[1])) {
      pathSegments.splice(1, 1);
    }
  } else {
    if (supportedLanguages.includes(pathSegments[1])) {
      pathSegments[1] = languageCode;
    } else if (pathSegments[1] !== languageCode) {
      pathSegments.splice(1, 0, languageCode);
    }
  }

  const newPathname = pathSegments.join("/");
  url.pathname = newPathname;

  window.location.href = url.href;
}
