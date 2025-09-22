# 🚀 Showcase.ai

**Transform your projects into professional showcases with AI-powered content generation.**

![Showcase.ai](https://img.shields.io/badge/Showcase.ai-AI%20Powered-blueviolet)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)

## ✨ Features

- 🎯 **LinkedIn Post Generator** - Create engaging, professional LinkedIn posts
- 📝 **README Generator** - Generate polished GitHub README files
- 🌐 **Landing Page Creator** - Build beautiful single-file landing pages
- 🎨 **Multiple Tone Options** - Classy, Professional, Savage, or Funny
- 🔄 **Multiple Variations** - Generate 1-3 different versions
- 📋 **One-Click Copy** - Instant clipboard copying
- ⬇️ **File Downloads** - Direct file downloads
- 👀 **Live Preview** - Iframe preview for landing pages
- 🚀 **Vercel Ready** - Optimized for seamless deployment

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS + Shadcn/ui Components
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)
- **Deployment**: Vercel-optimized build
- **Animation**: CSS transitions + Tailwind animations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Yarn or npm

### Installation

1. **Clone & Install**
   ```bash
   git clone <repository-url>
   cd showcase-ai
   yarn install
   ```

2. **Development**
   ```bash
   yarn dev
   ```

3. **Build for Production**
   ```bash
   yarn build
   ```

4. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Shadcn/ui components
│   └── ShowcaseApp.jsx     # Main application component
├── services/
│   └── mockData.js         # Mock data generation
├── hooks/
│   └── use-toast.js        # Toast notifications
├── App.jsx                 # App wrapper
├── main.jsx               # Entry point
└── index.css              # Global styles
```

## 🎨 Design Features

- **Modern Gradient Backgrounds** - Subtle animated gradients
- **Glass Morphism Effects** - Backdrop blur and transparency
- **Micro Animations** - Smooth hover states and transitions
- **Progress Indicators** - Visual step-by-step guidance
- **Responsive Layout** - Mobile-first design approach
- **Professional Typography** - Inter font with proper hierarchy

## 🔧 Customization

### Adding New Tones
Edit `src/services/mockData.js` to add new tone options:

```javascript
const toneStyles = {
  yourTone: {
    opener: "Your opener",
    style: "your style description",
    cta: "Your call to action"
  }
}
```

### Styling
- Colors: Modify Tailwind config in `tailwind.config.js`
- Components: Update Shadcn components in `src/components/ui/`
- Global styles: Edit `src/index.css`

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Import project to Vercel
   - Auto-detected as Vite project

2. **Environment Variables**
   ```
   VITE_APP_TITLE=Showcase.ai
   VITE_APP_DESCRIPTION=Transform your projects into professional showcases
   ```

3. **Build Settings**
   - Build Command: `yarn build`
   - Output Directory: `dist`
   - Install Command: `yarn install`

### Other Platforms
- **Netlify**: Works out of the box
- **GitHub Pages**: Add `base: '/repository-name/'` to `vite.config.js`
- **Traditional Hosting**: Upload `dist/` folder contents

## 📝 Future Enhancements

- [ ] Real AI integration (OpenAI/Claude API)
- [ ] GitHub API integration for automatic repo analysis
- [ ] User authentication and saved projects
- [ ] More output formats (Twitter threads, Medium articles)
- [ ] Template customization
- [ ] Analytics and usage tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Built with ❤️ using Showcase.ai**
- **Powered by Outskill & Emergent**
- **UI Components by Shadcn/ui**
- **Icons by Lucide React**

---

**Made for developers, by developers. Transform your projects into showcases that get noticed.** ✨