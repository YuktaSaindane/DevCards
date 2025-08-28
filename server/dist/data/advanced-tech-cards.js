"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdvancedTechCards = void 0;
const uuid_1 = require("uuid");
const createAdvancedTechCards = () => {
    return [
        // React Fundamentals
        {
            id: (0, uuid_1.v4)(),
            front: 'What is React?',
            back: 'A JavaScript library for building user interfaces, especially single-page applications. It uses components to create reusable UI pieces and a virtual DOM for better performance.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What is JSX?',
            back: 'JavaScript XML - a syntax extension that lets you write HTML-like code in JavaScript. It gets compiled to React.createElement() calls.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What is the difference between props and state?',
            back: 'Props are read-only data passed from parent to child components. State is mutable data that belongs to a component and can change over time, triggering re-renders.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What is the virtual DOM?',
            back: 'A JavaScript representation of the real DOM kept in memory. React compares it with the previous virtual DOM, finds differences, and updates only the changed parts in the real DOM.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What are React components?',
            back: 'Reusable pieces of UI that return JSX. Can be functional components (functions) or class components (ES6 classes). Functional components with hooks are preferred now.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What is useState hook?',
            back: 'A hook that lets you add state to functional components. Returns an array with current state value and a function to update it. Example: const [count, setCount] = useState(0)'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What is useEffect hook?',
            back: 'A hook for side effects in functional components. Runs after render by default. Used for data fetching, subscriptions, timers. Can specify dependencies to control when it runs.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What are React keys and why are they important?',
            back: 'Unique identifiers for list items that help React identify which items have changed, added, or removed. Improves performance and prevents rendering bugs in dynamic lists.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What is the difference between controlled and uncontrolled components?',
            back: 'Controlled: Form data is handled by React state. Uncontrolled: Form data is handled by the DOM itself using refs. Controlled components are recommended for better control.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What is React Context?',
            back: 'A way to pass data through the component tree without manually passing props at every level. Useful for global data like themes, user authentication, or language settings.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What is prop drilling?',
            back: 'Passing props through multiple component levels to reach a deeply nested component. Can be solved with Context, state management libraries, or component composition.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What are React fragments?',
            back: 'A way to group multiple elements without adding extra DOM nodes. Can use <React.Fragment> or the shorthand <> </> syntax.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What is the useCallback hook?',
            back: 'Returns a memoized callback function that only changes if dependencies change. Used to prevent unnecessary re-renders when passing callbacks to child components.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What is the useMemo hook?',
            back: 'Returns a memoized value that only recalculates when dependencies change. Used to optimize expensive computations and prevent unnecessary calculations on every render.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What is React.memo?',
            back: 'A higher-order component that memoizes the result. If props haven\'t changed, it skips rendering and reuses the last rendered result. Only works with functional components.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What is the useRef hook?',
            back: 'Returns a mutable ref object that persists for the full lifetime of the component. Commonly used to access DOM elements directly or store mutable values that don\'t trigger re-renders.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What is the useReducer hook?',
            back: 'An alternative to useState for more complex state logic. Takes a reducer function and initial state, returns current state and dispatch function. Similar to Redux pattern.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What are synthetic events in React?',
            back: 'React\'s wrapper around native events that provides consistent behavior across different browsers. Has the same interface as native events but works the same everywhere.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What is conditional rendering in React?',
            back: 'Rendering different content based on certain conditions. Can use if statements, ternary operators, or logical && operator to conditionally show/hide elements.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What are higher-order components (HOCs)?',
            back: 'Functions that take a component and return a new component with additional props or behavior. Used for code reuse, logic abstraction, and cross-cutting concerns.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What is the difference between functional and class components?',
            back: 'Functional: Simple functions that return JSX, use hooks for state and lifecycle. Class: ES6 classes with render method, use this.state and lifecycle methods. Functional components are preferred.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What are the React component lifecycle methods?',
            back: 'Methods called at different stages: componentDidMount (after first render), componentDidUpdate (after updates), componentWillUnmount (before removal). In functional components, use useEffect instead.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What is error boundary in React?',
            back: 'A React component that catches JavaScript errors anywhere in the child component tree and displays a fallback UI. Only works in class components with componentDidCatch or getDerivedStateFromError.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What is React.StrictMode?',
            back: 'A development mode tool that helps find problems in applications by running additional checks and warnings. Doesn\'t render any visible UI, only activates checks for descendants.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What is the difference between createElement and JSX?',
            back: 'JSX is syntactic sugar for React.createElement(). JSX: <div>Hello</div> compiles to React.createElement("div", null, "Hello"). JSX is more readable and commonly used.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'How do you handle forms in React?',
            back: 'Use controlled components with state to manage form data. Handle onChange events to update state, onSubmit to process form. Use useState for simple forms, useReducer for complex ones.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What is React reconciliation?',
            back: 'The process where React compares the new virtual DOM tree with the previous one and determines the minimum changes needed to update the real DOM efficiently.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What are render props in React?',
            back: 'A pattern where a component receives a function as a prop that returns JSX. The component calls this function instead of implementing its own render logic, enabling code sharing.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What is the difference between state and props?',
            back: 'State is internal and mutable data owned by a component. Props are external data passed to a component from its parent. State can change, props are read-only.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'How do you optimize React app performance?',
            back: 'Use React.memo, useMemo, useCallback for unnecessary re-renders. Implement code splitting with React.lazy. Optimize images, use proper keys in lists, avoid inline functions in JSX.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What is React Router?',
            back: 'A library for handling navigation and routing in React applications. Enables creating single-page applications with multiple views and URL-based navigation.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What is Redux and when would you use it?',
            back: 'A state management library for JavaScript apps. Use when you have complex state logic, many components need the same data, or you need predictable state updates with time-travel debugging.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What are React portals?',
            back: 'A way to render children into a DOM node that exists outside the parent component\'s DOM hierarchy. Useful for modals, tooltips, or any UI that needs to escape its container.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What is the key prop used for in React lists?',
            back: 'Helps React identify which list items have changed, added, or removed. Should be unique and stable. Don\'t use array index as key if list can change order.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'How do you prevent memory leaks in React?',
            back: 'Clean up in useEffect return function: clear timers, cancel API requests, unsubscribe from events. Use AbortController for fetch requests. Remove event listeners in cleanup.'
        },
        {
            id: (0, uuid_1.v4)(),
            front: 'What is the difference between useMemo and useCallback?',
            back: 'useMemo memoizes a computed value and recalculates only when dependencies change. useCallback memoizes a function and recreates only when dependencies change.'
        }
    ];
};
exports.createAdvancedTechCards = createAdvancedTechCards;
//# sourceMappingURL=advanced-tech-cards.js.map