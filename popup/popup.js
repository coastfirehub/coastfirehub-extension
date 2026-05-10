/**
 * CoastFIRE Hub Chrome Extension – popup.js
 * Phase 1 MVP
 *
 * 职责：
 * 1. 从 chrome.storage 读取持久化的输入值
 * 2. 监听所有滑块的 input 事件，实时计算并更新 UI
 * 3. 将输入值持久化到 chrome.storage
 * 4. 处理 Advanced Settings 的展开/收起
 * 5. 处理 CTA 按钮点击，跳转主站（携带参数 + UTM）
 */

'use strict';

// ─── 常量 ───────────────────────────────────────────────────────────────────

const DEFAULTS = {
  currentAge:       35,
  retirementAge:    65,
  annualSpending:   60000,
  currentAssets:    185000,
  // Advanced（默认值，用户可修改）
  investmentReturn: 10,     // 名义回报率 %
  inflationRate:    3,      // 通胀率 %
  investmentFees:   0,      // 默认0%，用户可在 Advanced Settings 自定义
  swr:              4,      // 安全提取率 %
};

const STORAGE_KEY = 'coastfire_inputs_v1';

const UTM = 'utm_source=extension&utm_medium=popup&utm_campaign=coast-calc-v1';

// ─── 状态 ────────────────────────────────────────────────────────────────────

let state = { ...DEFAULTS };

// ─── DOM 引用 ────────────────────────────────────────────────────────────────

const els = {
  // 滑块
  sliderAge:       document.getElementById('slider-age'),
  sliderRet:       document.getElementById('slider-ret'),
  sliderSpend:     document.getElementById('slider-spend'),
  sliderAssets:    document.getElementById('slider-assets'),
  sliderReturn:    document.getElementById('slider-return'),
  sliderInflation: document.getElementById('slider-inflation'),
  sliderSwr:       document.getElementById('slider-swr'),

  // 显示值
  displayAge:       document.getElementById('display-age'),
  displayRet:       document.getElementById('display-ret'),
  displaySpend:     document.getElementById('display-spend'),
  displayAssets:    document.getElementById('display-assets'),
  displayReturn:    document.getElementById('display-return'),
  displayInflation: document.getElementById('display-inflation'),
  displaySwr:       document.getElementById('display-swr'),

  // 结果区域
  resultNumber:  document.getElementById('result-number'),
  resultMeta:    document.getElementById('result-meta'),
  resultPct:     document.getElementById('result-pct'),
  progressFill:  document.getElementById('progress-fill'),
  statusBadge:   document.getElementById('status-badge'),
  statusText:    document.getElementById('status-text'),

  // 控件
  advancedToggle: document.getElementById('advanced-toggle'),
  advancedPanel:  document.getElementById('advanced-panel'),
  btnOpenSite:    document.getElementById('btn-open-site'),
};

// ─── 计算核心（与主站 lib/calculations.ts 保持一致）────────────────────────────

function calculateCoastFIRE(s) {
  const nominalReturn = s.investmentReturn / 100;
  const inflation     = s.inflationRate    / 100;
  const fees          = s.investmentFees   / 100;
  const swr           = s.swr              / 100;

  // 实际回报率（通胀调整后，含手续费）
  // realReturn = nominalReturn - inflation - fees
  // 默认: 0.10 - 0.03 - 0 = 0.07 = 7%
  const realReturn = nominalReturn - inflation - fees;

  const years = s.retirementAge - s.currentAge;

  if (years <= 0) {
    return { error: 'Retirement age must be greater than current age.' };
  }
  if (s.annualSpending <= 0) {
    return { error: 'Annual spending must be greater than 0.' };
  }

  const fireNumber  = s.annualSpending / swr;
  const coastNumber = fireNumber / Math.pow(1 + realReturn, years);

  const ratio           = s.currentAssets / coastNumber;
  const progressPercent = Math.min(Math.round(ratio * 100), 999);
  const hasReachedCoast = s.currentAssets >= coastNumber;
  const gapAmount       = Math.max(coastNumber - s.currentAssets, 0);

  return {
    fireNumber,
    coastNumber,
    progressPercent,
    hasReachedCoast,
    gapAmount,
    realReturn,
  };
}

// ─── 格式化 ──────────────────────────────────────────────────────────────────

function formatCurrency(amount) {
  return '$' + Math.round(amount).toLocaleString('en-US');
}

function formatPercent(value, decimals = 1) {
  return value.toFixed(decimals) + '%';
}

// ─── UI 更新 ─────────────────────────────────────────────────────────────────

function updateUI() {
  const result = calculateCoastFIRE(state);

  if (result.error) {
    els.resultNumber.textContent = '—';
    els.resultMeta.textContent   = result.error;
    return;
  }

  const { fireNumber, coastNumber, progressPercent, hasReachedCoast, gapAmount, realReturn } = result;

  // 结果卡片
  els.resultNumber.textContent = formatCurrency(coastNumber);
  els.resultMeta.textContent   =
    `FIRE Target: ${formatCurrency(fireNumber)} · Real Return: ${formatPercent(realReturn * 100)}`;

  // 进度条
  const cappedPct = Math.min(progressPercent, 100);
  els.progressFill.style.width = cappedPct + '%';
  els.resultPct.textContent    = formatPercent(progressPercent, 0);

  if (hasReachedCoast) {
    els.resultPct.className    = 'progress-pct progress-pct--reached';
    els.progressFill.className = 'progress-fill';
  } else {
    els.resultPct.className    = 'progress-pct progress-pct--pending';
    els.progressFill.className = 'progress-fill progress-fill--pending';
  }

  // 状态徽章
  if (hasReachedCoast) {
    els.statusBadge.className = 'status-badge status-badge--reached';
    els.statusText.textContent =
      "You've reached Coast FIRE! You can stop saving aggressively.";
  } else {
    els.statusBadge.className = 'status-badge status-badge--pending';
    els.statusText.textContent =
      `You need ${formatCurrency(gapAmount)} more to reach Coast FIRE.`;
  }

  // ARIA progressbar 更新
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    progressBar.setAttribute('aria-valuenow', Math.min(progressPercent, 100).toString());
  }
}

