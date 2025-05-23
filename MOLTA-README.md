# MOLTA Frontend - README

## 🔖 Overview

This project is built on top of the **MIFOSX Web App**. The goal of this repository is to extend and customize the frontend user experience to meet MOLTA's product and user interface requirements while maintaining compatibility with the underlying Fineract backend.

---

## 🚀 Current Setup

- **Base Tag:** We are currently working off the **`tags/v1.0.0-fineract1.11`** release of MIFOSX Web App
- **Stable Branch:** All work is branched from and merged back into the shared `stable` branch created from the `v1.0.0-fineract1.11` tag
- This `stable` branch represents the _current integration/staging branch_ for all team contributions

---

## 🌱 Branching Strategy

### 1. `stable` Branch

- Created from MIFOSX Web App `tags/v1.0.0-fineract1.11`
- Shared integration branch for all team members
- Any updates from upstream (e.g., newer tags like `v1.1.0-fineract1.12`) will be merged here periodically

### 2. Feature Branches

Each developer creates a branch from `stable` using the following naming pattern:

```
feat/MOLTA-<ticket-number>-<short-description>
```

#### Examples:

```bash
git checkout -b feat/MOLTA-103-loan-dashboard-improvements stable
git checkout -b feat/MOLTA-207-client-profile-redesign stable
```

### 3. Pull Requests

- Once work is complete, create a PR **into `stable`**
- All PRs require review and approval before merging
- Must pass all tests and quality checks
- Include screenshots for UI changes

---

## 🔁 Keeping Up With MIFOSX Web App Releases

We periodically monitor new releases from the MIFOSX Web App to stay current with improvements and new features.

### Update Process

When a new MIFOSX Web App tag becomes available (e.g., `v1.1.0-fineract1.12`):

1. **Fetch the new tag:**

   ```bash
   git fetch upstream
   git checkout tags/<new-version> -b temp-upstream-<new-version>
   ```

2. **Create merge branch:**

   ```bash
   git checkout stable
   git checkout -b merge/upstream-<new-version>
   ```

3. **Merge and resolve conflicts:**

   ```bash
   git merge temp-upstream-<new-version>
   # Carefully resolve conflicts, preserving MOLTA customizations
   ```

4. **Test thoroughly:**

- Run all unit tests
- Test all MOLTA custom components
- Verify responsive design works
- Test critical user flows end-to-end
- Cross-browser compatibility testing

5. **Create PR into `stable`** with detailed documentation of:

- New upstream features added
- Any breaking changes in components
- MOLTA customizations that were preserved/updated
- Screenshots of any UI changes

6. **Notify team** of new features and any required updates to their work

---

## 📂 Project Structure

```
.
📁 src/
📁 ├── app/
📁 │   ├── clients/
📁 │   │   └── molta-client-extensions/    # Custom client components
📁 │   ├── loans/
📁 │   │   └── molta-loan-components/      # Custom loan UI components
📁 │   ├── shared/
📁 │   │   ├── molta-common/               # Shared MOLTA components
📁 │   │   └── pipes/                      # Custom pipes and filters
📁 │   ├── core/
📁 │   │   └── authentication/             # Auth customizations
📁 │   └── molta-features/                 # MOLTA-specific features
📁 ├── assets/
📁 │   ├── images/molta/                   # MOLTA branding assets
📁 │   └── i18n/                           # Internationalization files
📁 ├── styles/
📁 │   ├── molta-theme.scss                # Custom MOLTA styling
📁 │   └── components/                     # Component-specific styles
📁 └── environments/                       # Environment configurations
📁 angular.json                            # Angular configuration
📁 package.json                            # Dependencies
📁 tailwind.config.js                      # Tailwind CSS configuration
└── MOLTA-README.md
```

---

## ✅ Contribution Workflow

### For All Contributors:

1. **Start from stable:**

   ```bash
   git checkout stable
   git pull origin stable
   ```

2. **Create feature branch:**

   ```bash
   git checkout -b feat/MOLTA-<ticket>-<description>
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Make your changes** following coding standards

5. **Test locally:**

   ```bash
   npm run serve
   npm run test
   ```

6. **Commit with clear messages:**

   ```bash
   git commit -m "MOLTA-<ticket>: Improve loan dashboard layout

   - Add responsive grid for loan summary cards
   - Implement filtering by loan status
   - Update mobile navigation for better UX"
   ```

7. **Push and create PR:**

   ```bash
   git push origin feat/MOLTA-<ticket>-<description>
   ```

8. **Open PR to `stable`** with:

- Clear description of changes
- Link to MOLTA ticket
- Screenshots of UI changes
- Mobile/responsive testing notes

### ✅ Contribution Checklist

- [ ] Branch created from latest `stable`
- [ ] Feature branch follows naming convention: `feat/MOLTA-<ticket>-<description>`
- [ ] Code follows Angular and TypeScript coding standards
- [ ] Component tests added/updated
- [ ] Responsive design tested on multiple screen sizes
- [ ] Cross-browser testing completed (Chrome, Firefox, Safari, Edge)
- [ ] Accessibility guidelines followed (WCAG compliance)
- [ ] Screenshots included in PR (for UI changes)
- [ ] Reviewer(s) assigned
- [ ] All CI/CD checks pass

---

## 🧪 Testing Strategy

### Unit Tests

- Angular component testing with Jasmine/Karma
- Service layer testing
- Pipe and utility function testing
- Custom MOLTA component testing

### E2E Tests

- Critical user flows (login, loan application, payments)
- MOLTA-specific feature workflows
- Cross-browser compatibility
- Mobile responsiveness

### Testing Commands

```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run e2e

