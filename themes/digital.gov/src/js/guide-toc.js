// Guide Table of Contents
// Replaces guidenav.js that used Hugo's .TableOfContents with Summary Box component — https://designsystem.digital.gov/components/summary-box/#package
// Get all H2's and create a top of the page Table of Contents if shortcode is used on the markdown page

const guideTOC = document.querySelector(".usa-summary-box");
const guideTOCList = document.querySelector(".usa-list");

const topListItem = document.querySelector(".usa-sidenav .usa-current");
const parent = topListItem.parentNode;
parent.classList.add("current");
// console.log(topListItem, parent);

// .parents("li").last();
// topListItem.addClass("current");

if (guideTOC) {
  const guideLinks = document.querySelectorAll("h2");
  const linksToDisplay = [];
  guideLinks.forEach((link) => {
    linksToDisplay.push(
      `<li><a class="usa-summary-box__link" href="#${link.id}">${link.innerText}</a></li>`
    );
  });

  linksToDisplay.forEach((link) => {
    guideTOCList.insertAdjacentHTML("beforeend", link);
  });
}

// Progressively style each guide chapter for the reader

const guideLinks = Array.from(document.querySelectorAll(".usa-sidenav__item"));
console.log(guideLinks);

guideLinks.forEach(function (link, index) {
  if (link.querySelector(".usa-current")) {
    updateGuideLinks(index);
  }
});

function updateGuideLinks(linkPosition) {
  guideLinks.forEach(function (link, index) {
    if (index < linkPosition) {
      link.classList.add("usa-sidenav__item--read");
    } else {
      link.classList.remove("usa-sidenav__item--read");
    }
  });
}
