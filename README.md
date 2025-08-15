# Test Task — React SPA

This project is a Single Page Application (SPA) with two sections. Each section has its own logic, is lazy-loaded, and follows modern UI/UX principles.

# Tech Stack

- React + TypeScript
- React Router DOM
- React RND
- TailwindCSS
- Vite
- WebSocket API (for Task 2)
- ESLint + Prettier + Husky (DevTools)

# Application Sections

1. First Task — Interactive Workspace:

- 5 drag-and-drop blocks in a grid layout

- Blocks can be resized

- Z-index control: bring clicked block to front

- Delete blocks individually

- Reset button restores all blocks to initial position/size

- State is persisted in localStorage after refresh

2. Second Task — Bitcoin Transaction Tracker (WebSocket)

- Connects to Blockchain WebSocket API

- Displays live incoming Bitcoin transactions

- Shows sender address, receiver address, and amount (BTC)

- Calculates total amount of all received transactions

- Includes control buttons:
  - Start — subscribe to live updates

  - Stop — pause updates but keep data

  - Reset — clear transaction list and total

# Architecture

- Lazy loading via React.lazy and Suspense

- TailwindCSS for quick and responsive styling

- React Router used for page routing
