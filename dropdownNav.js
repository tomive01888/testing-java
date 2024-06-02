document.addEventListener("DOMContentLoaded", function () {
  const selectedOption = document.querySelector(".selected-option");
  const dropdownOptions = document.querySelector(".dropdown-options");

  // Function to update the selected option based on the language code in the URL
  function updateSelectedOption() {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const pathSegments = url.pathname.split("/");
    const languageCode = pathSegments[1] || "default"; // Get the language code from the URL, default to "default" if not found

    // Find the corresponding dropdown option based on the language code
    const selectedDropdownOption = dropdownOptions.querySelector(`[data-value="${languageCode}"]`);
    if (selectedDropdownOption) {
      // Update the selected option HTML
      selectedOption.innerHTML = selectedDropdownOption.innerHTML;
    }
  }

  // Call the function to update the selected option when the page loads
  updateSelectedOption();

  selectedOption.addEventListener("click", function () {
    dropdownOptions.style.display = dropdownOptions.style.display === "block" ? "none" : "block";
  });

  dropdownOptions.addEventListener("click", function (event) {
    const target = event.target.closest("li");
    if (!target) return;

    const selectedValue = target.getAttribute("data-value");
    const selectedText = target.textContent.trim();

    selectedOption.innerHTML = target.innerHTML;

    dropdownOptions.style.display = "none";

    handleLanguageChange(selectedValue);
  });
});

function handleLanguageChange(languageCode) {
  redirectToLanguage(languageCode);
  console.log("Selected language:", languageCode);
}

export function redirectToLanguage(languageCode) {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const pathSegments = url.pathname.split("/");

  const supportedLanguages = ["no", "mg"];

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