// ─── 滑块配置 ────────────────────────────────────────────────────────────────

const SLIDER_CONFIG = [
  {
    el:      els.sliderAge,
    display: els.displayAge,
    key:     'currentAge',
    format:  v => String(v),
  },
  {
    el:      els.sliderRet,
    display: els.displayRet,
    key:     'retirementAge',
    format:  v => String(v),
  },
  {
    el:      els.sliderSpend,
    display: els.displaySpend,
    key:     'annualSpending',
    format:  v => '$' + Number(v).toLocaleString('en-US'),
  },
  {
    el:      els.sliderAssets,
    display: els.displayAssets,
    key:     'currentAssets',
    format:  v => '$' + Number(v).toLocaleString('en-US'),
  },
  {
    el:      els.sliderReturn,
    display: els.displayReturn,
    key:     'investmentReturn',
    format:  v => v + '%',
  },
  {
    el:      els.sliderInflation,
    display: els.displayInflation,
    key:     'inflationRate',
    format:  v => v + '%',
  },
  {
    el:      els.sliderSwr,
    display: els.displaySwr,
    key:     'swr',
    format:  v => v + '%',
  },
];

// ─── 事件绑定 ────────────────────────────────────────────────────────────────

function bindSliders() {
  SLIDER_CONFIG.forEach(({ el, display, key, format }) => {
    if (!el) return;

    el.addEventListener('input', () => {
      const val = parseFloat(el.value);
      state[key] = val;
      display.textContent = format(val);
      updateUI();
      saveState();
    });
  });
}

function bindAdvancedToggle() {
  if (!els.advancedToggle || !els.advancedPanel) return;

  els.advancedToggle.addEventListener('click', () => {
    const isOpen = els.advancedPanel.classList.contains('is-open');

    if (isOpen) {
      els.advancedPanel.classList.remove('is-open');
      els.advancedPanel.setAttribute('aria-hidden', 'true');
      els.advancedToggle.setAttribute('aria-expanded', 'false');
    } else {
      els.advancedPanel.classList.add('is-open');
      els.advancedPanel.setAttribute('aria-hidden', 'false');
      els.advancedToggle.setAttribute('aria-expanded', 'true');
    }
  });
}

// ── Toast 通知 ──────────────────────────────────────────────────────────────────────
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.remove('is-visible');
  // 触发 reflow 以重置 transition
  void toast.offsetWidth;
  toast.classList.add('is-visible');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('is-visible'), 2000);
}

// ── 绑定灰色 Tab 点击 ──────────────────────────────────────────────────────────────
function bindDisabledTabs() {
  document.querySelectorAll('.tab--disabled').forEach(tab => {
    tab.addEventListener('click', () => {
      showToast('Coming in Phase 2');
    });
  });
}

function bindCTA() {
  if (!els.btnOpenSite) return;

  els.btnOpenSite.addEventListener('click', () => {
    const params = new URLSearchParams({
      age:      Math.round(state.currentAge).toString(),
      ret:      Math.round(state.retirementAge).toString(),
      spending: Math.round(state.annualSpending).toString(),
      assets:   Math.round(state.currentAssets).toString(),
      // Advanced 参数也传入，确保主站使用相同值
      return:   state.investmentReturn.toString(),
      inflation: state.inflationRate.toString(),
      swr:      state.swr.toString(),
      fees:     state.investmentFees.toString(),
    });

    const url = `https://coastfirehub.com/?${params.toString()}&${UTM}`;

    // 使用 window.open 避免申请 tabs 权限
    window.open(url, '_blank');
  });
}

// ─── 状态持久化 ──────────────────────────────────────────────────────────────

function saveState() {
  chrome.storage.local.set({ [STORAGE_KEY]: state }, () => {
    if (chrome.runtime.lastError) {
      console.warn('CoastFIRE: storage save error', chrome.runtime.lastError);
    }
  });
}

function loadState(callback) {
  chrome.storage.local.get(STORAGE_KEY, (result) => {
    if (chrome.runtime.lastError) {
      console.warn('CoastFIRE: storage load error', chrome.runtime.lastError);
      callback(DEFAULTS);
      return;
    }
    const saved = result[STORAGE_KEY];
    // 合并 saved 和 DEFAULTS，确保新字段有默认值
    callback(saved ? { ...DEFAULTS, ...saved } : DEFAULTS);
  });
}

// ─── DOM 同步 ────────────────────────────────────────────────────────────────

function syncDOMFromState() {
  SLIDER_CONFIG.forEach(({ el, display, key, format }) => {
    if (!el) return;
    el.value = state[key];
    display.textContent = format(state[key]);
  });
}

// ─── 初始化 ──────────────────────────────────────────────────────────────────

function init() {
  loadState((savedState) => {
    state = savedState;
    syncDOMFromState();
    updateUI();
    bindSliders();
    bindAdvancedToggle();
    bindDisabledTabs();
    bindCTA();
  });
}

// 等待 DOM 完全加载后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
