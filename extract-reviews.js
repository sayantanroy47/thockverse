import fs from 'fs';
import path from 'path';

// Get all post directories
const distPostsDir = './dist/posts';
const outputDir = './posts';

// Create output directory
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Function to extract content from HTML
function extractFromHTML(htmlContent, slug) {
    try {
        // Extract title from meta tag
        const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/);
        const title = titleMatch ? titleMatch[1].replace(' | Thockverse', '') : slug;
        
        // Extract description from meta tag  
        const descMatch = htmlContent.match(/<meta name="description" content="(.*?)"/);
        const description = descMatch ? descMatch[1] : '';
        
        // Extract author from JSON-LD
        const authorMatch = htmlContent.match(/"author":\{"@type":"Person","name":"(.*?)"/);
        const author = authorMatch ? authorMatch[1] : 'Unknown';
        
        // Extract date from JSON-LD
        const dateMatch = htmlContent.match(/"datePublished":"(.*?)"/);
        const date = dateMatch ? dateMatch[1].split('T')[0] : '2025-08-07';
        
        // Extract tags from JSON-LD
        const tagsMatch = htmlContent.match(/"keywords":"(.*?)"/);
        const tags = tagsMatch ? tagsMatch[1].split(', ') : [];
        
        // Extract category from breadcrumb
        const categoryMatch = htmlContent.match(/href="\/category\/(.*?)".*?>(.*?)<\/a>/);
        const category = categoryMatch ? categoryMatch[1] : 'switches';
        
        // Extract main content from prose section
        let content = '';
        const proseMatch = htmlContent.match(/<div class="prose"[^>]*>(.*?)<\/div>/s);
        if (proseMatch) {
            content = proseMatch[1]
                .replace(/<h(\d)[^>]*id="([^"]*)"[^>]*>(.*?)<\/h\d>/g, (match, level, id, text) => {
                    return '#'.repeat(parseInt(level)) + ' ' + text.replace(/<[^>]*>/g, '');
                })
                .replace(/<p[^>]*>(.*?)<\/p>/g, '$1\n')
                .replace(/<strong[^>]*>(.*?)<\/strong>/g, '**$1**')
                .replace(/<em[^>]*>(.*?)<\/em>/g, '*$1*')
                .replace(/<ul[^>]*>/g, '')
                .replace(/<\/ul>/g, '')
                .replace(/<li[^>]*>(.*?)<\/li>/g, '- $1')
                .replace(/<[^>]*>/g, '')
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .trim();
        }
        
        // Extract specs if available
        let specs = {};
        const specRows = htmlContent.match(/<tr class="spec-row"[^>]*>.*?<\/tr>/g);
        if (specRows) {
            specRows.forEach(row => {
                const keyMatch = row.match(/<td class="spec-key"[^>]*>(.*?)<\/td>/);
                const valueMatch = row.match(/<td class="spec-value"[^>]*>(.*?)<\/td>/);
                if (keyMatch && valueMatch) {
                    const key = keyMatch[1].trim();
                    const value = valueMatch[1].replace(/<[^>]*>/g, '').trim();
                    specs[key] = value;
                }
            });
        }
        
        // Extract ratings if available
        let ratings = {};
        const ratingItems = htmlContent.match(/<div class="rating-item"[^>]*>.*?<\/div>/g);
        if (ratingItems) {
            ratingItems.forEach(item => {
                const labelMatch = item.match(/<span class="rating-label"[^>]*>(.*?)<\/span>/);
                const scoreMatch = item.match(/<span class="rating-score"[^>]*>(.*?)<\/span>/);
                if (labelMatch && scoreMatch) {
                    ratings[labelMatch[1]] = scoreMatch[1];
                }
            });
        }
        
        // Build markdown frontmatter
        let markdown = '---\n';
        markdown += `title: "${title}"\n`;
        markdown += `description: "${description}"\n`;
        markdown += `author: "${author}"\n`;
        markdown += `date: "${date}"\n`;
        markdown += `category: "${category}"\n`;
        if (tags.length > 0) {
            markdown += `tags: [${tags.map(tag => `"${tag}"`).join(', ')}]\n`;
        }
        
        // Add specs if available
        if (Object.keys(specs).length > 0) {
            markdown += `specs:\n`;
            Object.entries(specs).forEach(([key, value]) => {
                markdown += `  ${key.toLowerCase().replace(/\s+/g, '')}: "${value}"\n`;
            });
        }
        
        // Add ratings if available
        if (Object.keys(ratings).length > 0) {
            markdown += `ratings:\n`;
            Object.entries(ratings).forEach(([key, value]) => {
                markdown += `  ${key}: "${value}"\n`;
            });
        }
        
        markdown += '---\n\n';
        markdown += content;
        
        return markdown;
        
    } catch (error) {
        console.error(`Error processing ${slug}:`, error);
        return `---\ntitle: "${slug}"\n---\n\nContent extraction failed for ${slug}`;
    }
}

// Process all post directories
const postDirs = fs.readdirSync(distPostsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

console.log(`Found ${postDirs.length} posts to extract:`);

postDirs.forEach(slug => {
    const htmlPath = path.join(distPostsDir, slug, 'index.html');
    const markdownPath = path.join(outputDir, `${slug}.md`);
    
    if (fs.existsSync(htmlPath)) {
        console.log(`Extracting: ${slug}`);
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');
        const markdown = extractFromHTML(htmlContent, slug);
        fs.writeFileSync(markdownPath, markdown);
    }
});

console.log(`\n✅ Extracted ${postDirs.length} reviews to ${outputDir}/`);
console.log(`Your switch reviews have been recovered!`);