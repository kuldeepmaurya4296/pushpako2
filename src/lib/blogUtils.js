import DOMPurify from 'isomorphic-dompurify';

export function sanitizeContent(html) {
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'b', 'i', 'u', 'strong', 'em', 's', 'a', 'ul', 'ol', 'li', 'br', 'img', 'iframe', 'blockquote', 'code', 'pre', 'div', 'span'],
        ALLOWED_ATTR: ['href', 'target', 'src', 'alt', 'width', 'height', 'title', 'class', 'style', 'frameborder', 'allow', 'allowfullscreen'],
    });
}

export function calculateReadTime(html) {
    // Strip HTML tags to get text
    const text = html.replace(/<[^>]*>/g, ' ');
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    const wordsPerMinute = 200;
    return Math.ceil(wordCount / wordsPerMinute) || 1;
}
