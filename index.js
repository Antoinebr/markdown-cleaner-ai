import OpenAI from 'openai';
import dotenv from 'dotenv';


dotenv.config();

class MarkdownCleaner {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error('OpenAI API key is required');
    }

    this.openai = new OpenAI({
      apiKey: apiKey
    });

    // Optional: Use environment variables for configuration
    this.model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
    this.maxTokens = parseInt(process.env.MAX_TOKENS) || 4096;
  }

  async cleanMarkdown(markdownContent) {
    try {
      // Craft a detailed prompt for cleaning markdown
      const cleaningPrompt = `
        You are an expert markdown cleaner. Please do the following:
        1. Correct any formatting inconsistencies
        2. Standardize heading levels
        3. Fix broken links
        4. Ensure proper code block formatting
        5. Remove any unnecessary whitespace
        6. Correct any grammatical or spelling errors
        7. Maintain the original intent and content of the markdown

        Original Markdown:
        ---
        ${markdownContent}
        ---

        Please return ONLY the cleaned markdown, without any additional commentary or explanation.
      `;

      // Call OpenAI API to clean the markdown
      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: "system", 
            content: "You are an expert markdown cleaner and formatter."
          },
          {
            role: "user", 
            content: cleaningPrompt
          }
        ],
        max_tokens: this.maxTokens
      });

      const cleanedMarkdown = response.choices[0].message.content.trim();

      return cleanedMarkdown;
    } catch (error) {
      console.error('Error cleaning markdown:', error);
      throw error;
    }
  }
}



export default MarkdownCleaner;
