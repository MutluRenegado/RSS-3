// Fetch the sources.yaml file to get the list of RSS feed sources
import YAML from 'js-yaml';
<script src="https://cdn.jsdelivr.net/npm/js-yaml/dist/js-yaml.min.js"></script>

fetch('sources.yaml')
    .then(response => response.text())
    .then(text => {
        const sources = YAML.parse(text);
        const rssFeedSection = document.getElementById('rss-feed');

        sources.forEach(source => {
            // Fetch each RSS feed URL
            fetch(source.href)
                .then(response => response.text())
                .then(xmlText => {
                    // Parse the XML data
                    const parser = new DOMParser();
                    const xml = parser.parseFromString(xmlText, 'text/xml');
                    const items = xml.querySelectorAll('item');

                    // Create a title for the RSS feed
                    const feedTitle = document.createElement('h2');
                    feedTitle.textContent = source.title;
                    rssFeedSection.appendChild(feedTitle);

                    // Create an unordered list to display feed items
                    const ul = document.createElement('ul');
                    items.forEach(item => {
                        const li = document.createElement('li');
                        const link = document.createElement('a');
                        link.textContent = item.querySelector('title').textContent;
                        link.href = item.querySelector('link').textContent;
                        li.appendChild(link);
                        ul.appendChild(li);
                    });
                    rssFeedSection.appendChild(ul);
                })
                .catch(error => console.error('Error fetching RSS feed:', error));
        });
    })
    .catch(error => console.error('Error fetching sources:', error));
