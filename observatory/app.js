(() => {
  'use strict';

  const lang = document.body.dataset.lang === 'es' ? 'es-US' : 'en-US';
  const isSpanish = document.body.dataset.lang === 'es';
  const whole = new Intl.NumberFormat(lang, { maximumFractionDigits: 0 });
  const percent = new Intl.NumberFormat(lang, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const currency = new Intl.NumberFormat(lang, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const VA_BUDGET = 488200000000;

  const numberValue = (id) => {
    const element = document.getElementById(id);
    if (!element) return NaN;
    return Number(element.value);
  };

  const setText = (selector, value) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  };

  const validPositive = (...values) => values.every((value) => Number.isFinite(value) && value > 0);

  function updateCapacity() {
    const receipts = numberValue('annual-receipts');
    const production = numberValue('planned-production');
    const target = numberValue('target-utilization');
    const reduction = numberValue('inventory-reduction');
    const productivity = numberValue('marginal-productivity');
    const cost = numberValue('loaded-cost');

    if (!validPositive(receipts, production, target, productivity, cost) || reduction < 0 || target >= 100) {
      document.getElementById('capacity-results')?.setAttribute('data-invalid', 'true');
      return;
    }

    const plannedUtilization = receipts / production * 100;
    const requiredCapacity = receipts / (target / 100) + reduction;
    const additionalCapacity = Math.max(0, requiredCapacity - production);
    const additionalFte = Math.ceil(additionalCapacity / productivity);
    const annualCost = additionalFte * cost;
    const budgetShare = annualCost / VA_BUDGET * 100;

    setText('[data-capacity-output="planned-utilization"]', `${percent.format(plannedUtilization)}%`);
    setText('[data-capacity-output="required-capacity"]', whole.format(Math.ceil(requiredCapacity)));
    setText('[data-capacity-output="additional-capacity"]', whole.format(Math.ceil(additionalCapacity)));
    setText('[data-capacity-output="additional-fte"]', whole.format(additionalFte));
    setText('[data-capacity-output="annual-cost"]', currency.format(annualCost));
    setText('[data-capacity-output="budget-share"]', `${percent.format(budgetShare)}%`);
    document.getElementById('capacity-results')?.removeAttribute('data-invalid');
  }

  function updateClaimant() {
    const receipts = numberValue('rating-receipts');
    const share = numberValue('intensive-share');
    const casesPerProfessional = numberValue('cases-per-professional');
    const professionalCost = numberValue('professional-cost');

    if (!validPositive(receipts, share, casesPerProfessional, professionalCost) || share > 100) return;

    const intensiveMatters = receipts * share / 100;
    const professionals = Math.ceil(intensiveMatters / casesPerProfessional);
    const annualCost = professionals * professionalCost;
    const budgetShare = annualCost / VA_BUDGET * 100;

    setText('[data-claimant-output="intensive-matters"]', whole.format(Math.ceil(intensiveMatters)));
    setText('[data-claimant-output="professionals"]', whole.format(professionals));
    setText('[data-claimant-output="annual-cost"]', currency.format(annualCost));
    setText('[data-claimant-output="budget-share"]', `${percent.format(budgetShare)}%`);
  }

  function updateAiTable() {
    const query = (document.getElementById('ai-search')?.value || '').trim().toLowerCase();
    const stage = document.getElementById('ai-stage')?.value || '';
    const impact = document.getElementById('ai-impact')?.value || '';
    const rows = [...document.querySelectorAll('[data-ai-row]')];
    let visible = 0;

    rows.forEach((row) => {
      const matchesQuery = !query || (row.dataset.search || '').includes(query);
      const matchesStage = !stage || row.dataset.stage === stage;
      const matchesImpact = !impact || row.dataset.impact === impact;
      const show = matchesQuery && matchesStage && matchesImpact;
      row.hidden = !show;
      if (show) visible += 1;
    });

    const count = document.getElementById('ai-count');
    if (count) {
      count.textContent = isSpanish
        ? `Mostrando ${whole.format(visible)} de 27 casos de uso de VBA.`
        : `Showing ${whole.format(visible)} of 27 VBA use cases.`;
    }
  }

  const capacityForm = document.getElementById('capacity-form');
  const claimantForm = document.getElementById('claimant-form');
  capacityForm?.addEventListener('input', updateCapacity);
  capacityForm?.addEventListener('reset', () => window.setTimeout(updateCapacity, 0));
  claimantForm?.addEventListener('input', updateClaimant);
  document.getElementById('ai-search')?.addEventListener('input', updateAiTable);
  document.getElementById('ai-stage')?.addEventListener('change', updateAiTable);
  document.getElementById('ai-impact')?.addEventListener('change', updateAiTable);

  updateCapacity();
  updateClaimant();
  updateAiTable();
})();
