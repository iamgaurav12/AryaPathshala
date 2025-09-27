# Arya Pathshala

An educational platform designed to provide comprehensive learning resources for Class 9 and Class 10 students following the CBSE curriculum.

## Features

- **Dark Mode Design**: Modern dark-themed interface optimized for extended study sessions
- **Multi-Class Support**: Dedicated sections for Class 9 and Class 10
- **Subject-wise Content**: Organized chapters by subjects (Mathematics, Science, Social Science, etc.)
- **Rich Learning Resources**:
  - Comprehensive study notes
  - Daily Practice Problems (DPP)
  - Video lectures
  - Board exam preparation materials
- **Progress Tracking**: Monitor completion rates and progress by subject
- **Admin Dashboard**: Easy content management for instructors
- **Student Portal**: Personalized access to learning materials

## Tech Stack

- **Frontend**: React.js with Vite
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Cloud Firestore
- **Hosting**: Vercel
- **State Management**: React Context

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/iamgaurav12/AryaPathshala.git
cd arya
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin dashboard components
│   ├── common/         # Shared components
│   ├── courses/        # Course-related components
│   ├── home/          # Landing page components
│   └── students/      # Student portal components
├── context/           # React context providers
├── data/             # Static data and content
├── firebase/         # Firebase configuration
├── hooks/            # Custom React hooks
├── pages/            # Main route components
└── utils/            # Helper functions and utilities
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Deployment

The application is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel, and it will automatically deploy on every push to the main branch.

## Environment Variables

For local development, create a `.env` file with the following variables:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build locally
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons by [Lucide Icons](https://lucide.dev/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
- Built with [Vite](https://vitejs.dev/)
