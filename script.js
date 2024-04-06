// Fetch and display RSS feeds
fetch('sources.yaml')
    .then(response => response.text())
    .then(text => {
        const sources = YAML.parse(text);
        const rssFeedSection = document.getElementById('rss-feed');
        
        sources.forEach(source => {
            fetch(source.href)
                .then(response => response.text())
                .then(xmlText => {
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
                    const items = xmlDoc.querySelectorAll('item');
                    
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
