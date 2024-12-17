# 🤖 Markdown Cleaner AI: Intelligent Markdown Formatting Tool

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/antoineBr/markdown-cleaner-ai.svg?style=social&label=Star)](https://github.com/antoineBr/markdown-cleaner-ai)
[![OpenAI](https://img.shields.io/badge/Powered%20by-OpenAI-blue)](https://openai.com)

## 📝 Overview

Markdown Cleaner AI is an intelligent, AI-powered tool that automatically cleans, formats, and improves markdown content using advanced natural language processing.

### 🌟 Key Features

- **Intelligent Formatting**: Automatically corrects markdown structure
- **AI-Powered Cleaning**: Uses OpenAI's GPT to enhance markdown quality
- **Consistent Styling**: Standardizes heading levels, lists, and code blocks
- **Error Correction**: Fixes grammatical and formatting issues
- **Dark/Light Mode**: Responsive web interface with theme support

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- OpenAI API Key

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/antoineBr/markdown-cleaner-ai.git
   cd markdown-cleaner-ai
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file
   ```bash
   cp .env.example .env
   ```

4. Add your OpenAI API Key to `.env`
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

5. Run the application
   ```bash
   npm start
   ```

## 🐳 Docker Support

Run the application using Docker:

```bash
# Build and run
docker-compose up --build
```

## 🛠 Technologies

- Node.js
- Express
- OpenAI GPT
- Tailwind CSS
- Docker

## 📋 Configuration

Customize the application using environment variables in `.env`:

- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `OPENAI_MODEL`: GPT model to use (default: gpt-4-turbo-preview)
- `MAX_TOKENS`: Maximum tokens for markdown cleaning

## 🔒 Security

- API keys are managed through environment variables
- Input sanitization prevents potential security risks



## 🌐 Contact

Antoine Brieux - [@antoineBr](https://twitter.com/antoineBr)

Project Link: [https://github.com/antoineBr/markdown-cleaner-ai](https://github.com/antoineBr/markdown-cleaner-ai)

---

**Made with ❤️ by Antoine Brossault**

### Star the Project ⭐
If you find this project useful, please give it a star on GitHub!
