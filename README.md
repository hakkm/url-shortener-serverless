# URLShort - Modern URL Shortener

A beautiful, responsive URL shortener built with Vite, Vanilla JavaScript, and Tailwind CSS. Features a clean, modern interface with dark mode support and comprehensive URL management capabilities.

![URLShort Preview](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&crop=entropy&auto=format&q=80)

## ✨ Features

### 🔗 URL Shortening
- **Shorten URLs**: Convert long URLs into clean, shareable short links
- **QR Code Generation**: Automatic QR code creation for each shortened URL
- **Copy to Clipboard**: One-click copying with visual feedback
- **Expiration Notice**: URLs expire after 30 days of inactivity

### 🔍 URL Management
- **Unshorten URLs**: Reveal the original URL from any shortened link
- **URL Statistics**: Track click counts and last access times
- **Local Storage**: Demo data persistence using browser storage

### 🎨 User Experience
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Dark Mode**: Toggle between light and dark themes with system preference detection
- **Smooth Animations**: Polished transitions and micro-interactions
- **Accessibility**: WCAG compliant with proper focus management
- **Loading States**: Visual feedback during API operations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd urlshort
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
urlshort/
├── src/
│   ├── main.js           # Application entry point
│   ├── shorten.js        # URL shortening functionality
│   ├── unshorten.js      # URL unshortening functionality
│   ├── stats.js          # Statistics tracking
│   ├── theme-toggle.js   # Dark/light mode toggle
│   └── style.css         # Custom Tailwind styles
├── index.html            # Main HTML template
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── buildspec.yml         # AWS CodeBuild specification
└── package.json          # Project dependencies
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Architecture

### Modular JavaScript Structure
The application follows a modular architecture with separate modules for each feature:

- **main.js**: Initializes all modules and provides global utilities
- **shorten.js**: Handles URL shortening logic and UI interactions
- **unshorten.js**: Manages URL expansion functionality
- **stats.js**: Tracks and displays URL statistics
- **theme-toggle.js**: Manages dark/light mode switching

### State Management
- Uses localStorage for demo data persistence
- Implements proper error handling and loading states
- Provides visual feedback for all user interactions

### Styling Approach
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Components**: Reusable card-based layout
- **Responsive Design**: Mobile-first with breakpoint optimization
- **Dark Mode**: Class-based theme switching

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3b82f6) - Main actions and links
- **Secondary**: Teal (#14b8a6) - Secondary actions
- **Success**: Green (#22c55e) - Success states and stats
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Headings**: Bold, clear hierarchy
- **Body Text**: Optimized for readability
- **Monospace**: Used for URLs and technical content

### Components
- **Cards**: Elevated containers with subtle shadows
- **Buttons**: Consistent styling with hover effects
- **Forms**: Clean inputs with focus states
- **Notifications**: Toast-style feedback messages

## 🚀 Deployment

### AWS S3 + CloudFront
The project includes a `buildspec.yml` for AWS CodeBuild deployment:

```bash
# Build the project
npm run build

# Deploy to S3 bucket
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### Other Platforms
- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Use GitHub Actions for automated deployment

## 🔧 Configuration

### Environment Variables
For production deployment, you may want to configure:

```env
VITE_API_BASE_URL=https://api.yourservice.com
VITE_APP_NAME=URLShort
```

### Customization
- **Colors**: Modify `tailwind.config.js` for custom color schemes
- **Fonts**: Update font families in Tailwind configuration
- **API Endpoints**: Replace mock functions with real API calls

## 🧪 Testing

The application includes comprehensive error handling and validation:

- URL format validation
- Network error handling
- Loading state management
- Clipboard API fallbacks

## 📱 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Features**: CSS Grid, Flexbox, CSS Custom Properties, Clipboard API

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Add comments for complex logic
- Test on multiple devices and browsers
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide** - For the beautiful icon set
- **Vite** - For the fast build tool
- **QR Server API** - For QR code generation

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include browser version and steps to reproduce

---

**Built with ❤️ using modern web technologies**
