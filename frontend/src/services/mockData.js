export const getMockShowcaseData = (formData) => {
  const projectName = formData.repoUrl 
    ? formData.repoUrl.split('/').pop() || 'My Project'
    : 'My Awesome Project';
  
  const tone = formData.tone;
  const tags = formData.tags || 'webdev, coding, project';
  const tagArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);

  const linkedinCaptions = generateLinkedInCaptions(projectName, tone, tagArray, formData.variations);
  const readmeMd = generateReadMe(projectName, formData);
  const landingHtml = generateLandingPage(projectName, formData);

  return {
    linkedin_captions: linkedinCaptions,
    readme_md: readmeMd,
    landing_html: landingHtml
  };
};

const generateLinkedInCaptions = (projectName, tone, tags, variations) => {
  const captions = [];
  
  const toneStyles = {
    classy: {
      opener: "Delighted to present",
      style: "elegant and sophisticated",
      cta: "I'd love to hear your thoughts"
    },
    professional: {
      opener: "Excited to share",
      style: "professional and polished",
      cta: "Looking forward to your feedback"
    },
    savage: {
      opener: "Just dropped",
      style: "bold and confident",
      cta: "What do you think? 🔥"
    },
    funny: {
      opener: "So I built this thing",
      style: "casual and humorous",
      cta: "Don't judge me too harshly 😅"
    }
  };

  const currentTone = toneStyles[tone] || toneStyles.professional;
  
  for (let i = 0; i < variations; i++) {
    const hashtags = tags.map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ');
    
    const caption = `${currentTone.opener} ${projectName}! 🚀

✨ Built with modern web technologies
🎯 Focused on user experience and performance  
💡 Implements best practices and clean architecture
🔧 Features responsive design and smooth interactions
${i === 1 ? '🌟 Open source and ready for contributions' : ''}

${currentTone.cta}!

${hashtags} #coding #webdevelopment #opensource`;

    captions.push(caption);
  }
  
  return captions;
};

const generateReadMe = (projectName, formData) => {
  const techStack = formData.autoDetectTech 
    ? ['React', 'JavaScript', 'CSS3', 'HTML5', 'Node.js']
    : ['Web Technologies'];
    
  const demoSection = formData.demoUrl 
    ? `## 🌐 Live Demo

[View Live Demo](${formData.demoUrl})

` : '';

  return `# ${projectName}

${formData.projectDescription || 'A modern web application built with cutting-edge technologies.'}

${demoSection}## ✨ Features

- 🚀 Fast and responsive user interface
- 💡 Intuitive user experience design
- 🔧 Modern development practices
- 📱 Mobile-first responsive design
- ⚡ Optimized performance
- 🛡️ Secure and reliable

## 🛠️ Tech Stack

${techStack.map(tech => `- ${tech}`).join('\n')}

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone ${formData.repoUrl || 'https://github.com/username/repo'}
cd ${projectName.toLowerCase().replace(/\s+/g, '-')}
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Start the development server
\`\`\`bash
npm start
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📝 Usage

1. Navigate to the application
2. Explore the features and functionality
3. Customize as needed for your use case

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

Built with ❤️ by a passionate developer

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by the amazing open source community
- Built with modern web technologies`;
};

