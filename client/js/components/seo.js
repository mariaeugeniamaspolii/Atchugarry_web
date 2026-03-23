function insertarSEO(config) {
    // Default config
    const defaultConfig = {
        title: 'ATCHUGARRY',
        description: 'En Atchugarry nos dedicamos a la construcción, arquitectura y diseño de proyectos inmobiliarios.',
        image: 'https://atchugarry.uy/assets/img/MACA/Maca-4.webp',
        url: 'https://atchugarry.uy/',
        type: 'website'
    };

    const seo = { ...defaultConfig, ...config };

    // Title
    document.title = seo.title;

    // Meta tags
    const metaTags = [
        { name: 'description', content: seo.description },
        { property: 'og:title', content: seo.title },
        { property: 'og:description', content: seo.description },
        { property: 'og:image', content: seo.image },
        { property: 'og:url', content: seo.url },
        { property: 'og:type', content: seo.type },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: seo.title },
        { name: 'twitter:description', content: seo.description },
        { name: 'twitter:image', content: seo.image },
        { rel: 'canonical', href: seo.url }
    ];

    // Insert or update meta tag
    metaTags.forEach(tag => {
        let element;
        
        if (tag.rel) {
            // Canonical link
            element = document.querySelector(`link[rel="${tag.rel}"]`) || document.createElement('link');
            element.rel = tag.rel;
            element.href = tag.href;
        } else if (tag.property) {
            // Open Graph
            element = document.querySelector(`meta[property="${tag.property}"]`) || document.createElement('meta');
            element.setAttribute('property', tag.property);
            element.content = tag.content;
        } else {
            // Meta name
            element = document.querySelector(`meta[name="${tag.name}"]`) || document.createElement('meta');
            element.name = tag.name;
            element.content = tag.content;
        }

        if (!element.parentNode) {
            document.head.appendChild(element);
        }
    });
}