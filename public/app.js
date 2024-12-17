document.addEventListener('DOMContentLoaded', () => {
    const markdownInput = document.getElementById('markdown-input');
    const markdownOutput = document.getElementById('markdown-output');
    const cleanBtn = document.getElementById('clean-btn');
    const spinner = document.getElementById('spinner');
    const copyBtn = document.getElementById('copy-btn');
    const renderBtn = document.getElementById('render-btn');
    const markdownPreview = document.getElementById('markdown-preview');
    const themeToggle = document.getElementById('theme-toggle');

    // Configure marked for syntax highlighting
    marked.setOptions({
        highlight: function(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        },
        langPrefix: 'hljs language-'
    });

    // Theme toggle functionality
    function toggleTheme() {
        const htmlElement = document.documentElement;
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    }

    // Check and set initial theme
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const htmlElement = document.documentElement;

        if (savedTheme === 'light') {
            htmlElement.classList.remove('dark');
        } else if (savedTheme === 'dark' || savedTheme === null) {
            htmlElement.classList.add('dark');
        }
    }

    // Initialize theme
    initTheme();

    // Theme toggle event listener
    themeToggle.addEventListener('click', toggleTheme);

    function toggleSpinner(show) {
        if (!spinner) {
            console.error('Spinner element not found');
            return;
        }

        if (show) {
            spinner.classList.remove('hidden');
            cleanBtn.disabled = true;
        } else {
            spinner.classList.add('hidden');
            cleanBtn.disabled = false;
        }
    }

    function renderMarkdown(markdown) {
        if (!markdown.trim()) {
            markdownPreview.classList.add('hidden');
            return;
        }

        // Render markdown
        const renderedHtml = marked.parse(markdown);
        markdownPreview.innerHTML = renderedHtml;
        markdownPreview.classList.remove('hidden');

        // Highlight code blocks
        markdownPreview.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    }

    cleanBtn.addEventListener('click', async () => {
        const markdownContent = markdownInput.value;

        if (!markdownContent.trim()) {
            alert('Please enter some markdown to clean');
            return;
        }

        try {
            // Show spinner
            toggleSpinner(true);

            const response = await fetch('/clean-markdown', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ markdownContent })
            });

            const result = await response.json();

            // Hide spinner
            toggleSpinner(false);

            if (result.success) {
                markdownOutput.value = result.cleanedMarkdown;
                // Automatically render the cleaned markdown
                renderMarkdown(result.cleanedMarkdown);
            } else {
                alert(`Error cleaning markdown: ${result.error}`);
            }
        } catch (error) {
            // Hide spinner
            toggleSpinner(false);
            
            console.error('Error:', error);
            alert('An error occurred while cleaning markdown');
        }
    });

    copyBtn.addEventListener('click', () => {
        const cleanedMarkdown = markdownOutput.value;

        if (!cleanedMarkdown.trim()) {
            alert('No markdown to copy');
            return;
        }

        navigator.clipboard.writeText(cleanedMarkdown)
            .then(() => {
                alert('Cleaned markdown copied to clipboard');
            })
            .catch(err => {
                console.error('Failed to copy:', err);
                alert('Failed to copy markdown');
            });
    });

    renderBtn.addEventListener('click', () => {
        const cleanedMarkdown = markdownOutput.value;
        renderMarkdown(cleanedMarkdown);
    });
});
