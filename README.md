# LeetMetric

LeetMetric is a lightweight front-end tool for browsing LeetCode completion stats by username. It fetches user progress from LeetCode’s GraphQL API and visualizes solved counts for Easy, Medium, and Hard problems using progress circles and summary cards.

## Demo
- Enter a LeetCode username and click **Search**.
- The app displays solved vs total problems for each difficulty.
- Displays submission totals for overall and per difficulty.

## Features
- Username validation for LeetCode username format
- Fetches LeetCode progress using GraphQL
- Visual progress circles for Easy, Medium, and Hard
- Summary cards for total submission counts
- Minimal HTML/CSS/JavaScript implementation

## Built With
- HTML
- CSS
- JavaScript

## Getting Started
### Prerequisites
A modern browser with JavaScript enabled.

### Run locally
1. Clone or download the repository.
2. Open `index.html` in a browser.

## Usage
1. Enter a LeetCode username in the input field.
2. Click **Search**.
3. View progress metrics for Easy, Medium, and Hard problems.

## Notes
- This project uses a temporary CORS proxy to call the LeetCode GraphQL endpoint.
- The app may require a working internet connection and a valid LeetCode username.
- Because LeetCode API access may change, the request may require updates if the endpoint changes.

## File Structure
- `index.html` – UI layout and structure
- `style.css` – styling and responsive layout
- `script.js` – form validation, GraphQL request, and UI rendering

## License
This repository is provided as-is. Feel free to reuse or extend it for learning and prototyping.
