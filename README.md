<div align="center">

# Coast FIRE Hub - Chrome Extension

**A free, open-source browser extension that puts your Coast FIRE calculator one click away.**

[![Chrome Web Store](https://img.shields.io/badge/Chrome-Extension-green?logo=googlechrome&logoColor=white)](https://coastfirehub.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Website](https://img.shields.io/badge/Website-coastfirehub.com-orange)](https://coastfirehub.com)

[🌐 Visit CoastFIRE Hub](https://coastfirehub.com) · [📊 Full Calculator](https://coastfirehub.com) · [🐛 Report Bug](../../issues) · [✨ Request Feature](../../issues)

</div>

---

## What is Coast FIRE?

**Coast FIRE** is a financial independence strategy where you invest aggressively early on, then let compound growth do the rest. Once you reach your "Coast FIRE number," you no longer need to save for retirement — your existing investments will grow enough to fund your retirement by age 65.

This extension gives you a quick, always-accessible calculator right in your browser toolbar.

## Features

- **Instant Coast FIRE Calculation** — Adjust your age, spending, and investments with real-time sliders
- **Progress Tracking** — Visual progress bar showing how close you are to your Coast FIRE goal
- **Status Badge** — At-a-glance indicator of whether you've reached Coast FIRE
- **Advanced Parameters** — Customize expected returns, inflation rate, and safe withdrawal rate
- **Persistent Storage** — Your settings are saved between browser sessions
- **No Account Required** — Completely private, all data stays in your browser
- **Zero Dependencies** — Built with vanilla HTML, CSS, and JavaScript

## Screenshots

> *Coming soon — screenshots of the calculator popup*

## Installation

### From Source

1. Clone this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/coastfirehub-extension.git
   cd coastfirehub-extension
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable **Developer mode** (toggle in the top-right corner)

4. Click **Load unpacked** and select the project folder

5. The Coast FIRE Hub icon will appear in your browser toolbar — click it to start!

### From Chrome Web Store

> *Coming soon*

## How It Works

The calculator uses the Coast FIRE formula:

```
Coast FIRE Number = (Annual Spending / SWR) / (1 + Return Rate) ^ (Retirement Age - Current Age)
```

If your **Current Investments >= Coast FIRE Number**, you've reached Coast FIRE! Your investments will compound on their own to cover your retirement.

### Default Parameters

| Parameter | Default | Range |
|-----------|---------|-------|
| Current Age | 30 | 18–60 |
| Retirement Age | 65 | 45–80 |
| Annual Spending | $80,000 | $20k–$200k |
| Current Investments | $50,000 | $0–$2M |
| Investment Return | 7% | 4–15% |
| Inflation Rate | 3% | 1–8% |
| Safe Withdrawal Rate | 4% | 2–6% |

## Tech Stack

- **HTML5 / CSS3 / Vanilla JavaScript** — No frameworks, no dependencies
- **Chrome Extension Manifest V3** — Latest extension platform
- **Chrome Storage API** — For persisting user settings
- **Inter & JetBrains Mono** — Clean typography

## Project Structure

```
coastfirehub-extension/
├── manifest.json              # Extension manifest (MV3)
├── popup/
│   ├── index.html             # Popup UI layout
│   ├── popup.js               # Calculator logic & state
│   └── styles.css             # Styling & theming
├── _locales/en/
│   └── messages.json          # English localization
└── icons/                     # Extension icons (16–128px)
```

## Contributing

Contributions are welcome! This is an open-source project aimed at helping everyone on their FIRE journey.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Ideas for Contributions

- 🌐 Additional language support (i18n)
- 📊 Charts and visual analytics
- 📱 Progress tracking over time
- 🎨 Theme customization (dark mode, etc.)
- 🔔 Milestone notifications

## Roadmap

- [x] Phase 1 — Core Coast FIRE calculator (current)
- [ ] Phase 2 — Progress tracking & history
- [ ] Phase 3 — Content feed & FIRE community insights
- [ ] Phase 4 — Advanced analytics & projections

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## Links

- 🌐 **Website**: [coastfirehub.com](https://coastfirehub.com)
- 📊 **Full Calculator**: [coastfirehub.com](https://coastfirehub.com)
- 💬 **Community**: [Reddit r/financialindependence](https://www.reddit.com/r/financialindependence/)

---

<div align="center">

**Built with ❤️ by the [CoastFIRE Hub](https://coastfirehub.com) team**

*Calculate your freedom. Coast to retirement.*

</div>
