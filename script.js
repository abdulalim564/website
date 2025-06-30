console.log("script.js loaded successfully");

const navSlide = () => {
  console.log("navSlide function called");
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");

  if (!burger || !nav) {
    console.error("Burger or nav-links element not found");
    return;
  }

  burger.addEventListener("click", () => {
    console.log("Burger menu clicked");
    nav.classList.toggle("active");
    burger.classList.toggle("toggle");
  });
};

const switchSection = () => {
  console.log("switchSection function called");
  const navLinks = document.querySelectorAll(".nav-link");
  const footerLinks = document.querySelectorAll(".footer-link");
  const sections = document.querySelectorAll(".section");
  const nav = document.querySelector(".nav-links");
  const burger = document.querySelector(".burger");

  const allLinks = [...navLinks, ...footerLinks];

  if (!allLinks.length || !sections || !nav || !burger) {
    console.error("Required elements for switchSection not found");
    return;
  }

  allLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute("data-section");
      console.log(`Switching to section: ${sectionId}`);

      allLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      sections.forEach((section) => section.classList.remove("active"));

      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.classList.add("active");
      } else {
        console.error(`Section with ID ${sectionId} not found`);
      }

      nav.classList.remove("active");
      burger.classList.remove("toggle");
    });
  });
};

const comparePhones = () => {
  console.log("comparePhones function called");
  const cards = document.querySelectorAll(".card");
  const phonesData = {};

  if (!cards.length) {
    console.error("No cards found to compare.");
    return;
  }

  cards.forEach((card) => {
    const id = card.getAttribute("data-id");
    phonesData[id] = {
      name: card.getAttribute("data-name"),
      image: card.getAttribute("data-image"),
      processor: card.getAttribute("data-processor"),
      processorScore: parseFloat(card.getAttribute("data-processor-score")) || 0,
      camera: card.getAttribute("data-camera"),
      cameraScore: parseFloat(card.getAttribute("data-camera-score")) || 0,
      battery: card.getAttribute("data-battery"),
      batteryCapacity: parseFloat(card.getAttribute("data-battery-capacity")) || 0,
      ram: card.getAttribute("data-ram"),
      ramSize: parseFloat(card.getAttribute("data-ram-size")) || 0,
      frontCamera: card.getAttribute("data-front-camera"),
      frontCameraScore: parseFloat(card.getAttribute("data-front-camera-score")) || 0,
      display: card.getAttribute("data-display"),
      displaySize: parseFloat(card.getAttribute("data-display-size")) || 0,
      price: card.getAttribute("data-price"),
      priceValue: parseFloat(card.getAttribute("data-price-value")) || 0,
    };
  });

  const compareButton = document.getElementById("compare-button");
  const compareResult = document.getElementById("compare-result");
  const compareTabs = document.getElementById("compare-tabs");
  const phone1Select = document.getElementById("phone1");
  const phone2Select = document.getElementById("phone2");
  const phone3Select = document.getElementById("phone3");
  const phone4Select = document.getElementById("phone4");
  const searchBar = document.getElementById("search-phones");
  const specToggles = document.querySelectorAll(".spec-toggle");

  if (
    !compareButton ||
    !compareResult ||
    !compareTabs ||
    !phone1Select ||
    !phone2Select ||
    !phone3Select ||
    !phone4Select
  ) {
    console.error("Compare section elements not found.");
    return;
  }

  const populateDropdowns = (searchTerm = "") => {
    console.log("Populating dropdowns with search term:", searchTerm);
    const dropdowns = [phone1Select, phone2Select, phone3Select, phone4Select];
    const options = Object.keys(phonesData).map((key) => ({
      key,
      name: phonesData[key].name,
    }));

    dropdowns.forEach((dropdown) => {
      const currentValue = dropdown.value;
      dropdown.innerHTML = '<option value="">Select Phone</option>';
      options.forEach((option) => {
        if (
          searchTerm === "" ||
          option.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          const opt = document.createElement("option");
          opt.value = option.key;
          opt.textContent = option.name;
          dropdown.appendChild(opt);
        }
      });
      dropdown.value = currentValue &&
        Array.from(dropdown.options).some((opt) => opt.value === currentValue)
        ? currentValue
        : "";
    });
  };

  populateDropdowns();

  if (searchBar) {
    searchBar.addEventListener("input", () => {
      const searchTerm = searchBar.value;
      console.log("Search bar input:", searchTerm);
      populateDropdowns(searchTerm);
    });
  }

  const renderComparison = () => {
    console.log("Rendering comparison");
    const selectedPhones = [
      phone1Select.value,
      phone2Select.value,
      phone3Select.value,
      phone4Select.value,
    ].filter((phone) => phone !== "");

    if (selectedPhones.length < 2) {
      compareResult.innerHTML =
        '<p style="color: #666;">Please select at least two phones to compare.</p>';
      compareTabs.innerHTML = "";
      console.log("Less than 2 phones selected for comparison");
      return;
    }

    const uniquePhones = [...new Set(selectedPhones)];
    const visibleSpecs = Array.from(specToggles)
      .filter((toggle) => toggle.checked)
      .map((toggle) => toggle.getAttribute("data-spec"));

    let tableHTML = "<table><tr><th>Specs</th>";
    uniquePhones.forEach((phone) => {
      tableHTML += `<th>${phonesData[phone].name}</th>`;
    });
    tableHTML += "</tr>";

    if (visibleSpecs.includes("image")) {
      tableHTML += "<tr><td class='spec-label'>Image</td>";
      uniquePhones.forEach((phone) => {
        tableHTML += `<td><img src="${phonesData[phone].image}" alt="${phonesData[phone].name}"></td>`;
      });
      tableHTML += "</tr>";
    }

    if (visibleSpecs.includes("processor")) {
      tableHTML += "<tr><td class='spec-label'>Processor</td>";
      const processorScores = uniquePhones.map(
        (phone) => phonesData[phone].processorScore
      );
      const bestProcessor = Math.max(...processorScores);
      uniquePhones.forEach((phone) => {
        const isBest = phonesData[phone].processorScore === bestProcessor;
        tableHTML += `<td class="${
          isBest ? "best-spec" : ""
        }">${phonesData[phone].processor}</td>`;
      });
      tableHTML += "</tr>";
    }

    if (visibleSpecs.includes("camera")) {
      tableHTML += "<tr><td class='spec-label'>Camera</td>";
      const cameraScores = uniquePhones.map(
        (phone) => phonesData[phone].cameraScore
      );
      const bestCamera = Math.max(...cameraScores);
      uniquePhones.forEach((phone) => {
        const isBest = phonesData[phone].cameraScore === bestCamera;
        tableHTML += `<td class="${
          isBest ? "best-spec" : ""
        }">${phonesData[phone].camera}</td>`;
      });
      tableHTML += "</tr>";
    }

    if (visibleSpecs.includes("battery")) {
      tableHTML += "<tr><td class='spec-label'>Battery</td>";
      const batteryCapacities = uniquePhones.map(
        (phone) => phonesData[phone].batteryCapacity
      );
      const bestBattery = Math.max(...batteryCapacities);
      uniquePhones.forEach((phone) => {
        const isBest = phonesData[phone].batteryCapacity === bestBattery;
        tableHTML += `<td class="${
          isBest ? "best-spec" : ""
        }">${phonesData[phone].battery}</td>`;
      });
      tableHTML += "</tr>";
    }

    if (visibleSpecs.includes("ram")) {
      tableHTML += "<tr><td class='spec-label'>RAM & Storage</td>";
      const ramSizes = uniquePhones.map((phone) => phonesData[phone].ramSize);
      const bestRam = Math.max(...ramSizes);
      uniquePhones.forEach((phone) => {
        const isBest = phonesData[phone].ramSize === bestRam;
        tableHTML += `<td class="${
          isBest ? "best-spec" : ""
        }">${phonesData[phone].ram}</td>`;
      });
      tableHTML += "</tr>";
    }

    if (visibleSpecs.includes("frontCamera")) {
      tableHTML += "<tr><td class='spec-label'>Front Camera</td>";
      const frontCameraScores = uniquePhones.map(
        (phone) => phonesData[phone].frontCameraScore
      );
      const bestFrontCamera = Math.max(...frontCameraScores);
      uniquePhones.forEach((phone) => {
        const isBest = phonesData[phone].frontCameraScore === bestFrontCamera;
        tableHTML += `<td class="${
          isBest ? "best-spec" : ""
        }">${phonesData[phone].frontCamera}</td>`;
      });
      tableHTML += "</tr>";
    }

    if (visibleSpecs.includes("display")) {
      tableHTML += "<tr><td class='spec-label'>Display</td>";
      const displaySizes = uniquePhones.map(
        (phone) => phonesData[phone].displaySize
      );
      const bestDisplay = Math.max(...displaySizes);
      uniquePhones.forEach((phone) => {
        const isBest = phonesData[phone].displaySize === bestDisplay;
        tableHTML += `<td class="${
          isBest ? "best-spec" : ""
        }">${phonesData[phone].display}</td>`;
      });
      tableHTML += "</tr>";
    }

    if (visibleSpecs.includes("price")) {
      tableHTML += "<tr><td class='spec-label'>Price</td>";
      const prices = uniquePhones.map((phone) => phonesData[phone].priceValue);
      const bestPrice = Math.min(...prices);
      uniquePhones.forEach((phone) => {
        const isBest = phonesData[phone].priceValue === bestPrice;
        tableHTML += `<td class="${
          isBest ? "best-spec" : ""
        }">${phonesData[phone].price}</td>`;
      });
      tableHTML += "</tr>";
    }

    tableHTML += "</table>";
    compareResult.innerHTML = tableHTML;

    let tabsHTML = "<div class='tab-buttons'>";
    uniquePhones.forEach((phone, index) => {
      tabsHTML += `<button class="tab-button ${
        index === 0 ? "active" : ""
      }" data-tab="${phone}">${phonesData[phone].name}</button>`;
    });
    tabsHTML += "</div>";

    tabsHTML += "<div class='tab-contents'>";
    uniquePhones.forEach((phone, index) => {
      tabsHTML += `
        <div class="tab-content ${
          index === 0 ? "active" : ""
        }" id="tab-${phone}">
          <h3>${phonesData[phone].name}</h3>
          ${
            visibleSpecs.includes("image")
              ? `<p><img src="${phonesData[phone].image}" alt="${phonesData[phone].name}"></p>`
              : ""
          }
          ${
            visibleSpecs.includes("processor")
              ? `<p><strong>Processor:</strong> ${phonesData[phone].processor}</p>`
              : ""
          }
          ${
            visibleSpecs.includes("camera")
              ? `<p><strong>Camera:</strong> ${phonesData[phone].camera}</p>`
              : ""
          }
          ${
            visibleSpecs.includes("battery")
              ? `<p><strong>Battery:</strong> ${phonesData[phone].battery}</p>`
              : ""
          }
          ${
            visibleSpecs.includes("ram")
              ? `<p><strong>RAM & Storage:</strong> ${phonesData[phone].ram}</p>`
              : ""
          }
          ${
            visibleSpecs.includes("frontCamera")
              ? `<p><strong>Front Camera:</strong> ${phonesData[phone].frontCamera}</p>`
              : ""
          }
          ${
            visibleSpecs.includes("display")
              ? `<p><strong>Display:</strong> ${phonesData[phone].display}</p>`
              : ""
          }
          ${
            visibleSpecs.includes("price")
              ? `<p><strong>Price:</strong> ${phonesData[phone].price}</p>`
              : ""
          }
        </div>
      `;
    });
    tabsHTML += "</div>";
    compareTabs.innerHTML = tabsHTML;

    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        console.log(
          `Tab button clicked for phone ID: ${button.getAttribute("data-tab")}`
        );
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        tabContents.forEach((content) => content.classList.remove("active"));
        button.classList.add("active");
        const tabContent = document.getElementById(
          `tab-${button.getAttribute("data-tab")}`
        );
        if (tabContent) {
          tabContent.classList.add("active");
        } else {
          console.error(
            `Tab content for phone ID ${button.getAttribute("data-tab")} not found`
          );
        }
      });
    });
  };

  compareButton.addEventListener("click", renderComparison);

  specToggles.forEach((toggle) => {
    toggle.addEventListener("change", () => {
      console.log(`Spec toggle changed: ${toggle.getAttribute("data-spec")}`);
      renderComparison();
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  try {
    navSlide();
    switchSection();
    comparePhones();
  } catch (error) {
    console.error("Error during initialization:", error);
  }
});