/* One source for plan numbers, so the landing, /pricing and the API limits
   stop drifting. Pro is one flat price for the whole team (Stripe quantity 1). */
export const FREE_LIMITS = { boards: 3, membersPerBoard: 3 } as const;
export const PRO_PRICE = { annualPerMonth: 10, annualTotal: 120, monthly: 12 } as const; // USD