const generateLandingPage = (projectName, formData) => {
  const demoLink = formData.demoUrl || '#';
  const repoLink = formData.repoUrl || '#';
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName} - Modern Web Application</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            line-height: 1.6;
            color: #334155;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }
        
        header {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            padding: 1rem 0;
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
            border-bottom: 1px solid #e2e8f0;
        }
        
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-size: 1.5rem;
            font-weight: bold;
            color: #059669;
        }
        
        .nav-links {
            display: flex;
            gap: 2rem;
            list-style: none;
        }
        
        .nav-links a {
            text-decoration: none;
            color: #64748b;
            font-weight: 500;
            transition: color 0.3s;
        }
        
        .nav-links a:hover {
            color: #059669;
        }
        
        .hero {
            padding: 8rem 0 4rem;
            text-align: center;
        }
        
        .hero h1 {
            font-size: 3.5rem;
            font-weight: 800;
            margin-bottom: 1.5rem;
            background: linear-gradient(135deg, #059669 0%, #0d9488 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .hero p {
            font-size: 1.25rem;
            color: #64748b;
            margin-bottom: 2rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .cta-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 2rem;
        }
        
        .btn {
            padding: 0.75rem 2rem;
            border-radius: 0.5rem;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s;
            border: none;
            cursor: pointer;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #059669 0%, #0d9488 100%);
            color: white;
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(5, 150, 105, 0.3);
        }
        
        .btn-secondary {
            background: white;
            color: #059669;
            border: 2px solid #059669;
        }
        
        .btn-secondary:hover {
            background: #059669;
            color: white;
        }
        
        .features {
            padding: 4rem 0;
            background: white;
        }
        
        .features h2 {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 3rem;
            color: #1e293b;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        
        .feature-card {
            padding: 2rem;
            border-radius: 1rem;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            transition: transform 0.3s;
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
        }
        
        .feature-icon {
            width: 3rem;
            height: 3rem;
            background: linear-gradient(135deg, #059669 0%, #0d9488 100%);
            border-radius: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
            color: white;
            font-size: 1.5rem;
        }
        
        .feature-card h3 {
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
            color: #1e293b;
        }
        
        .demo-section {
            padding: 4rem 0;
            text-align: center;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }
        
        .demo-section h2 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: #1e293b;
        }
        
        .demo-preview {
            max-width: 800px;
            margin: 2rem auto;
            background: white;
            border-radius: 1rem;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        .demo-preview img {
            width: 100%;
            height: auto;
        }
        
        footer {
            background: #1e293b;
            color: white;
            padding: 2rem 0;
            text-align: center;
        }
        
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2.5rem;
            }
            
            .cta-buttons {
                flex-direction: column;
                align-items: center;
            }
            
            .nav-links {
                display: none;
            }
        }
    </style>
</head>
<body>
    <header>
        <nav class="container">
            <div class="logo">${projectName}</div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#demo">Demo</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section class="hero" id="home">
            <div class="container">
                <h1>${projectName}</h1>
                <p>${formData.projectDescription || 'A modern web application built with cutting-edge technologies to deliver exceptional user experiences.'}</p>
                <div class="cta-buttons">
                    <a href="${demoLink}" class="btn btn-primary">View Live Demo</a>
                    <a href="${repoLink}" class="btn btn-secondary">View Source Code</a>
                </div>
            </div>
        </section>

        <section class="features" id="features">
            <div class="container">
                <h2>Key Features</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">⚡</div>
                        <h3>Lightning Fast</h3>
                        <p>Optimized performance with modern build tools and best practices for blazing fast load times.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">📱</div>
                        <h3>Responsive Design</h3>
                        <p>Beautiful, mobile-first design that works perfectly on all devices and screen sizes.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🛡️</div>
                        <h3>Secure & Reliable</h3>
                        <p>Built with security best practices and robust error handling for reliable operation.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="demo-section" id="demo">
            <div class="container">
                <h2>See It In Action</h2>
                <p>Experience the power and elegance of ${projectName}</p>
                <div class="demo-preview">
                    <div style="padding: 2rem; text-align: center; color: #64748b;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">🚀</div>
                        <h3>Demo Preview</h3>
                        <p>Your application demo would appear here</p>
                    </div>
                </div>
                <div class="cta-buttons">
                    <a href="${demoLink}" class="btn btn-primary">Try It Now</a>
                </div>
            </div>
        </section>
    </main>

    <footer id="contact">
        <div class="container">
            <p>&copy; 2024 ${projectName}. Built with ❤️ using modern web technologies.</p>
        </div>
    </footer>
</body>
</html>`;
};