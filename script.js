// script.js

document.addEventListener("DOMContentLoaded", function() {
    const sources = [
        "https://rssgenerator.mooo.com/feeds/?p=aaHR0cHM6Ly9uZXdzLmdvb2dsZS5jb20vaG9tZT9obD1lbi1HQiZnbD1HQiZjZWlkPUdCOmVu",
        "https://www.nytimes.com/rss",
        "https://www.washingtonpost.com/discussions/2018/10/12/washington-post-rss-feeds/",
        "https://rssgenerator.mooo.com/feeds/?p=aaHR0cHM6Ly93d3cuY2hpbmFkYWlseS5jb20uY24v",
        "https://www.sabah.com.tr/rss-bilgi/"
    ];

    const rssFeedSection = document.getElementById("rss-feed");

    // Fetch RSS feeds from all sources
    Promise.all(sources.map(fetchFeed))
        .then(feeds => {
            feeds.forEach(feed => {
                displayFeed(feed);
            });
        })
        .catch(error => {
            console.error("Error fetching RSS feeds:", error);
        });

    // Function to fetch RSS feed from a source
    function fetchFeed(source) {
        return fetch(source)
            .then(response => response.json())
            .then(data => data.items)
            .catch(error => {
                console.error("Error fetching RSS feed:", error);
                return [];
            });
    }

    // Function to display RSS feed items
    function displayFeed(feedItems) {
        feedItems.forEach(item => {
            const article = document.createElement("article");
            article.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <a href="${item.link}" target="_blank">Read more</a>
            `;
            rssFeedSection.appendChild(article);
        });
    }
});
