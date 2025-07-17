# E-Commerce Application

## Core Features

**Multi-Page E-Commerce Platform** built with React, Redux Toolkit, and Tailwind CSS featuring optimized state management and infinite scrolling.

### Key Functionality
- **Dashboard**: Product browsing with search functionality
- **Cart**: Add/remove items, quantity management, checkout process
- **Wishlist**: Save favorite products, move to cart functionality  
- **Orders**: Complete order history tracking

### Technical Architecture
- **Memory-Optimized Redux**: stores only product IDs in cart/wishlist, joins data via selectors
- **Infinite Scroll**: Loads products progressively from API (`fakestoreapi.in`)


### State Management
- **Products Slice**: Manages product data and search state
- **Cart Slice**: Lightweight ID-based storage with quantity tracking
- **Wishlist Slice**: Simple array of product IDs
- **Orders Slice**: Historical purchase records

### API Integration
- product fetching with pagination
- Dynamic search across title/description

built for scalability with normalized state structure and memoized selectors for optimal performance.