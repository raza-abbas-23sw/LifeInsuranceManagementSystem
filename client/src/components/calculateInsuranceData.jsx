import React, { useState } from 'react';

// Rate table data
 const rateTable = [
    { age: 20, '03/20': 47.73, '03/15': 64.44, '03/10': 99.04,  '81/20': 106.03,  'TAKAFUL_ENDOW_20': 46.98, 'TAKAFUL_ENDOW_15': 68.57, 'TAKAFUL_GOLDEN': 105.44, 'PLA': 279.48 },
    { age: 21, '03/20': 47.77, '03/15': 64.47, '03/10': 99.07,  '81/20': 106.07,  'TAKAFUL_ENDOW_20': 47.01, 'TAKAFUL_ENDOW_15': 68.60, 'TAKAFUL_GOLDEN': 105.48, 'PLA': 279.51 },
    { age: 22, '03/20': 47.82, '03/15': 64.51, '03/10': 99.10,  '81/20': 106.14,  'TAKAFUL_ENDOW_20': 47.04, 'TAKAFUL_ENDOW_15': 68.62, 'TAKAFUL_GOLDEN': 105.52, 'PLA': 279.55 },
    { age: 23, '03/20': 47.87, '03/15': 64.55, '03/10': 99.13,  '81/20': 106.20,  'TAKAFUL_ENDOW_20': 47.08, 'TAKAFUL_ENDOW_15': 68.65, 'TAKAFUL_GOLDEN': 105.55, 'PLA': 279.58 },
    { age: 24, '03/20': 47.93, '03/15': 64.59, '03/10': 99.16,  '81/20': 106.28,  'TAKAFUL_ENDOW_20': 47.12, 'TAKAFUL_ENDOW_15': 68.68, 'TAKAFUL_GOLDEN': 105.61, 'PLA': 279.61 },
    { age: 25, '03/20': 47.99, '03/15': 64.63, '03/10': 99.20,  '81/20': 106.35,  'TAKAFUL_ENDOW_20': 47.17, 'TAKAFUL_ENDOW_15': 68.71, 'TAKAFUL_GOLDEN': 105.68, 'PLA': 279.67 },
    { age: 26, '03/20': 48.05, '03/15': 64.68, '03/10': 99.24,  '81/20': 106.41,  'TAKAFUL_ENDOW_20': 47.22, 'TAKAFUL_ENDOW_15': 68.75, 'TAKAFUL_GOLDEN': 105.74, 'PLA': 279.69 },
    { age: 27, '03/20': 48.13, '03/15': 64.74, '03/10': 99.28,  '81/20': 106.51,  'TAKAFUL_ENDOW_20': 47.28, 'TAKAFUL_ENDOW_15': 68.80, 'TAKAFUL_GOLDEN': 105.82, 'PLA': 279.75 },
    { age: 28, '03/20': 48.22, '03/15': 64.80, '03/10': 99.32,  '81/20': 106.62,  'TAKAFUL_ENDOW_20': 47.35, 'TAKAFUL_ENDOW_15': 68.85, 'TAKAFUL_GOLDEN': 105.91, 'PLA': 279.79 },
    { age: 29, '03/20': 48.31, '03/15': 64.87, '03/10': 99.37,  '81/20': 106.72,  'TAKAFUL_ENDOW_20': 47.43, 'TAKAFUL_ENDOW_15': 68.91, 'TAKAFUL_GOLDEN': 106.00, 'PLA': 279.84 },
    { age: 30, '03/20': 48.42, '03/15': 64.95, '03/10': 99.43,  '81/20': 106.85,  'TAKAFUL_ENDOW_20': 47.53, 'TAKAFUL_ENDOW_15': 68.98, 'TAKAFUL_GOLDEN': 106.12, 'PLA': 279.91 },
    { age: 31, '03/20': 48.54, '03/15': 65.03, '03/10': 99.49,  '81/20': 106.99,  'TAKAFUL_ENDOW_20': 47.63, 'TAKAFUL_ENDOW_15': 69.06, 'TAKAFUL_GOLDEN': 106.25, 'PLA': 279.98 },
    { age: 32, '03/20': 48.67, '03/15': 65.13, '03/10': 99.56,  '81/20': 107.13,  'TAKAFUL_ENDOW_20': 47.75, 'TAKAFUL_ENDOW_15': 69.15, 'TAKAFUL_GOLDEN': 106.39, 'PLA': 280.05 },
    { age: 33, '03/20': 48.83, '03/15': 65.24, '03/10': 99.64,  '81/20': 107.32,  'TAKAFUL_ENDOW_20': 47.69, 'TAKAFUL_ENDOW_15': 69.25, 'TAKAFUL_GOLDEN': 106.56, 'PLA': 280.14 },
    { age: 34, '03/20': 49.00, '03/15': 65.36, '03/10': 99.72,  '81/20': 107.50,  'TAKAFUL_ENDOW_20': 48.04, 'TAKAFUL_ENDOW_15': 69.36, 'TAKAFUL_GOLDEN': 106.75, 'PLA': 280.21 },
    { age: 35, '03/20': 49.20, '03/15': 65.50, '03/10': 99.82,  '81/20': 107.73,  'TAKAFUL_ENDOW_20': 48.22, 'TAKAFUL_ENDOW_15': 69.50, 'TAKAFUL_GOLDEN': 106.97, 'PLA': 280.33 },
    { age: 36, '03/20': 49.43, '03/15': 65.65, '03/10': 99.93,  '81/20': 107.99,  'TAKAFUL_ENDOW_20': 48.41, 'TAKAFUL_ENDOW_15': 69.65, 'TAKAFUL_GOLDEN': 107.22, 'PLA': 280.44 },
    { age: 37, '03/20': 49.69, '03/15': 65.84, '03/10': 100.06,  '81/20': 108.28,  'TAKAFUL_ENDOW_20': 48.64, 'TAKAFUL_ENDOW_15': 69.82, 'TAKAFUL_GOLDEN': 107.49, 'PLA': 280.59 },
    { age: 38, '03/20': 49.99, '03/15': 66.04, '03/10': 100.20,  '81/20': 108.61,  'TAKAFUL_ENDOW_20': 48.69, 'TAKAFUL_ENDOW_15': 70.02, 'TAKAFUL_GOLDEN': 107.79, 'PLA': 280.73 },
    { age: 39, '03/20': 50.32, '03/15': 66.28, '03/10': 100.36,  '81/20': 108.97,  'TAKAFUL_ENDOW_20': 49.18, 'TAKAFUL_ENDOW_15': 70.24, 'TAKAFUL_GOLDEN': 108.16, 'PLA': 280.89 },
    { age: 40, '03/20': 50.71, '03/15': 66.54, '03/10': 100.55,  '81/20': 109.41,  'TAKAFUL_ENDOW_20': 49.50, 'TAKAFUL_ENDOW_15': 70.49, 'TAKAFUL_GOLDEN': 108.54, 'PLA': 281.10 },
    { age: 41, '03/20': 51.14, '03/15': 66.85, '03/10': 100.76,  '81/20': 109.87,  'TAKAFUL_ENDOW_20': 49.86, 'TAKAFUL_ENDOW_15': 70.78, 'TAKAFUL_GOLDEN': 108.97, 'PLA': 281.31 },
    { age: 42, '03/20': 51.63, '03/15': 67.21, '03/10': 101.00,  '81/20': 110.41,   'TAKAFUL_ENDOW_20': 50.26, 'TAKAFUL_ENDOW_15': 71.10, 'TAKAFUL_GOLDEN': 109.46, 'PLA': 281.58 },
    { age: 43, '03/20': 52.17, '03/15': 67.61, '03/10': 101.28,  '81/20': 110.98,   'TAKAFUL_ENDOW_20': 50.70, 'TAKAFUL_ENDOW_15': 71.47, 'TAKAFUL_GOLDEN': 110.00, 'PLA': 281.87 },
    { age: 44, '03/20': 52.79, '03/15': 68.07, '03/10': 101.61,  '81/20': 111.66,   'TAKAFUL_ENDOW_20': 51.20, 'TAKAFUL_ENDOW_15': 71.87, 'TAKAFUL_GOLDEN': 110.58, 'PLA': 282.20 },
    { age: 45, '03/20': 53.47, '03/15': 68.59, '03/10': 101.97,  '81/20': 112.38,   'TAKAFUL_ENDOW_20': 51.74, 'TAKAFUL_ENDOW_15': 72.32, 'TAKAFUL_GOLDEN': 111.23, 'PLA': 282.58 },
    { age: 46, '03/20': 54.23, '03/15': 69.18, '03/10': 102.40,  '81/20': 113.20,   'TAKAFUL_ENDOW_20': 52.33, 'TAKAFUL_ENDOW_15': 72.83, 'TAKAFUL_GOLDEN': 111.94, 'PLA': 283.01 },
    { age: 47, '03/20': 55.07, '03/15': 69.84, '03/10': 102.88,  '81/20': 114.10,   'TAKAFUL_ENDOW_20': 52.97, 'TAKAFUL_ENDOW_15': 73.38, 'TAKAFUL_GOLDEN': 112.70, 'PLA': 283.52 },
    { age: 48, '03/20': 56.00, '03/15': 70.58, '03/10': 103.44,  '81/20': 115.10,   'TAKAFUL_ENDOW_20': 53.67, 'TAKAFUL_ENDOW_15': 73.99, 'TAKAFUL_GOLDEN': 113.51, 'PLA': 284.07 },
    { age: 49, '03/20': 57.02, '03/15': 71.41, '03/10': 104.07,  '81/20': 116.19,  'TAKAFUL_ENDOW_20': 54.42, 'TAKAFUL_ENDOW_15': 74.66, 'TAKAFUL_GOLDEN': 114.37, 'PLA': 284.72 },
    { age: 50, '03/20': 58.13, '03/15': 72.32, '03/10': 105.57,  '81/20': 117.37,  'TAKAFUL_ENDOW_20': 55.23, 'TAKAFUL_ENDOW_15': 75.38, 'TAKAFUL_GOLDEN': 115.32,  'PLA': 285.44 },
    { age: 51, '03/20': 59.35, '03/15': 73.32, '03/10': 106.44, '81/20': 118.68,  'TAKAFUL_ENDOW_20': 56.09, 'TAKAFUL_ENDOW_15': 76.16, 'TAKAFUL_GOLDEN': 116.30,  'PLA': 286.28 },
    { age: 52, '03/20': 60.66, '03/15': 74.41, '03/10': 107.39, '81/20': 120.07,  'TAKAFUL_ENDOW_20': 57.01, 'TAKAFUL_ENDOW_15': 77.00, 'TAKAFUL_GOLDEN': 117.36,  'PLA': 287.18 },
    { age: 53, '03/20': 62.09, '03/15': 75.59, '03/10': 108.43, '81/20': 121.59,  'TAKAFUL_ENDOW_20': 58.00, 'TAKAFUL_ENDOW_15': 77.89, 'TAKAFUL_GOLDEN': 118.48,  'PLA': 288.18 },
    { age: 54, '03/20': 63.62, '03/15': 76.86, '03/10': 109.54, '81/20': 123.19,  'TAKAFUL_ENDOW_20': 59.05, 'TAKAFUL_ENDOW_15': 78.83, 'TAKAFUL_GOLDEN': 119.66,  'PLA': 289.27 },
    { age: 55, '03/20': 65.27, '03/15': 78.23, '03/10': 110.72, '81/20': 124.90,  'TAKAFUL_ENDOW_20': 60.18, 'TAKAFUL_ENDOW_15': 79.81, 'TAKAFUL_GOLDEN': 120.88,  'PLA': 290.43 },
    { age: 56, '03/20': null, '03/15': 79.69, '03/10': 111.99, '81/20': null,   'TAKAFUL_ENDOW_20': null, 'TAKAFUL_ENDOW_15': 80.85, 'TAKAFUL_GOLDEN': null, 'PLA': 291.67 },
    { age: 57, '03/20': null, '03/15': 81.25, '03/10': 113.32, '81/20': null,   'TAKAFUL_ENDOW_20': null, 'TAKAFUL_ENDOW_15': 81.94, 'TAKAFUL_GOLDEN': null, 'PLA': 292.98 },
    { age: 58, '03/20': null, '03/15': null, '03/10': 114.74, '81/20': null,   'TAKAFUL_ENDOW_20': null, 'TAKAFUL_ENDOW_15': 83.09, 'TAKAFUL_GOLDEN': null, 'PLA': 294.37 },
    { age: 59, '03/20': null, '03/15': null, '03/10': 116.25, '81/20': null,   'TAKAFUL_ENDOW_20': null, 'TAKAFUL_ENDOW_15': 84.30, 'TAKAFUL_GOLDEN': null, 'PLA': 295.81 },
    { age: 60, '03/20': null, '03/15': null, '03/10': 117.88, '81/20': null,   'TAKAFUL_ENDOW_20': null, 'TAKAFUL_ENDOW_15': 85.60, 'TAKAFUL_GOLDEN': null, 'PLA': 297.32 }
  ];


