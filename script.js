fetch('source.yaml')
    .then(response => response.text())
    .then(text => {
        console.log('Source YAML fetched successfully:', text);
        
        const sources = YAML.parse(text);
        console.log('Parsed YAML sources:', sources);
        
        const rssFeedSection = document.getElementById('rss-feed');
        console.log('RSS feed section:', rssFeedSection);
        
        sources.forEach(source => {
            console.log('Processing source:', source);
            
            fetch(source.href)
                .then(response => response.text())
                .then(xmlText => {
                    console.log('RSS XML fetched successfully:', xmlText);
                    
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
                    console.log('Parsed XML document:', xmlDoc);
                    
                    const items = xmlDoc.querySelectorAll('item');
                    console.log('RSS items:', items);
                    
                    const feedTitle = document.createElement('h2');
                    feedTitle.textContent = source.title;
                    rssFeedSection.appendChild(feedTitle);
                    console.log('Feed title element created:', feedTitle);
                    
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
                    console.log('RSS feed items appended to the DOM.');
                })
                .catch(error => console.error('Error fetching or parsing RSS feed:', error));
        });
    })
    .catch(error => console.error('Error fetching sources:', error));
