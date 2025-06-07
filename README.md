# User Directory Application

## Project Overview

This is a modern user directory application built with Next.js, React, TypeScript, and Tailwind CSS. The application allows users to browse, search, and filter through a list of users with a responsive and intuitive interface.

## Features

- **Responsive User Interface**: Clean, modern UI that works across desktop and mobile devices
- **User Directory**: Display of user cards with essential information
- **Search Functionality**: Real-time search with debouncing for performance optimization
- **Role-based Filtering**: Filter users by their roles
- **Detailed User View**: Modal dialog with smooth transitions for viewing detailed user information
- **Lazy Loading**: Efficient loading of user data as the user scrolls
- **Comprehensive Test Coverage**: Unit tests for components and hooks

## Technical Implementation

- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS for utility-first styling
- **State Management**: React hooks for local state management
- **Testing**: Jest and React Testing Library
- **Performance Optimizations**: Debounced search, lazy loading, and optimized rendering
- **Animations**: CSS transitions for smooth UI interactions

## Getting Started

### Prerequisites

- Node.js (v16.13.1 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository (if applicable)
# git clone [repository-url]

# Install dependencies
npm install
# or
yarn install
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Testing

This project includes comprehensive unit tests for components and hooks. To run the tests:

```bash
# Run all tests
npm test
# or
yarn test

# Run tests with coverage report
npm test:coverage
# or
yarn test:coverage
```

## Project Structure

```
├── components/         # React components
│   ├── __tests__/     # Component tests
│   ├── UserCard.tsx   # User card component
│   ├── UserDialog.tsx # User detail modal with transitions
│   ├── UserList.tsx   # List with lazy loading
│   └── SearchBar.tsx  # Search and filter component
├── hooks/             # Custom React hooks
│   ├── __tests__/     # Hook tests
│   ├── useUsers.ts    # Data fetching hook
│   └── useDebounce.ts # Debounce hook for search
├── pages/             # Next.js pages
│   └── index.tsx      # Home page with search and user list
├── public/            # Static assets
├── styles/            # Global styles
└── utils/             # Utility functions and types
```

## Design Decisions

- **Component Architecture**: Focused on reusable, well-tested components
- **Performance**: Implemented debouncing for search to reduce unnecessary renders
- **User Experience**: Added smooth transitions for modal dialogs
- **Testing**: Comprehensive test coverage for components and hooks
- **Styling**: Used Tailwind CSS for rapid development and consistent design

## About This Project

This project was developed as a take-home assignment for a Lead Front-End Developer position, demonstrating proficiency in modern React development practices, TypeScript, responsive design, and testing.
