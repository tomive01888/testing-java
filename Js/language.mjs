/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////            Regular pages               ///////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

// export function redirectToLanguage(languageCode) {
//   const currentUrl = window.location.href;
//   const url = new URL(currentUrl);
//   const pathSegments = url.pathname.split("/");

//   const supportedLanguages = ["no", "mg"]; // Add more languages here and also on the radio buttons

//   if (languageCode === "default") {
//     if (supportedLanguages.includes(pathSegments[1])) {
//       pathSegments.splice(1, 1);
//     }
//   } else {
//     if (supportedLanguages.includes(pathSegments[1])) {
//       pathSegments[1] = languageCode;
//     } else if (pathSegments[1] !== languageCode) {
//       pathSegments.splice(1, 0, languageCode);
//     }
//   }

//   const newPathname = pathSegments.join("/");
//   url.pathname = newPathname;

//   window.location.href = url.href;
// }

/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////        Github pages       //////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

export function redirectToLanguage(languageCode) {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);

  // Remove the hostname and leading slash from the pathname
  let path = url.pathname.substring(1);

  // Split the path into segments
  const pathSegments = path.split("/");

  // Find the position of the language prefix, starting from the repository name
  let languageIndex = pathSegments.indexOf("testing-java") + 1;

  // If the language prefix is not immediately after the repository name, search for it in subdirectories
  if (languageIndex === -1) {
    languageIndex = pathSegments.findIndex((segment) => segment === "no" || segment === "mg");
  }

  // Handle the language prefix based on the selected language code
  if (languageCode === "default") {
    // Remove the language prefix if it exists
    if (languageIndex !== -1) {
      pathSegments.splice(languageIndex, 1);
    }
  } else {
    // Insert or update the language prefix
    if (languageIndex === -1) {
      pathSegments.splice(1, 0, languageCode);
    } else if (pathSegments[languageIndex] !== languageCode) {
      pathSegments[languageIndex] = languageCode;
    }
  }

  path = pathSegments.join("/");
  url.pathname = "/" + path;
  window.location.href = url.href;
}

export function redirectToSelectedLanguage() {
  const languageSelect = document.getElementById("languageSelect");
  const selectedLanguage = languageSelect.value;
  redirectToLanguage(selectedLanguage);
}

// export function redirectToLanguage(languageCode) {
//   const currentUrl = window.location.href;
//   const url = new URL(currentUrl);
//   const pathSegments = url.pathname.split("/");

//   const supportedLanguages = ["no", "default"]; // Legg til flere språk her

//   if (languageCode === "default") {
//     if (supportedLanguages.includes(pathSegments[1])) {
//       pathSegments.splice(1, 1);
//     }
//   } else {
//     if (supportedLanguages.includes(pathSegments[1])) {
//       pathSegments[1] = languageCode;
//     } else if (pathSegments[1] !== languageCode) {
//       pathSegments.splice(1, 0, languageCode);
//     }
//   }

//   const newPathname = pathSegments.join("/");
//   url.pathname = newPathname;

//   window.location.href = url.href;
// }

// export function setLanguage(languageCode) {
//   localStorage.setItem("preferredLanguage", languageCode);
//   redirectToLanguage(languageCode);
// }

// document.addEventListener("DOMContentLoaded", (event) => {
//   const preferredLanguage = localStorage.getItem("preferredLanguage");
//   if (preferredLanguage && preferredLanguage !== "default") {
//     const currentUrl = window.location.href;
//     const url = new URL(currentUrl);
//     const pathSegments = url.pathname.split("/");

//     if (
//       !(
//         pathSegments[1] === preferredLanguage ||
//         (preferredLanguage === "default" && !supportedLanguages.includes(pathSegments[1]))
//       )
//     ) {
//       redirectToLanguage(preferredLanguage);
//     }
//   }
// });
