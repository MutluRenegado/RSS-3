// script.js

// JavaScript code to fetch and render the RSS feed
const rssFeedUrl = "https://example.com/rss-feed"; // Replace with your actual RSS feed URL
const rssFeedSection = document.getElementById("rss-feed");

fetch(rssFeedUrl)
  .then(response => response.text())
  .then(xmlText => {
    // Parse XML text to extract RSS feed items
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    const items = xmlDoc.querySelectorAll("item");

    // Clear previous content from the RSS feed section
    rssFeedSection.innerHTML = "";

    // Render each RSS feed item
    items.forEach(item => {
      const title = item.querySelector("title").textContent;
      const link = item.querySelector("link").textContent;

      // Create HTML elements for the title and link
      const titleElement = document.createElement("h2");
      titleElement.innerHTML = `<a href="${link}" target="_blank">${title}</a>`;

      // Append the title to the RSS feed section
      rssFeedSection.appendChild(titleElement);
    });
  })
  .catch(error => {
    console.error("Error fetching RSS feed:", error);
  });
