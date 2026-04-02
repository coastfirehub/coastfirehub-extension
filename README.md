<div align="center">

# Coast FIRE Hub - Chrome Extension

**A free, source-available browser extension that puts your Coast FIRE calculator one click away.**

[![Chrome Web Store](https://img.shields.io/badge/Chrome-Extension-green?logo=googlechrome&logoColor=white)](https://coastfirehub.com)
[![License: CC BY-ND 4.0](https://img.shields.io/badge/License-CC%20BY--ND%204.0-lightgrey.svg)](LICENSE)
[![Website](https://img.shields.io/badge/Website-coastfirehub.com-orange)](https://coastfirehub.com)

[🌐 Visit CoastFIRE Hub](https://coastfirehub.com) · [📊 Full Calculator](https://coastfirehub.com) · [🐛 Report Bug](../../issues)

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

This project is **source-available** but **not open for modifications**. You are welcome to:

- ⭐ Star this repository
- 📥 Download and use the extension for personal, non-commercial purposes
- 🐛 Report bugs via [Issues](../../issues)
- 💡 Suggest features via [Issues](../../issues)

**Modifying, forking, or redistributing altered versions of this code is not permitted.**
See [LICENSE](LICENSE) for full terms.

## Roadmap

- [x] Phase 1 — Core Coast FIRE calculator (current)
- [ ] Phase 2 — Progress tracking & history
- [ ] Phase 3 — Content feed & FIRE community insights
- [ ] Phase 4 — Advanced analytics & projections

## License

This project is licensed under **CC BY-ND 4.0** (Creative Commons Attribution-NoDerivatives 4.0).

- You **can** download, view, and use this code for personal reference
- You **must** give credit to CoastFIRE Hub if you reference this work
- You **cannot** modify, fork, or redistribute altered versions
- Commercial use is **not permitted** without written consent

See [LICENSE](LICENSE) for full details.

## Links

- 🌐 **Website**: [coastfirehub.com](https://coastfirehub.com)
- 📊 **Full Calculator**: [coastfirehub.com](https://coastfirehub.com)
- 💬 **Community**: [Reddit r/financialindependence](https://www.reddit.com/r/financialindependence/)

---

<div align="center">

**Built with ❤️ by the [CoastFIRE Hub](https://coastfirehub.com) team**

*Calculate your freedom. Coast to retirement.*

</div>
