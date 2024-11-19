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

### Testing
- Jest
- Supertest
- TypeScript Jest

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
│   │   │   ├── __tests__/      # Test files
│   │   │   │   ├── user.test.ts
│   │   │   │   └── workout.test.ts
│   │   │   ├── config/
│   │   │   │   └── prisma.ts
│   │   │   ├── controllers/
│   │   │   ├── middleware/
│   │   │   │   ├── auth.ts
│   │   │   │   └── validate.ts
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   │   ├── user.ts
│   │   │   │   ├── workout.ts
│   │   │   │   ├── profile.ts
│   │   │   │   └── exerciseTemplate.ts
│   │   │   ├── types/
│   │   │   │   ├── models.ts
│   │   │   │   └── express.d.ts
│   │   │   ├── validators/
│   │   │   │   └── schemas.ts
│   │   │   ├── setupTests.ts
│   │   │   └── index.ts
│   │   ├── prisma/
│   │   │   ├── migrations/
│   │   │   └── schema.prisma
│   │   ├── jest.config.mjs
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
  exerciseTemplates ExerciseTemplate[]
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

model ExerciseTemplate {
  id            String    @id @default(cuid())
  name          String
  category      String
  description   String?
  defaultSets   Int?
  defaultReps   Int?
  defaultWeight Float?
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
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

### Phase 3: Server Development ✅
- Basic Express server setup
- Environment configuration
- TypeScript types defined
- Prisma client configuration
- Authentication middleware
- Route implementation (users, workouts, profiles)
- Exercise templates
- Input validation with Zod

### Phase 4: Testing Setup 🚧
- Jest configuration
- Test environment setup
- User routes tests
- Workout routes tests
- Profile routes tests pending
- Exercise template tests pending

### Pending Phases
- API documentation
- Frontend setup
- Mobile app development
- Deployment configuration
- CI/CD setup

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

### Server Package Setup
```bash
cd packages/server

# Install dependencies
npm install express cors jsonwebtoken bcrypt @prisma/client
npm install -D @types/express @types/cors @types/jsonwebtoken @types/bcrypt typescript ts-node

# Install testing dependencies
npm install --save-dev jest @types/jest ts-jest supertest @types/supertest @babel/core @babel/preset-env @babel/preset-typescript
```

### Environment Variables
Server (.env):
```
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fit_trackr"
JWT_SECRET="your-secret-key-change-this-in-production"
```

## Testing Setup
- Jest configuration in jest.config.mjs
- Test files in src/__tests__/
- Setup file in src/setupTests.ts
- Run tests with `npm run test`

## Git Workflow & Commits
Example of structured commits:
```bash
git checkout -b feature/server-setup
git add .
git commit -m "feat: implement basic server setup with auth

- Add Express server configuration
- Implement JWT authentication
- Create user routes for registration/login
- Add workout routes with CRUD operations
- Set up TypeScript configuration"
git push origin feature/server-setup
```

## Documentation Strategy
- README updates for major changes
- Twitter updates for development progress
- Code comments for complex logic
- Type definitions for data structures
- API documentation (pending)

## Next Steps
1. Complete testing setup
   - Fix any remaining test configuration issues
   - Add more test cases
   - Add test coverage reporting

2. API Documentation
   - Set up Swagger/OpenAPI
   - Document all endpoints
   - Add response examples

3. Error Handling
   - Implement global error handler
   - Add custom error classes
   - Improve error responses

4. Frontend Development
   - Set up React application
   - Configure TypeScript
   - Implement basic UI components

5. Security Enhancements
   - Rate limiting
   - Request validation
   - Security headers
   - CORS configuration

## Contributing Guidelines
1. Create feature branches from main
2. Follow conventional commits
3. Include tests for new features
4. Update documentation
5. Create detailed pull requests

## Useful Commands
```bash
# Database
docker compose up -d              # Start database
npx prisma migrate dev           # Run migrations
npx prisma generate              # Generate Prisma client

# Development
npm run dev                      # Start development server
npm run build                    # Build project
npm run test                     # Run tests
npm run test:watch              # Run tests in watch mode

# TypeScript
npm run type-check              # Check types
npm run lint                    # Run linter
```
