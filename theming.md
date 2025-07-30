# ShadCN Theming Standards

This document outlines the comprehensive theming standards for all components in this repository. Every component must follow these guidelines to ensure consistent theming through CSS custom properties.

## Core Principles

1. **Use CSS Custom Properties Only**: No `dark:` prefixes - all theming through CSS variables in `theme.css`
2. **Background/Foreground Convention**: Each color has a corresponding foreground color for text
3. **Consistent Radius System**: Use calculated radius variables for all border-radius
4. **Responsive Spacing**: Use section spacing classes for consistent layout
5. **Theme Variable Naming**: Follow ShadCN's `--color-*` naming convention

## Available Theme Variables

### Core Colors

- `--color-background`: Main page background
- `--color-foreground`: Main text color
- `--color-card`: Card backgrounds
- `--color-card-foreground`: Text on cards
- `--color-card-hover`: Card hover states

### Interactive Elements

- `--color-primary`: Primary buttons/actions
- `--color-primary-foreground`: Text on primary elements
- `--color-secondary`: Secondary buttons/actions
- `--color-secondary-foreground`: Text on secondary elements
- `--color-muted`: Muted backgrounds (subtle elements)
- `--color-muted-foreground`: Muted text
- `--color-accent`: Accent/highlight elements
- `--color-accent-foreground`: Text on accent elements

### Form Elements

- `--color-border`: Default borders
- `--color-input`: Input field borders
- `--color-ring`: Focus ring color

### Specialized

- `--color-destructive`: Delete/error actions
- `--color-popover`: Dropdown/modal backgrounds
- `--color-popover-foreground`: Text in popovers

### Sidebar (if needed)

- `--color-sidebar`: Sidebar background
- `--color-sidebar-foreground`: Sidebar text
- `--color-sidebar-primary`: Sidebar primary elements
- `--color-sidebar-accent`: Sidebar accents
- `--color-sidebar-border`: Sidebar borders

## Radius System

Use calculated radius variables for consistent rounded corners:

- `--radius-xs`: Extra small (1/4 base)
- `--radius-sm`: Small (1/2 base)
- `--radius-md`: Medium (2/3 base)
- `--radius`: Base radius (0.5rem)
- `--radius-lg`: Large (1.5x base)
- `--radius-xl`: Extra large (2x base)
- `--radius-2xl`: 2XL (3x base)
- `--radius-3xl`: 3XL (4x base)
- `--radius-4xl`: 4XL (5x base)

## Spacing Classes

Use predefined section spacing classes:

- `.section-px`: Horizontal padding
- `.section-py`: Vertical padding (large)
- `.section-py-sm`: Vertical padding (small)
- `.section-pt`, `.section-pb`: Top/bottom padding
- `.container-sm`, `.container-xs`: Container max-widths

## Component Theming Requirements

### 1. UI Components (Button, Card, etc.)

**Required theming support:**

- Background colors using `bg-*` classes with theme variables
- Text colors using `text-*` classes with theme variables
- Border colors using `border-*` classes with theme variables
- Border radius using `rounded-*` classes with radius variables
- Focus states using `ring-*` classes with `--color-ring`

**Example patterns:**

```svelte
<button class="bg-primary text-primary-foreground border border-border rounded-md">
<div class="bg-card text-card-foreground border border-border rounded-lg">
```

### 2. Layout Components

**Required theming support:**

- Section spacing using predefined classes (`.section-py`, `.section-px`)
- Background colors appropriate to content type
- Text hierarchy using foreground/muted-foreground
- Card-like elements using card/card-foreground
- Interactive elements using primary/secondary colors

**Example patterns:**

```svelte
<section class="section-py section-px bg-background text-foreground">
<div class="bg-muted text-muted-foreground rounded-md">
<h2 class="text-foreground">
```

### 3. Navigation Components

**Required theming support:**

- Navigation background using background/card colors
- Active states using accent colors
- Hover states using appropriate hover colors
- Mobile menu styling consistent with desktop
- Logo and branding elements using foreground colors

### 4. Form Components

**Required theming support:**

- Input backgrounds using `--color-input` or `--color-background`
- Input borders using `--color-border`
- Focus rings using `--color-ring`
- Placeholder text using `--color-muted-foreground`
- Error states using `--color-destructive`

## Implementation Guidelines

### Color Usage Rules

1. **Backgrounds**: Use `bg-background`, `bg-card`, `bg-muted` for main areas
2. **Text**: Use `text-foreground`, `text-card-foreground`, `text-muted-foreground` for readability
3. **Interactive Elements**: Use `bg-primary`, `bg-secondary`, `bg-accent` for buttons/links
4. **Borders**: Use `border-border` for consistent border styling
5. **Focus States**: Always use `ring-ring` for focus indicators

### Radius Usage Rules

1. **Small Elements**: Use `rounded-sm` or `rounded-md` (buttons, badges)
2. **Cards/Containers**: Use `rounded-lg` or `rounded-xl`
3. **Large Sections**: Use `rounded-2xl` or larger
4. **Consistent Sizing**: All related elements should use same radius tier

### Spacing Usage Rules

1. **Page Sections**: Always use `.section-py` and `.section-px`
2. **Card Padding**: Use consistent internal spacing (`p-6`, `p-8`)
3. **Component Gaps**: Use consistent gap classes (`gap-4`, `gap-6`)
4. **Responsive**: Ensure spacing works across all breakpoints

## Dark Mode Support

All components must work with dark mode by:

1. Using CSS variables (not conditional classes)
2. Testing that all text remains readable
3. Ensuring sufficient contrast ratios
4. Maintaining visual hierarchy in both modes

## Quality Checklist

For each component, verify:

- [ ] Uses only CSS custom properties (no `dark:` classes)
- [ ] Background and foreground colors are paired correctly
- [ ] Borders use `--color-border` or appropriate semantic color
- [ ] Border radius uses calculated radius variables
- [ ] Spacing uses predefined section classes where applicable
- [ ] Focus states use `--color-ring`
- [ ] Hover states use appropriate hover colors
- [ ] Component works in both light and dark themes
- [ ] Text remains readable with sufficient contrast
- [ ] Interactive elements are clearly distinguishable

## Component Categories

### High Priority (Core UI)

- Button.svelte
- Card.svelte
- Navigation components
- Form inputs

### Medium Priority (Layout)

- Hero sections
- Feature sections
- Footer components
- Grid layouts

### Low Priority (Content)

- Text animations
- Decorative elements
- Static content sections

This standard ensures that the entire site can be themed by simply updating CSS variables in `theme.css`, providing maximum flexibility for theme customization and dark mode support.
