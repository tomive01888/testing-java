// Function to fetch JSON content based on the selected language
async function fetchTranslation(language) {
  const response = await fetch(`/translations/${language}.json`);
  if (!response.ok) {
    throw new Error(`Failed to load translation file for language: ${language}`);
  }
  return await response.json();
}

// Function to update text content based on the selected language
export async function updateTextContent(language) {
  try {
    const textContent = await fetchTranslation(language);
    const elementsToTranslate = document.querySelectorAll("[data-translate]");
    elementsToTranslate.forEach((element) => {
      const key = element.getAttribute("data-translate");
      if (textContent[key]) {
        element.textContent = textContent[key];
      }
    });
  } catch (error) {
    console.error(error);
  }
}

export async function initializeLanguage() {
  const pathSegments = window.location.pathname.split("/");
  const supportedLanguages = ["no", "mg", "en", "fr"]; // Add new language codes here
  let language = "en";

  if (supportedLanguages.includes(pathSegments[1])) {
    language = pathSegments[1];
  }

  await updateTextContent(language);

  return language;
}

// Function to redirect to the selected language
export function redirectToLanguage(languageCode) {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const pathSegments = url.pathname.split("/");
  const supportedLanguages = ["no", "mg", "en", "fr"]; // Add new language codes here

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
