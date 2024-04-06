<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Welcome to My Website</h1>
        <nav>
            <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <!-- Add section for RSS feed -->
        <section id="rss-feed">
            <!-- RSS feed will be rendered here -->
        </section>

        <!-- Other sections of your website -->
        <section id="about">
            <h2>About</h2>
            <p>This is a brief description of my website.</p>
        </section>

        <section id="contact">
            <h2>Contact</h2>
            <p>You can contact me at example@example.com</p>
        </section>
    </main>

    <script>
        fetch('source.yaml')
            .then(response => response.text())
            .then(text => {
                const sources = YAML.parse(text);
                const rssFeedSection = document.getElementById('rss-feed');
                
                sources.forEach(source => {
                    fetch(source.href)
                        .then(response => response.text())
                        .then(xmlText => {
                            const parser = new DOMParser();
                            const xml = parser.parseFromString(xmlText, 'text/xml');
                            const items = xml.querySelectorAll('item');
                            
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
                        });
                });
            })
            .catch(error => console.error('Error fetching sources:', error));
    </script>
</body>
</html>
