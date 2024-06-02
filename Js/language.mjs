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

  // Find the position of the language prefix
  let languageIndex = pathSegments.indexOf(languageCode);

  // Handle the language prefix based on the selected language code
  if (languageCode === "default") {
    // Remove the language prefix if it exists
    if (languageIndex !== -1) {
      pathSegments.splice(languageIndex, 1);
    }
  } else {
    // Insert or update the language prefix
    if (languageIndex === -1) {
      // If the language prefix doesn't exist, insert it after the repository name
      const repoIndex = pathSegments.indexOf("testing-java");
      if (repoIndex !== -1) {
        pathSegments.splice(repoIndex + 1, 0, languageCode);
      } else {
        // If the repository name doesn't exist, prepend the language prefix
        pathSegments.unshift(languageCode);
      }
    } else if (pathSegments[languageIndex - 1] !== "testing-java") {
      // If the language prefix is not immediately after the repository name, update it
      pathSegments[languageIndex - 1] = languageCode;
    }
  }

  // Join the path segments back together
  path = pathSegments.join("/");

  // Update the pathname of the URL
  url.pathname = "/" + path;

  // Navigate to the new URL
  window.location.href = url.href;
}

export function redirectToSelectedLanguage() {
  const languageSelect = document.getElementById("languageSelect");
  const selectedLanguage = languageSelect.value;
  redirectToLanguage(selectedLanguage);
}
