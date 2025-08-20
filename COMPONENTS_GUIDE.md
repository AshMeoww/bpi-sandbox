# Components Guide

## 📁 Component Structure

```
src/components/
├── ui/                     # Basic UI components
│   ├── Button.tsx          # Reusable button with variants
│   └── Card.tsx            # White rounded card container
├── shared/                 # Shared across kid/parent
│   ├── BottomNavigation.tsx # Mobile bottom nav bar
│   └── Header.tsx          # Page header with logo/title
├── kid/                    # Kid-specific components
│   ├── TaskCard.tsx        # Task display with complete button
│   ├── BalanceCard.tsx     # Balance display card
│   └── LevelCard.tsx       # Level/XP progress card
└── parent/                 # Parent-specific components
    └── TaskAssignment.tsx  # Task creation form
```

## 🎨 UI Components

### Button
```tsx
<Button 
  variant="primary|secondary|success|danger" 
  size="sm|md|lg"
  onClick={handleClick}
>
  Click Me
</Button>
```

### Card
```tsx
<Card padding="sm|md|lg" className="custom-class">
  Content here
</Card>
```

## 🔄 Shared Components

### BottomNavigation
```tsx
<BottomNavigation
  items={[
    { href: "/path", icon: "name", label: "Home", isActive: true },
    { href: "/path", icon: "name", label: "Profile", isRounded: true }
  ]}
/>
```

### Header
```tsx
<Header
  title="Page Title"
  subtitle="Optional subtitle"
  logoHref="/custom-link"
  actionButton={{ href: "/link", label: "Button" }}
/>
```

## 👶 Kid Components

### TaskCard
```tsx
<TaskCard
  title="Clean Room"
  reward={25}
  badge="Helper"
  isNew={true}
  onComplete={() => handleComplete()}
/>
```

### BalanceCard
```tsx
<BalanceCard balance={125.50} title="My Balance" />
```

### LevelCard
```tsx
<LevelCard level={3} xp={250} xpToNext={300} />
```

## 👨‍👩‍👧‍👦 Parent Components

### TaskAssignment
```tsx
<TaskAssignment
  onCreateTask={(title, reward, badge) => handleCreate(title, reward, badge)}
/>
```

## 🔧 How to Use

1. **Import components**: `import Button from "../../components/ui/Button"`
2. **Replace repetitive code**: Use components instead of duplicated JSX
3. **Customize with props**: Pass data and handlers as props
4. **Maintain consistency**: All buttons/cards look the same across app

## ✅ Benefits

- **Easy to edit**: Change button style in one file, updates everywhere
- **Consistent design**: Same look and feel across all pages
- **Reusable code**: Write once, use many times
- **Type safety**: TypeScript props prevent errors
- **Maintainable**: Clear separation of concerns

## 📝 Example Usage

Before (repetitive):
```tsx
<div className="bg-white rounded-2xl shadow-xl p-4">
  <div className="text-xs font-bold text-gray-600 mb-1">My Balance</div>
  <div className="text-2xl font-black text-green-600">₱{balance}</div>
</div>
```

After (component):
```tsx
<BalanceCard balance={balance} />
```