const planTypes = [
  { value: '03/10', label: 'Standard (10 Years)' },
  { value: '03/15', label: 'Standard (15 Years)' },
  { value: '03/20', label: 'Standard (20 Years)' },
  { value: '81/20', label: 'Golden (20 Years)' },
  { value: 'PLA', label: 'Platinium (10 Years)' },
  { value: 'TAKAFUL_ENDOW_20', label: 'Takaful Endowment (10 Years)' },
  { value: 'TAKAFUL_ENDOW_15', label: 'Takaful Endowment  (15 Years)' },
  { value: 'TAKAFUL_GOLDEN', label: 'Takaful Golden Endowment ' },
];

// Main calculation function
export const calculateInsuranceData = (name, age, planType, sumAssured) => {
  // Validate inputs
  if (!name) throw new Error('Please enter client name');
  if (!age || age < 20 || age > 60) throw new Error('Age must be 20-60');
  if (!sumAssured || sumAssured <= 0) throw new Error('Enter valid sum assured');

  const adjustedAge = parseInt(age);
  const rateEntry = rateTable.find(item => item.age === adjustedAge);
  if (!rateEntry) throw new Error(`No rates for age ${adjustedAge}`);

  let rate = rateEntry[planType];
  if (rate === undefined || rate === null) throw new Error(`Plan not available for age ${adjustedAge}`);

  // Apply discount if sum assured is >= 300,000
  if (sumAssured >= 300000) rate = Math.max(0, rate - 0.5);

  // Calculate base premium
  const basePremium = (rate * sumAssured) / 1000 + 100;

  // Calculate bonuses
  const calculateBonuses = (sumAssured, planType) => {
    const regularBonusRates = {
      '03/10': [
        { period: 'Years 1-5', rate: 17, years: 5 },
        { period: 'Years 6-10', rate: 66, years: 5 }
      ],
      '03/15': [
        { period: 'Years 1-5', rate: 29, years: 5 },
        { period: 'Years 6-15', rate: 81, years: 10 }
      ],
      '03/20': [
        { period: 'Years 1-5', rate: 43, years: 5 },
        { period: 'Years 6-16', rate: 96, years: 11 },
        { period: 'Years 17-20', rate: 147, years: 4 }
      ],
      '81/20': [
        { period: 'Years 1-5', rate: 43, years: 5 },
        { period: 'Years 6-16', rate: 96, years: 11 },
        { period: 'Years 17-20', rate: 147, years: 4 }
      ]
    };

    const terminalBonusRates = {
      '03/15': { rate: 70, years: 5 },
      '03/20': { rate: 70, years: 10 },
      '81/20': { rate: 70, years: 10 }
    };

    // Calculate regular bonuses
    const regularBonuses = regularBonusRates[planType] || [];
    let totalRegularBonus = 0;
    const regularBreakdown = regularBonuses.map(item => {
      const bonus = (sumAssured / 1000) * item.rate * item.years;
      totalRegularBonus += bonus;
      return {
        type: 'Regular',
        period: item.period,
        rate: item.rate,
        years: item.years,
        bonus: Math.round(bonus)
      };
    });

    // Calculate terminal bonus
    let terminalBonus = 0;
    let terminalBreakdown = [];
    if (terminalBonusRates[planType]) {
      terminalBonus = (sumAssured / 1000) * terminalBonusRates[planType].rate * terminalBonusRates[planType].years;
      terminalBreakdown = [{
        type: 'Terminal',
        period: 'Final Years',
        rate: terminalBonusRates[planType].rate,
        years: terminalBonusRates[planType].years,
        bonus: Math.round(terminalBonus)
      }];
    }

    // Calculate loyalty terminal bonus
    const loyaltyBonus = 200 * (sumAssured / 1000);
    const loyaltyBreakdown = [{
      type: 'Loyalty',
      period: 'At Maturity',
      rate: 200,
      years: 1,
      bonus: Math.round(loyaltyBonus)
    }];

    const totalBonus = Math.round(totalRegularBonus + terminalBonus + loyaltyBonus);
    const allBonuses = [...regularBreakdown, ...terminalBreakdown, ...loyaltyBreakdown];
    const totalMaturity = sumAssured + totalBonus;

    return {
      totalBonus,
      totalMaturity,
      breakdown: allBonuses
    };
  };

  const bonuses = calculateBonuses(sumAssured, planType);

  // Return the data as an array of objects
  return [
    { key: 'name', label: 'Client Name', value: name },
    { key: 'age', label: 'Age', value: `${age} years` },
    { key: 'plan', label: 'Plan Type', value: planTypes.find(p => p.value === planType).label },
    { key: 'sumAssured', label: 'Sum Assured', value: `${sumAssured}` },
    { key: 'annualPremium', label: 'Annual Premium', value: `PKR ${Math.round(basePremium).toLocaleString('en-PK')}` },
    { key: 'totalMaturity', label: 'Total Maturity Value', value: `${bonuses.totalMaturity}` },
    ...bonuses.breakdown.map(bonus => ({
      key: `bonus-${bonus.type}-${bonus.period}`,
      label: `${bonus.type} Bonus (${bonus.period})`,
      value: ` ${bonus.bonus} `
    })),
    { key: 'totalBonus', label: 'Total Bonuses', value: `PKR ${bonuses.totalBonus.toLocaleString('en-PK')}` },
  ];
};