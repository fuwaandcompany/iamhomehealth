# IAM Home Health Services Website

A modern, responsive website for IAM Home Health Services, LLC built with Next.js and Tailwind CSS.

## Features

- 🎨 Modern, responsive design
- ⚡ Fast performance with Next.js
- 📱 Mobile-first approach
- 🔍 SEO optimized
- 📝 Contact form with Netlify integration
- 🚀 Easy deployment to Netlify

## Getting Started

1. Clone the repository:
```bash
git clone [your-repo-url]
cd iamhomehealth
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploying to Netlify

1. Push your code to GitHub/GitLab
2. Log in to [Netlify](https://app.netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy site"

### SSL Certificate

Netlify automatically provisions SSL certificates for your domain. To set up a custom domain:

1. Go to Site settings > Domain management
2. Add your custom domain
3. Follow the DNS configuration instructions
4. Netlify will automatically provision an SSL certificate

## Customization

### Updating Content

- Edit `src/app/page.tsx` to modify the main content
- Update metadata in `src/app/layout.tsx`
- Modify services in the `services` array in `page.tsx`

### Styling

- The site uses Tailwind CSS for styling
- Colors can be customized in `tailwind.config.js`
- Global styles can be modified in `src/app/globals.css`

## Performance

The site is optimized for performance with:
- Next.js image optimization
- Automatic code splitting
- Server-side rendering
- Static site generation where possible

## License

MIT License - feel free to use this template for your own projects.
