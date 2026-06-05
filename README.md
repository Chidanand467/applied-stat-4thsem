# Applied Statistics Portfolio - Chidanand Karennavar

## Project Overview
A premium, highly interactive academic portfolio website for the course **Applied Statistics (25EMAB218)** featuring immersive animations, real-time simulations, and engineering-focused visualizations.

## Key Features

### 1. Hero Section
- Animated particle background with floating data streams
- Glowing text effect with 3D appearance
- Smooth scroll navigation indicators
- Social links (LinkedIn, GitHub)

### 2. Interactive Chapters

#### Chapter 1: Data Characterization
- **Data Playground:** Real-time slider controls to adjust sample size and outliers
- **Live Calculations:** Mean, standard deviation, variance updating instantly
- **Visualizations:** Distribution charts, area plots
- **Concepts:** Central tendency, dispersion measures, outlier detection

#### Chapter 2: Probabilistic Modeling
- **Bayes Theorem Simulator:** Interactive parameters for fault detection scenarios
- **Live Results:** P(Warning Triggered) and P(Fault|Warning) updating in real-time
- **Key Concepts:** Addition rule, multiplication rule, conditional probability, Bayes theorem
- **Lab 2 Integration:** Robotic gripper reliability analysis

#### Chapter 3: Statistical Distributions
- **Distribution Explorer:** Adjust mean and standard deviation to see bell curve morph
- **68-95-99.7 Rule:** Visual demonstration of empirical rule
- **Z-Score Calculator:** Convert values to z-scores with percentile lookup
- **Central Limit Theorem:** Explanation with engineering context

#### Chapter 4: Statistical Inference
- **Hypothesis Testing Arena:** Control significance levels and error types
- **Type I & II Error Visualization:** Interactive comparison
- **Confidence Intervals:** 90%, 95%, 99% CI explained
- **Decision Framework:** Step-by-step testing procedure

#### Chapter 5: Regression Modeling
- **Regression Laboratory:** Adjust slope and intercept in real-time
- **Scatter Plots:** Visual regression line fitting
- **R² Calculation:** Live model quality metrics
- **Model Types:** Simple linear, multiple linear, logistic, polynomial

### 3. Lab Sections

#### Lab 1: CNC Machine Analysis
- Statistical analysis of robotic arm positioning
- Metrics: Mean, Standard Deviation, Variance
- Process capability visualization
- Engineering interpretation

#### Lab 2: Robotic Gripper Reliability
- Bayesian analysis of defect detection
- Interactive probability sliders
- False alarm vs. actual failure analysis
- Two-stage inspection recommendation

### 4. Dashboard
- **Course Progress:** Visual progress for all 5 chapters
- **Achievement Badges:** 6 unlockable achievements
- **Skills Acquired:** 8 key competencies
- **Key Takeaways:** Summarized learning objectives

### 5. UI/UX Features
- **Glassmorphism Design:** Frosted glass effect on cards
- **Neon Color Scheme:** Cyan, blue, purple on dark background
- **Smooth Animations:** Framer Motion for transitions and interactions
- **Responsive Layout:** Works on mobile, tablet, desktop
- **Dark/Light Theme Toggle:** Theme switcher in bottom-right
- **Konami Code Easter Egg:** Statistics fireworks animation
- **Progress Bar:** Scroll progress indicator at top

## Technology Stack
- **Frontend Framework:** React 18 + Vite
- **Styling:** Tailwind CSS + Custom CSS
- **Animations:** Framer Motion, GSAP
- **Charts:** Recharts
- **Icons:** Lucide React
- **3D Particles:** Canvas-based animation

## Interaction Patterns

### Sliders
- Range inputs for parameter adjustment
- Gradient background showing current value
- Real-time recalculation of statistics

### Interactive Charts
- Line charts for distributions
- Area charts for data visualization
- Scatter plots for regression
- Bar charts for comparisons

### Simulation Controls
- Adjust probability parameters
- View live calculation results
- Understand impact of changes

### Responsive Cards
- Hover effects with scale transforms
- Glassmorphic styling
- Color-coded content areas

## Content Alignment

Every section includes:
1. **Visual Learning:** Charts, graphs, animations
2. **Interactive Elements:** Sliders, toggles, calculators
3. **Engineering Examples:** Real robotic/automation scenarios
4. **Math Concepts:** Formulas, definitions, interpretations
5. **Practical Application:** How engineers use these concepts

## Performance
- ✅ GPU-accelerated animations
- ✅ Optimized bundle size (198KB gzipped)
- ✅ Lazy-loaded sections
- ✅ Smooth 60 FPS interactions
- ✅ Mobile responsive

## Deployment Ready
- Production build: `npm run build`
- Output: `/dist` directory with optimized files
- Can be deployed to Vercel, Netlify, GitHub Pages

## Navigation
- **Fixed Navigation Bar:** Quick links to all sections
- **Smooth Scroll:** Click navigation items to jump to sections
- **Progress Tracking:** Visual scroll progress bar
- **Section IDs:** Each chapter/lab is individually addressable

## Browser Compatibility
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## Future Enhancements (Optional)
- 3D data visualization with Three.js
- Export data/results as PDF
- Shareable simulation links
- Leaderboard for achievements
- More detailed lab reports
- Video tutorials embedded
- Code playground for Python exercises
