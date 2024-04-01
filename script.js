// JavaScript code goes here
const cacheUrl = "https://github.com/MutluRenegado/RSS-3.git";
const sources = [
    {
        title: "Feed 1",
        href: "https://rssgenerator.mooo.com/feeds/?p=aaHR0cHM6Ly9uZXdzLmdvb2dsZS5jb20vaG9tZT9obD1lbi1HQiZnbD1HQiZjZWlkPUdCOmVu/"
    },
    {
        title: "Feed 2",
        href: "https://www.nytimes.com/rss"
    },
    {
        title: "Feed 3",
        href: "https://www.washingtonpost.com/discussions/2018/10/12/washington-post-rss-feeds/"
    },
    {
        title: "Feed 4",
        href: "https://rssgenerator.mooo.com/feeds/?p=aaHR0cHM6Ly93d3cuY2hpbmFkYWlseS5jb20uY24v"
    },
    {
        title: "Feed 5",
        href: "https://www.sabah.com.tr/rss-bilgi/"
    }
];

const rssFeedsContainer = document.getElementById('rss-feeds');

// Fetch and display RSS feeds
async function fetchAndDisplayFeeds() {
    try {
        // Fetch cached data
        const cacheResponse = await fetch(cacheUrl);
        const cacheData = await cacheResponse.json();

        // Check if cached data exists and is not expired
        const cacheExpiration = 60 * 60 * 1000; // 1 hour in milliseconds
        const currentTime = new Date().getTime();
        if (cacheData && currentTime - cacheData.timestamp < cacheExpiration) {
            displayFeeds(cacheData.feeds);
        } else {
            // Fetch fresh data from sources
            const feeds = await Promise.all(sources.map(async (source) => {
                const response = await fetch(source.href);
                const xmlString = await response.text();
                const parser = new DOMParser();
                const xml = parser.parseFromString(xmlString, 'text/xml');
                const items = xml.querySelectorAll('item');
                return {
                    title: source.title,
                    items: Array.from(items).map(item => ({
                        title: item.querySelector('title').textContent,
                        link: item.querySelector('link').textContent
                    }))
                };
            }));

            // Cache the fresh data
            const dataToCache = {
                timestamp: currentTime,
                feeds
            };
            localStorage.setItem('rssCache', JSON.stringify(dataToCache));

            displayFeeds(feeds);
        }
    } catch (error) {
        console.error('Error fetching or parsing RSS feeds:', error);
    }
}

// Display RSS feeds on the page
function displayFeeds(feeds) {
    rssFeedsContainer.innerHTML = ''; // Clear existing content
    feeds.forEach(feed => {
        const feedDiv = document.createElement('div');
        feedDiv.innerHTML = `<h2>${feed.title}</h2>`;
        const ul = document.createElement('ul');
        feed.items.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${item.link}" target="_blank">${item.title}</a>`;
            ul.appendChild(li);
        });
        feedDiv.appendChild(ul);
        rssFeedsContainer.appendChild(feedDiv);
    });
}

// Call the function to fetch and display feeds
fetchAndDisplayFeeds();
