# Write Right - Language Learning Platform

Write Right is a modern web application designed to help users practice and learn foreign languages through interactive sentence practice and spaced repetition learning.

## 🌟 Features

### Core Functionality
- **Interactive Sentence Practice**: Practice languages through contextual sentence examples
- **Spaced Repetition System**: Built-in algorithm to optimize learning retention using card-based reviews
- **Multi-language Support**: Currently supports Danish, English, Spanish, Portuguese, and Italian
- **AI-Powered Content Generation**: Uses Anthropic's Claude AI to generate personalized learning content
- **User Authentication**: Secure Google OAuth integration
- **Progress Tracking**: Monitor your learning progress with detailed analytics

### Learning Experience
- **Personalized Onboarding**: Select your native language and target learning language
- **Dynamic Card Generation**: AI creates contextual sentences based on various topics and difficulty levels
- **Word Definitions**: Each sentence includes detailed word breakdowns with definitions
- **Review System**: Rate your understanding to optimize future card scheduling
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **Radix UI** - Accessible component primitives

### Backend & Database
- **Prisma** - Database ORM and migrations
- **PostgreSQL** - Primary database
- **NextAuth.js** - Authentication system
- **TanStack Query** - Server state management

### AI & Analytics
- **Anthropic Claude** - AI-powered content generation
- **PostHog** - Product analytics and user tracking

### Development Tools
- **Vitest** - Unit testing framework
- **ESLint** - Code linting
- **Turbopack** - Fast development builds

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Google OAuth credentials
- Anthropic API key

### Environment Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd write-right
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your actual values
```
See `.env.example` for all required environment variables and their descriptions.

4. Set up the database:
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed the database
npx prisma db seed
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

```
write-right/
├── prisma/                 # Database schema and migrations
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── api/           # API routes
│   │   ├── dash/          # Dashboard page
│   │   ├── login/         # Authentication
│   │   ├── onboarding/    # User setup flow
│   │   ├── practice/      # Writing practice (WIP)
│   │   ├── sentence/      # Sentence review interface
│   │   └── profile/       # User profile management
│   ├── components/        # Reusable UI components
│   ├── features/          # Feature-specific components and logic
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries and API functions
│   ├── providers/         # React context providers
│   ├── prompts/           # AI prompt templates
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Helper functions
├── package.json
└── README.md
```

## 🎯 How It Works

1. **User Onboarding**: New users select their native language and target learning language
2. **Content Generation**: AI generates contextual sentences based on various topics, difficulty levels, and grammatical structures
3. **Practice Session**: Users review sentences, try to understand them, then see translations and word definitions
4. **Spaced Repetition**: The system schedules future reviews based on user performance using a spaced repetition algorithm
5. **Progress Tracking**: Users can monitor their learning progress and review statistics

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 🚢 Deployment

### Production Build
```bash
npm run build
npm start
```

### Database Migration
```bash
npx prisma migrate deploy
```

## 📝 Commit Message Template

This project uses a structured commit message format. To set it up:

```bash
git config commit.template .gitmessage
```

See `.gitmessage` for the complete template and guidelines.

## 📝 API Documentation

### Key Endpoints
- `POST /api/sentence` - Generate new practice sentences
- `GET /api/card/types/sentence/[userId]` - Fetch user's practice cards
- `POST /api/card/[cardId]/review` - Submit card review rating
- `PUT /api/user/[userId]/language-preference` - Update learning language
- `PUT /api/user/[userId]/native-language` - Update native language

## 🔒 Security Considerations

- Environment variables are used for all sensitive configuration
- Google OAuth provides secure authentication
- Database queries use Prisma's built-in protection against SQL injection
- API routes include proper error handling and validation

## 📊 Database Schema

The application uses several key models:
- **User**: User accounts and preferences
- **Sentence**: Generated learning content with translations
- **Card**: Spaced repetition cards linked to sentences
- **Word**: Individual word definitions within sentences
- **CardReviewLog**: User review history for spaced repetition algorithm

## 📄 License

This project is private and proprietary. All rights reserved.

---

Built with ❤️ using Next.js, AI, and modern web technologies.