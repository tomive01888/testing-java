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

export function redirectToLanguage(languageCode) {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);

  // Remove the hostname and leading slash from the pathname
  let path = url.pathname.substring(1);

  // Split the path into segments
  const pathSegments = path.split("/");

  // Handle the language prefix based on the selected language code
  if (languageCode === "default") {
    // Remove the language prefix if it exists
    if (pathSegments[0] === "no") {
      pathSegments.shift();
    }
  } else {
    // Insert or update the language prefix
    if (pathSegments[0] !== languageCode) {
      pathSegments.unshift(languageCode);
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
