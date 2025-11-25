# Frontend Structure

## Folder Organization

```
resources/js/
├── pages/              # Page components (Routes)
│   ├── Login/         # Login page
│   ├── Register/      # Register page
│   ├── Home/          # Home/Dashboard page
│   ├── LocationDetail/# Location detail page
│   └── DetailAsset/   # Asset detail page
│
├── components/         # Reusable UI components
│   ├── Button/        # Button component ✅
│   ├── Card/          # Card component ✅
│   ├── Modal/         # Modal component ✅
│   ├── Input/         # Input field component ✅
│   └── Badge/         # Badge/Tag component ✅
│
├── layouts/            # Layout wrappers
│   └── (future: MainLayout, AuthLayout, etc.)
│
├── App.jsx            # Main App component with routing
├── main.jsx           # Application entry point
└── App.css            # Global styles
```

## Guidelines

### Pages (`pages/`)
- Contains full page components that represent routes
- Each page has its own folder with component file and styles
- Examples: Login, Register, Home, DetailAsset

### Components (`components/`)
- Contains reusable UI components (atoms/molecules)
- Should be generic and reusable across different pages
- Examples: Button, Card, Modal, Input, Badge

### Layouts (`layouts/`)
- Contains layout wrapper components
- Used to wrap pages with common structure (header, footer, sidebar)
- Examples: MainLayout, AuthLayout, DashboardLayout

## Available Components

### Button
```jsx
import { Button } from '@/components'

<Button variant="primary" size="medium" onClick={handleClick}>
  Click Me
</Button>

// Variants: primary, secondary, danger, success, outline, ghost
// Sizes: small, medium, large
// Props: fullWidth, disabled, icon, iconPosition
```

### Card
```jsx
import { Card } from '@/components'

<Card variant="elevated" padding="medium" hoverable>
  <h3>Card Title</h3>
  <p>Card content...</p>
</Card>

// Variants: default, elevated, outlined, flat
// Padding: none, small, medium, large
// Props: header, footer, hoverable, clickable, onClick
```

### Modal
```jsx
import { Modal } from '@/components'

<Modal 
  isOpen={isOpen} 
  onClose={handleClose}
  title="Modal Title"
  size="medium"
>
  <p>Modal content...</p>
</Modal>

// Sizes: small, medium, large, fullscreen
// Props: closeOnOverlay, showCloseButton, header, footer
```

### Input
```jsx
import { Input } from '@/components'

<Input
  type="text"
  label="Username"
  placeholder="Enter username"
  value={value}
  onChange={handleChange}
  error={errorMessage}
  required
/>

// Types: text, email, password, number, etc.
// Sizes: small, medium, large
// Props: leftIcon, rightIcon, disabled, fullWidth, helperText
```

### Badge
```jsx
import { Badge } from '@/components'

<Badge variant="success" size="medium" dot>
  Active
</Badge>

// Variants: primary, secondary, success, danger, warning, info, gray
// Sizes: small, medium, large
// Props: dot, icon
```

## Import Examples

```jsx
// Importing pages
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'

// Importing components (individual)
import Button from './components/Button/Button'
import Card from './components/Card/Card'

// Importing components (from index)
import { Button, Card, Modal, Input, Badge } from './components'
```

## Component Structure

Each component follows this structure:
```
ComponentName/
├── ComponentName.jsx    # Component logic
└── ComponentName.css    # Component styles
```

## Best Practices

1. **Keep components pure and reusable**
   - Avoid business logic in UI components
   - Accept props for customization
   - Use semantic HTML

2. **Follow naming conventions**
   - PascalCase for component names
   - camelCase for props and functions
   - kebab-case for CSS classes

3. **Props documentation**
   - Document all props with JSDoc comments
   - Specify prop types and default values
   - Provide usage examples

4. **Accessibility**
   - Use semantic HTML elements
   - Add ARIA labels where needed
   - Support keyboard navigation

5. **Performance**
   - Avoid unnecessary re-renders
   - Use React.memo for expensive components
   - Lazy load heavy components

