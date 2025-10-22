# Spinner Component Usage Guide

The Spinner component provides flexible loading indicators using the SNQ mobile logo for brand consistency.

## Basic Usage

### 1. Simple Spinner
```tsx
import Spinner from '@/components/spinner'

<Spinner />
```

### 2. Different Sizes
```tsx
<Spinner size="sm" />  // Small (32px)
<Spinner size="md" />  // Medium (64px) - default
<Spinner size="lg" />  // Large (96px)
<Spinner size="xl" />  // Extra Large (128px)
```

### 3. Full Screen Spinner
```tsx
<Spinner fullScreen />
// Creates a full-screen overlay with the spinner centered
```

## Advanced Components

### PageLoader
Use for full page loading states:
```tsx
import { PageLoader } from '@/components/spinner'

if (loading) {
  return <PageLoader />
}
```

### LoadingOverlay
Wrap content with a loading overlay:
```tsx
import { LoadingOverlay } from '@/components/spinner'

<LoadingOverlay isLoading={isLoading} size="lg">
  <div>
    {/* Your content here */}
  </div>
</LoadingOverlay>
```

## Real World Examples

### In a Form Submit
```tsx
const [isSubmitting, setIsSubmitting] = useState(false)

<button disabled={isSubmitting}>
  {isSubmitting ? (
    <span className="flex items-center gap-2">
      <Spinner size="sm" />
      Submitting...
    </span>
  ) : (
    'Submit'
  )}
</button>
```

### In a Card
```tsx
<div className="relative min-h-[200px]">
  <LoadingOverlay isLoading={isLoading}>
    <CardContent />
  </LoadingOverlay>
</div>
```

### In API Calls
```tsx
const [data, setData] = useState(null)
const [loading, setLoading] = useState(true)

useEffect(() => {
  fetchData()
    .then(setData)
    .finally(() => setLoading(false))
}, [])

if (loading) return <PageLoader />
```

## Accessibility
All spinner components include:
- `role="status"` for screen readers
- `aria-label="Loading"` for context
- Hidden "Loading..." text for screen reader users
