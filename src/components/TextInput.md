# TextInput Component

The `TextInput` component is a reusable form input that provides consistent styling and behavior across the application.

## Usage

```tsx
import { TextInput } from "@/components/TextInput";

// Basic usage
<TextInput
  label="Username"
  placeholder="Enter your username"
  onChange={(e) => setUsername(e.target.value)}
  value={username}
/>

// With validation error
<TextInput
  label="Email"
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={!isValidEmail(email) ? "Please enter a valid email address" : undefined}
  required
/>

// Disabled state
<TextInput
  label="User ID"
  value={userId}
  disabled
  helperText="User ID cannot be changed"
/>
```

## Props

The `TextInput` component accepts all standard HTML input attributes along with the following additional props:

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Label text displayed above the input |
| `error` | `string` | Error message to display below the input when validation fails |
| `helperText` | `string` | Helper text to display below the input (not shown when error is present) |
| `isLoading` | `boolean` | Whether the input is in a loading state (disables the input) |

## Styling

The TextInput component respects your app's design system with:
- Consistent spacing and border radius
- Focus states
- Error states with red border and text
- Disabled styling

## Accessibility

The component is built with accessibility in mind:
- Labels are properly associated with inputs
- Required fields are marked with an asterisk
- Error messages are semantically connected to inputs