document.addEventListener("DOMContentLoaded", function() {
    const rssFeedSection = document.getElementById('rss-feed');

    // Fetch the sources.yaml file to get the list of RSS feed sources
    fetch('sources.yaml')
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
                        const feedTitle = document.createElement('h2');
                        feedTitle.textContent = source.title;
                        rssFeedSection.appendChild(feedTitle);

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
});
