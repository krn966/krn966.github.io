# Credit Card Comparison Website

A comprehensive website for comparing credit card features, benefits, and eligibility.

## Features

- Credit card comparison tool
- Eligibility checker
- Contact form
- Dark mode support
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd cardcompare
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will start on http://localhost:3000

## Development

For development with auto-reload:
```bash
npm run dev
```

## Project Structure

```
cardcompare/
├── public/              # Static files
│   ├── css/            # CSS files
│   ├── js/             # JavaScript files
│   └── images/         # Image assets
├── server.js           # Express server
├── package.json        # Project dependencies
└── README.md          # This file
```

## API Endpoints

- `GET /api/cards` - Get all credit cards
- `GET /api/cards/:id` - Get specific card details
- `POST /api/compare` - Compare selected cards
- `POST /api/check-eligibility` - Check card eligibility
- `POST /api/contact` - Submit contact form

## Technologies Used

- Frontend:
  - HTML5
  - Tailwind CSS
  - JavaScript (ES6+)
- Backend:
  - Node.js
  - Express.js
- Development:
  - Nodemon (for development)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.