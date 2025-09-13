# 🧲 Skill Magnet

**Discover and showcase your skills like never before!**

Skill Magnet is a modern, dynamic portfolio platform that allows professionals to create compelling profiles, showcase their projects, and connect with industry peers. Built with cutting-edge technologies, it offers a seamless experience for both skill demonstration and discovery.

## 🌐 Live Demo

**[Visit Skill Magnet →](https://skill-magnet-pearl.vercel.app/)**

## ✨ Features

- **🔐 Secure Authentication** - NextAuth integration with multiple providers
- **👤 Dynamic Profiles** - Create and customize your professional profile
- **🚀 Project Showcase** - Display your projects with images and descriptions  
- **💼 Skills Management** - Tag and organize your technical skills
- **🌓 Dark/Light Theme** - Toggle between themes for optimal viewing
- **📱 Responsive Design** - Optimized for all devices
- **🔍 Explore Profiles** - Discover other professionals and their work
- **⚡ Fast Performance** - Built with Next.js 14 for optimal speed

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **File Upload**: Cloudinary integration
- **UI Components**: Radix UI, Lucide React
- **State Management**: TanStack Query
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MongoDB database
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dipesh1203/Skill_Magnet.git
   cd Skill_Magnet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXTAUTH_SECRET=your_secret_key
   NEXTAUTH_URL=http://localhost:3000
   MONGODB_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

1. **Sign Up/Sign In** - Create your account or sign in with existing credentials
2. **Create Profile** - Add your personal information, skills, and bio
3. **Add Projects** - Showcase your work with descriptions and images
4. **Explore** - Discover other professionals and their portfolios
5. **Connect** - Network with industry peers and potential collaborators

## 🏗️ Project Structure

```
Skill_Magnet/
├── app/                    # Next.js 14 app directory
│   ├── (ClientView)/      # Client-side pages
│   ├── (dash)/            # Dashboard pages
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
├── lib/                   # Utility functions
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Ensure responsive design
- Add proper error handling
- Write meaningful commit messages

## 📄 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🔧 Configuration

The project uses several configuration files:

- `next.config.mjs` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration  
- `tsconfig.json` - TypeScript configuration
- `components.json` - UI components configuration

## 📚 API Routes

- `/api/auth/*` - Authentication endpoints
- `/api/profile/*` - Profile management
- `/api/projects/*` - Project management
- `/api/upload/*` - File upload handling

## 🎨 UI Components

The project uses a custom component library built on top of Radix UI:

- Buttons, Cards, Modals
- Form components
- Navigation elements
- Loading skeletons
- Toast notifications

## 🌟 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [Radix UI](https://www.radix-ui.com/) - For accessible components
- [Vercel](https://vercel.com/) - For deployment platform

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/Dipesh1203/Skill_Magnet/issues) page
2. Create a new issue if needed
3. Join our community discussions

## 📈 Roadmap

- [ ] Advanced search and filtering
- [ ] Real-time messaging system
- [ ] Skill endorsements
- [ ] Project collaboration features
- [ ] Analytics dashboard
- [ ] Mobile app development

---

**Built with ❤️ by [Dipesh1203](https://github.com/Dipesh1203)**

⭐ Star this repository if you find it helpful!