# Lint code
npm run lint

# Build for production
npm run build:prod
```

---

## 🚀 Development Environment

### Prerequisites

- Node.js 18+
- npm 9+
- Angular CLI 16+
- Modern web browser

### Local Setup

```bash
# Clone repository
git clone <repo-url>
cd molta-frontend

# Install dependencies
npm install

# Start development server
npm run serve

# Application will be available at http://localhost:4200
```

### Environment Configuration

- **Development:** `src/environments/environment.ts`
- **Staging:** `src/environments/environment.staging.ts`
- **Production:** `src/environments/environment.prod.ts`

### Backend Integration

Ensure the MOLTA backend is running and accessible:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  fineractApiUrl: 'http://localhost:8080/fineract-provider/api/v1',
  moltaApiUrl: 'http://localhost:8080/fineract-provider/api/v1/molta'
};
```

---

## 🎨 MOLTA Custom Features

### Custom Theming

- **Location:** `src/styles/molta-theme.scss`
- **Purpose:** MOLTA brand colors, fonts, and styling
- **Features:** Dark/light mode support, responsive breakpoints

### Enhanced Loan Dashboard

- **Location:** `src/app/loans/molta-loan-components/`
- **Purpose:** Improved loan management interface
- **Features:** Advanced filtering, visual loan status indicators, payment scheduling

### Client Profile Enhancements

- **Location:** `src/app/clients/molta-client-extensions/`
- **Purpose:** Enhanced client information display
- **Features:** Document management, communication history, risk assessment

### Mobile-First Design

- **Approach:** Responsive design with mobile-first CSS
- **Breakpoints:** Mobile (320px+), Tablet (768px+), Desktop (1024px+)
- **Features:** Touch-friendly interfaces, optimized navigation

---

## 🎯 UI/UX Guidelines

### Design System

- **Colors:** Follow MOLTA brand palette
- **Typography:** Consistent font hierarchy
- **Spacing:** 8px grid system
- **Components:** Reusable component library

### Accessibility Standards

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support

### Performance Standards

- First Contentful Paint < 2s
- Largest Contentful Paint < 4s
- Cumulative Layout Shift < 0.1
- Bundle size optimization with lazy loading

---

## 🔧 Build and Deployment

### Build Commands

```bash
# Development build
npm run build

# Production build
npm run build:prod

# Analyze bundle size
npm run build:analyze
```

### Deployment Environments

- **Development:** Auto-deploy from feature branches
- **Staging:** Deploy from `stable` branch
- **Production:** Deploy from tagged releases

---

## 🐛 Troubleshooting

### Common Issues

1. **Node Modules Issues**

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Build Failures**

   ```bash
   npm run lint:fix
   npm run build --verbose
   ```

3. **Backend Connection Issues**

- Check environment configuration
- Verify CORS settings on backend
- Check network connectivity to API endpoints

4. **Styling Issues**

   ```bash
   # Clear Angular cache
   ng cache clean

   # Rebuild styles
   npm run build:styles
   ```

---

## 📱 Mobile Development

### Responsive Breakpoints

```scss
// Mobile devices
@media (max-width: 767px) {
}

// Tablets
@media (min-width: 768px) and (max-width: 1023px) {
}

// Desktop
@media (min-width: 1024px) {
}
```

### Touch Optimization

- Minimum touch target size: 44px
- Gesture support for common actions
- Optimized scroll performance

---

## 📞 Support & Communication

### Questions or Issues?

- **UI/UX Issues:** Create GitHub issue with `frontend` and `ui` labels
- **Feature Requests:** Follow internal ticketing system (MOLTA-XXX)
- **Code Reviews:** Tag appropriate frontend team members
- **Design Questions:** Contact UX/UI design team

### Frontend Team Contacts

- **Lead Developer:** [Name/Contact]
- **Senior Developers:** [Names/Contacts]
- **UX/UI Designer:** [Name/Contact]
- **QA Engineer:** [Name/Contact]

---

## 📋 Quick Reference

### Useful Commands

```bash
# Development workflow
git checkout stable && git pull origin stable
git checkout -b feat/MOLTA-XXX-feature-name
npm run serve

# Testing and quality
npm run test
npm run e2e
npm run lint
npm run lint:fix

# Build and deploy
npm run build:prod
npm run build:analyze
```

### Important Links

- [MIFOSX Web App GitHub](https://github.com/openMF/web-app)
- [Angular Documentation](https://angular.io/docs)
- [MOLTA Design System](link-to-design-system)
- [Frontend Guidelines](link-to-frontend-guidelines)

---

_Last Updated: [Current Date] | Version: 1.0 | Base: MIFOSX Web App v1.0.0-fineract1.11_
