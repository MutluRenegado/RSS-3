document.addEventListener("DOMContentLoaded", function() {
    const rssFeedSection = document.getElementById('rss-feed');

    // Fetch the sources.yaml file to get the list of RSS feed sources
    fetch('feed.yaml')
        .then(response => response.text())
        .then(yamlText => {
            const sources = jsyaml.load(yamlText); // Using js-yaml library to parse YAML

            // Iterate over each RSS feed source
            sources.forEach(source => {
                // Fetch the RSS feed XML data
                fetch(source.href)
                    .then(response => response.text())
                    .then(xmlText => {
                        // Parse the XML data
                        const parser = new DOMParser();
                        const xml = parser.parseFromString(xmlText, 'text/xml');
                        const items = xml.querySelectorAll('item');

                        // Create elements to display the RSS feed content
                        const feedContainer = document.createElement('div');
                        feedContainer.classList.add('feed-container');

                        const feedTitle = document.createElement('h2');
                        feedTitle.textContent = source.title;
                        feedContainer.appendChild(feedTitle);

                        const feedList = document.createElement('ul');
                        feedList.classList.add('feed-list');

                        items.forEach(item => {
                            const listItem = document.createElement('li');
                            listItem.classList.add('feed-item');

                            const link = document.createElement('a');
                            link.textContent = item.querySelector('title').textContent;
                            link.href = item.querySelector('link').textContent;
                            link.target = '_blank'; // Open links in a new tab
                            listItem.appendChild(link);

                            feedList.appendChild(listItem);
                        });

                        feedContainer.appendChild(feedList);
                        rssFeedSection.appendChild(feedContainer);
                    })
                    .catch(error => console.error('Error fetching RSS feed:', error));
            });
        })
        .catch(error => console.error('Error fetching feed:', error));
});
