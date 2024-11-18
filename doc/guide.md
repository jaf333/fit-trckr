# FitTrackr Project Documentation

## Initial Requirements
- Create a web app (and potentially mobile) based on wger for gym routine management
- Document and tweet about the development process
- Follow professional development practices
- Include git workflow with proper commits
- Share progress through Twitter

## Technology Stack Selection
### Frontend
- React (web)
- React Native (mobile, planned)
- TypeScript
- Tailwind CSS
- Redux Toolkit

### Backend
- Node.js with Express
- PostgreSQL (via Docker)
- Prisma as ORM
- JWT for authentication

### Infrastructure
- Docker for containerization
- GitHub Actions for CI/CD (planned)
- Vercel/Netlify for web deployment (planned)

## Project Structure
```
fit-trackr/
├── packages/
│   ├── web/          # React web application
│   │   └── [Pending setup]
│   ├── mobile/       # React Native mobile app (planned)
│   │   └── [Pending setup]
│   ├── server/       # Node.js backend
│   │   ├── src/
│   │   │   ├── config/
│   │   │   │   └── prisma.ts
│   │   │   ├── controllers/
│   │   │   ├── middleware/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── types/
│   │   │   │   └── models.ts
│   │   │   └── index.ts
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   ├── .env
│   │   ├── .env.example
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── shared/       # Shared types and utilities
│       ├── src/
│       ├── package.json
│       └── tsconfig.json
├── docker-compose.yml
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

## Database Schema (Prisma)
```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  password      String
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  workouts      Workout[]
  profile       Profile?
}

model Profile {
  id           String    @id @default(cuid())
  userId       String    @unique
  user         User      @relation(fields: [userId], references: [id])
  height       Float?
  weight       Float?
  goalWeight   Float?
  birthDate    DateTime?
  gender       String?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}

model Workout {
  id          String        @id @default(cuid())
  name        String
  date        DateTime
  userId      String
  user        User          @relation(fields: [userId], references: [id])
  exercises   Exercise[]
  notes       String?
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

model Exercise {
  id          String    @id @default(cuid())
  name        String
  sets        Int
  reps        Int
  weight      Float?
  workoutId   String
  workout     Workout   @relation(fields: [workoutId], references: [id])
  notes       String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

## Development Progress

### Phase 1: Initial Setup ✅
- Created monorepo structure
- Set up TypeScript configuration
- Initialized server package
- Created basic project documentation

### Phase 2: Database Setup ✅
- Added Prisma schema
- Configured Docker for PostgreSQL
- Created database models
- Set up development environment

### Phase 3: Server Development 🚧
- Basic Express server setup
- Environment configuration
- TypeScript types defined
- Prisma client configuration

### Pending Phases
- Authentication implementation
- API routes development
- Frontend setup
- Mobile app development
- Deployment configuration

## Environment Setup Instructions

### Prerequisites
- Node.js
- Docker Desktop
- WSL2 (for Windows users)

### Initial Setup
```bash
# Clone repository
git clone [repository-url]
cd fit-trackr

# Install dependencies
npm install

# Start database
docker compose up -d

# Start development server
npm run dev:server
```

### Environment Variables
Server (.env):
```
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fit_trackr"
JWT_SECRET="your-secret-key-change-this-in-production"
```

## Git Workflow
- Feature branches for new functionality
- Descriptive commit messages following conventional commits
- Regular updates with development progress tweets
- Main branch protection (planned)

## Documentation Strategy
- README updates for major changes
- Twitter updates for development progress
- Code comments for complex logic
- Type definitions for data structures