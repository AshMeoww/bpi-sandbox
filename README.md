# BPI Sandbox - Financial Learning App

## Project Structure

```
src/
├── app/
│   ├── kid/                    # Kid-focused pages
│   │   ├── dashboard/          # Kid's main dashboard
│   │   ├── tasks/              # Task completion interface
│   │   ├── wishlist/           # Savings goals and wishlist
│   │   ├── profile/            # Kid's profile and activity summary
│   │   └── learn/              # Learning cards and financial education
│   ├── parent-app/             # Parent-focused pages
│   │   ├── page.tsx            # Parent dashboard
│   │   └── profile/            # Parent profile and reporting
│   ├── onboarding/             # Initial setup flow
│   ├── page.tsx                # Landing page
│   └── layout.tsx              # Root layout
├── lib/
│   └── taskStore.ts            # Shared task management store
└── components/                 # Reusable components (future)
```

## Development Guidelines

### Kid Interface (`/kid/*`)
- Mobile-first design with bottom navigation
- Gamified experience with badges and levels
- Real-time task updates from parents
- Educational content and interactive learning

### Parent Interface (`/parent-app/*`)
- Task assignment and monitoring
- Child activity oversight
- Spending limits and controls
- Progress reporting

### Shared Components
- `taskStore.ts` - Real-time task synchronization between parent and kid interfaces
- Uses localStorage for persistence and custom events for real-time updates

## Key Features
- **Dual Interface**: Separate optimized experiences for kids and parents
- **Real-time Task Delegation**: Parents assign tasks that instantly appear on kid's dashboard
- **Gamification**: Badge system, XP levels, and progress tracking
- **Financial Education**: Learning cards and interactive quizzes
- **Mobile-First**: Optimized for mobile devices with touch-friendly interfaces

## Routes
- `/` - Landing page
- `/kid/dashboard` - Kid's main interface
- `/kid/tasks` - Task completion
- `/kid/wishlist` - Savings goals
- `/kid/profile` - Activity summary
- `/parent-app` - Parent dashboard
- `/parent-app/profile` - Parent reporting