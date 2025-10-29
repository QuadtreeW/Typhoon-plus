# Typhoon Plus
3D, web-based visualization of typhoon tracks with interactive analysis and multiple styling modes.

Typhoon Plus renders historical typhoon paths on a 3D globe and supports searching by name, displaying multiple tracks at once, and switching between pressure- and category-based color schemes.

## Features
- 3D globe tracks
- Multi-typhoon overlay and name search
- Two visualization modes:
  - Continuous colormap by pressure
  - Discrete colormap by typhoon category/level
- Basic interactions:
  - Left mouse: pan
  - Right mouse: rotate
  - Toggle side panel, clear tracks

## Tech Stack
- Frontend
  - ECharts / ECharts-GL for 3D visualization
  - jQuery for DOM and AJAX
  - Bootstrap for UI
- Backend
  - Flask (Python) for serving pages and data

## Project Structure
```
├── data_all.json        # Typhoon data
├── server.py            # Flask backend
├── static/
│   └── main.js          # Frontend scripts
├── templates/
│   └── index.html       # Main page
└── transjson.py         # Data conversion helper
```

## Getting Started
1) Install Python dependencies:
```bash
pip install flask
```

2) Run the development server:
```bash
python server.py
```

3) Open the app:
- http://127.0.0.1:5000

## Data Format
The typhoon dataset is provided in `data_all.json`. Each record encodes:
```text
[longitude, latitude, pressure_hPa, category_level, typhoon_name, datetime, wind_speed, sea_level_pressure_hPa]
```
Notes:
- Longitude/latitude are WGS84 coordinates.
- Datetime should be parseable by the client (e.g., ISO 8601 or “YYYY-MM-DD HH:mm”).
- Category/level is a discrete encoding used for segmented coloring.

## Screenshots
![3D tracks example](https://github.com/user-attachments/assets/84e93988-13a3-49be-b101-369bd53098d5)
![Mode comparison](https://github.com/user-attachments/assets/3bfb46dc-6c2a-4af9-b7e1-91ab8e15b019)

## Acknowledgments
- [ECharts](https://echarts.apache.org/) and ECharts-GL

## License and Usage
Copyright © 2025 QuadtreeW

This code is provided for academic research and educational purposes only.  
Any form of commercial use is strictly prohibited, including but not limited to use in commercial projects, products, services, or any system involving payment.
