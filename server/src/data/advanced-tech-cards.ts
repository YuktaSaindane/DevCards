import { v4 as uuidv4 } from 'uuid';
import { Card } from '../types/models';

export const createAdvancedTechCards = (): Card[] => {
  return [
    // React Performance & Advanced Hooks
    {
      id: uuidv4(),
      front: 'How does React\'s Concurrent Features improve performance?',
      back: 'Enables time-slicing, interruptible rendering, automatic batching, and Suspense for data fetching. Allows React to pause, resume, and prioritize updates for better UX.'
    },
    {
      id: uuidv4(),
      front: 'When would you use useMemo vs useCallback vs React.memo?',
      back: 'useMemo: expensive calculations. useCallback: stable function references for child props. React.memo: prevent re-renders of components with same props. Each targets different optimization scenarios.'
    },
    {
      id: uuidv4(),
      front: 'Explain the difference between useLayoutEffect and useEffect.',
      back: 'useLayoutEffect runs synchronously after DOM mutations but before browser paint. useEffect runs asynchronously after paint. Use useLayoutEffect for DOM measurements to prevent flicker.'
    },
    {
      id: uuidv4(),
      front: 'How would you implement a custom hook for complex state management?',
      back: 'Combine useReducer for complex state logic, useContext for sharing state, and custom hooks for reusable stateful logic. Example: useAsyncState hook managing loading, data, and error states.'
    },
    {
      id: uuidv4(),
      front: 'What are React Server Components and their benefits?',
      back: 'Components that run on the server, reducing bundle size, enabling server-side data fetching, and improving performance. They complement client components for hybrid rendering strategies.'
    },
    
    // TypeScript Advanced Patterns
    {
      id: uuidv4(),
      front: 'Explain conditional types with a practical example.',
      back: 'type ApiResponse<T> = T extends string ? { message: T } : { data: T }. Enables type-level branching logic based on input types for more precise API typing.'
    },
    {
      id: uuidv4(),
      front: 'How do mapped types enhance code safety?',
      back: 'Transform existing types: type Partial<T> = { [K in keyof T]?: T[K] }. Creates new types by iterating over properties, enabling utilities like Required, Readonly, Pick.'
    },
    {
      id: uuidv4(),
      front: 'What are template literal types used for?',
      back: 'Create string literal types with interpolation: type EventName<T> = `on${Capitalize<T>}`. Useful for CSS-in-JS, API endpoints, and type-safe string manipulation.'
    },
    {
      id: uuidv4(),
      front: 'Explain the benefits of const assertions in TypeScript.',
      back: 'const arr = [1, 2] as const creates readonly tuple [1, 2] instead of number[]. Provides more specific types and prevents mutations, improving type inference.'
    },
    
    // Performance Optimization
    {
      id: uuidv4(),
      front: 'How would you optimize a large list with thousands of items?',
      back: 'Use react-window/react-virtualized for virtualization, implement infinite scrolling, memoize list items, use keys properly, and consider server-side pagination with search/filtering.'
    },
    {
      id: uuidv4(),
      front: 'Explain different code-splitting strategies in React.',
      back: 'Route-based: React.lazy() with dynamic imports. Component-based: Split heavy components. Third-party: Separate vendor bundles. Use Suspense for loading states and error boundaries.'
    },
    {
      id: uuidv4(),
      front: 'What are the core Web Vitals and how to optimize them?',
      back: 'LCP (Largest Contentful Paint): optimize images, reduce server response time. FID (First Input Delay): minimize JS blocking. CLS (Cumulative Layout Shift): reserve space for dynamic content.'
    },
    {
      id: uuidv4(),
      front: 'How does tree shaking work and how to optimize it?',
      back: 'Eliminates dead code by analyzing ES6 import/export. Optimize: use ES modules, avoid default exports for libraries, configure webpack/rollup properly, use production builds.'
    },
    
    // API Design & Architecture
    {
      id: uuidv4(),
      front: 'Design a REST API for a multi-tenant SaaS application.',
      back: 'Use tenant isolation via subdomains or headers, implement RBAC, version APIs (/v1/), use pagination, rate limiting, proper HTTP status codes, and OpenAPI documentation.'
    },
    {
      id: uuidv4(),
      front: 'When would you choose GraphQL over REST?',
      back: 'Multiple data sources, complex nested relationships, mobile apps needing specific fields, real-time subscriptions, and when over-fetching/under-fetching are concerns.'
    },
    {
      id: uuidv4(),
      front: 'How do you handle API versioning and backward compatibility?',
      back: 'Semantic versioning, deprecation headers, maintaining multiple versions, gradual migration strategies, feature flags, and clear breaking change communication to consumers.'
    },
    {
      id: uuidv4(),
      front: 'Explain microservices communication patterns.',
      back: 'Synchronous: HTTP/gRPC for real-time data. Asynchronous: message queues (RabbitMQ, Kafka) for decoupling. Event sourcing for audit trails. API gateways for routing and auth.'
    },
    
    // Serverless & Cloud
    {
      id: uuidv4(),
      front: 'What are the trade-offs of serverless architectures?',
      back: 'Pros: auto-scaling, pay-per-use, no server management. Cons: cold starts, vendor lock-in, timeout limits, debugging complexity, and potential higher costs at scale.'
    },
    {
      id: uuidv4(),
      front: 'How do you handle state in serverless functions?',
      back: 'External storage (Redis, DynamoDB), database connections pooling, environment variables for config, stateless design patterns, and caching strategies for performance.'
    },
    {
      id: uuidv4(),
      front: 'Explain the difference between CDN and Edge Computing.',
      back: 'CDN: caches static content globally. Edge Computing: runs code closer to users, enabling dynamic processing with low latency. Edge functions complement CDNs for personalization.'
    },
    
    // CI/CD & DevOps
    {
      id: uuidv4(),
      front: 'Design a CI/CD pipeline for a React application.',
      back: 'Stages: lint/test → build → security scan → deploy to staging → integration tests → deploy to production. Use feature flags, blue-green deployments, and automated rollbacks.'
    },
    {
      id: uuidv4(),
      front: 'How do you implement zero-downtime deployments?',
      back: 'Blue-green deployments, rolling updates, feature flags for gradual rollouts, health checks, load balancer configuration, and database migration strategies.'
    },
    {
      id: uuidv4(),
      front: 'What monitoring and observability tools would you implement?',
      back: 'Application: Sentry for errors, DataDog/New Relic for APM. Infrastructure: Prometheus + Grafana. Logs: ELK stack. User experience: RUM tools. Custom dashboards for business metrics.'
    },
    
    // Security & Best Practices
    {
      id: uuidv4(),
      front: 'How do you prevent XSS attacks in React applications?',
      back: 'React escapes by default, avoid dangerouslySetInnerHTML, use Content Security Policy, sanitize user input, validate on server-side, and use HTTPS for all communications.'
    },
    {
      id: uuidv4(),
      front: 'Implement secure authentication with JWT tokens.',
      back: 'Short-lived access tokens (15 min), refresh tokens in httpOnly cookies, proper logout clearing both tokens, token rotation, and storing sensitive data server-side only.'
    },
    {
      id: uuidv4(),
      front: 'What are the OWASP Top 10 security risks for web apps?',
      back: 'Injection, broken authentication, sensitive data exposure, XXE, broken access control, security misconfiguration, XSS, insecure deserialization, vulnerable components, insufficient logging.'
    },
    
    // Scalability & Architecture
    {
      id: uuidv4(),
      front: 'How would you scale a React app to handle 1M+ users?',
      back: 'CDN for static assets, code splitting, lazy loading, caching strategies, horizontal scaling with load balancers, database optimization, and microservices architecture.'
    },
    {
      id: uuidv4(),
      front: 'Explain different caching strategies for web applications.',
      back: 'Browser cache, CDN cache, application cache (Redis), database query cache, and HTTP caching headers. Each layer serves different performance optimization goals.'
    },
    {
      id: uuidv4(),
      front: 'How do you handle real-time features at scale?',
      back: 'WebSockets with Socket.io, message brokers (Redis Pub/Sub), horizontal scaling with sticky sessions, graceful degradation, and consideration of WebRTC for P2P scenarios.'
    },
    
    // Testing & Quality
    {
      id: uuidv4(),
      front: 'Design a comprehensive testing strategy for a React app.',
      back: 'Unit tests (Jest), component tests (React Testing Library), integration tests (Cypress), visual regression tests, performance tests, and accessibility audits with automated CI checks.'
    },
    {
      id: uuidv4(),
      front: 'How do you test custom hooks effectively?',
      back: 'Use @testing-library/react-hooks with renderHook, test different scenarios and edge cases, mock dependencies, test cleanup effects, and verify re-render behavior.'
    },
    {
      id: uuidv4(),
      front: 'What\'s the difference between shallow and deep rendering in testing?',
      back: 'Shallow: renders only the component, not children (Enzyme). Deep: renders full component tree. React Testing Library uses deep rendering by default for realistic user interactions.'
    },
    
    // Modern Web Standards
    {
      id: uuidv4(),
      front: 'Explain Progressive Web App (PWA) essential features.',
      back: 'Service workers for offline functionality, Web App Manifest for installation, responsive design, HTTPS requirement, and progressive enhancement for cross-platform compatibility.'
    },
    {
      id: uuidv4(),
      front: 'How do Web Workers improve application performance?',
      back: 'Run JavaScript in background threads, prevent UI blocking for heavy computations, enable true parallelism, useful for data processing, image manipulation, and crypto operations.'
    },
    {
      id: uuidv4(),
      front: 'What are the benefits of HTTP/2 for web applications?',
      back: 'Multiplexing eliminates head-of-line blocking, server push reduces round trips, header compression saves bandwidth, and binary protocol improves parsing efficiency.'
    },
    
    // State Management
    {
      id: uuidv4(),
      front: 'Compare Redux, Zustand, and Recoil for state management.',
      back: 'Redux: predictable, time-travel debugging, large ecosystem. Zustand: lightweight, less boilerplate. Recoil: atomic state, excellent for complex dependency graphs. Choose based on complexity.'
    },
    {
      id: uuidv4(),
      front: 'When would you use Context vs external state management?',
      back: 'Context: theme, auth, small shared state. External libraries: complex state logic, time-travel debugging, middleware needs, performance-critical updates, or large applications.'
    },
    {
      id: uuidv4(),
      front: 'Implement optimistic updates in a React application.',
      back: 'Update UI immediately, store original state, send API request, revert on failure, and show success confirmation. Enhances perceived performance and user experience.'
    },
    
    // Advanced JavaScript Concepts
    {
      id: uuidv4(),
      front: 'Explain the difference between Promise.all and Promise.allSettled.',
      back: 'Promise.all fails fast if any promise rejects. Promise.allSettled waits for all promises to settle, returning results and rejections. Use allSettled when partial success is acceptable.'
    },
    {
      id: uuidv4(),
      front: 'How do you implement proper error boundaries in React?',
      back: 'Class components with componentDidCatch and getDerivedStateFromError. Catch errors in render, lifecycle methods, and constructors. Cannot catch async errors or event handlers.'
    },
    {
      id: uuidv4(),
      front: 'What are the practical applications of Proxy in JavaScript?',
      back: 'State management libraries (Vue 3 reactivity), API mocking, validation, property access logging, implementing computed properties, and creating DSLs with transparent interfaces.'
    },
    
    // Database & Backend
    {
      id: uuidv4(),
      front: 'How do you handle database migrations in production?',
      back: 'Backward-compatible changes, blue-green deployments, feature flags, gradual rollouts, rollback strategies, data validation, and coordination between app and schema changes.'
    },
    {
      id: uuidv4(),
      front: 'Explain different database scaling strategies.',
      back: 'Vertical scaling (more powerful hardware), horizontal scaling (sharding), read replicas, caching layers, connection pooling, and choosing appropriate database types for use cases.'
    },
    
    // Interview & Leadership
    {
      id: uuidv4(),
      front: 'How do you approach technical debt in a growing codebase?',
      back: 'Regular code reviews, refactoring sprints, technical debt tracking, impact assessment, gradual improvement with feature development, and team education on best practices.'
    },
    {
      id: uuidv4(),
      front: 'Design a system for A/B testing in a React application.',
      back: 'Feature flags service, user segmentation, metrics collection, statistical significance testing, gradual rollouts, and integration with analytics platforms for data-driven decisions.'
    },
    {
      id: uuidv4(),
      front: 'How do you mentor junior developers effectively?',
      back: 'Pair programming, code reviews with explanations, setting clear learning goals, providing challenging but achievable tasks, encouraging questions, and sharing architectural decision reasoning.'
    }
  ];
};
