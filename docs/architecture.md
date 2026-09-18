# DS Architecture

## Layer 1 — Foundations

- Color primitives
- Semantic color
- Typography
- Spacing
- Radius
- Elevation
- Iconography
- Sizing
- Responsive rules

## Layer 2 — Core Components

### Actions
Button, Icon Button

### Inputs
Input, Textarea, Select, Checkbox, Radio, Switch, Search

### Navigation
Header, Sidebar, Menu Item, Breadcrumb, Tab, Chip, Pagination

### Feedback
Badge, Toast, Tooltip, Empty State, Loading, Error State

### Overlay
Drawer, Modal, Overlay

### Data Display
Table, Table Header, Table Row, List Item, Card, Divider

## Layer 3 — Domain Patterns

- Customer
- Case
- Campaign
- Performance
- Health
- Compensation
- Agent Statement
- Memo
- Competition

## Layer 4 — Templates

- List
- List + Filter
- Detail
- Form
- Dashboard
- Search Result
- Multi-step

## Layer 5 — Feature Screens

Feature screens compose approved foundations, components, patterns, and templates. They are not promoted to reusable assets automatically.

## Dependency Rule

Feature Screen → Template → Domain Pattern → Core Component → Foundation

Higher layers may depend on lower layers. Lower layers must not depend on feature-specific content.
