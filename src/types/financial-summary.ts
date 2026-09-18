/** Nested money and return metrics for a listing. */
export interface FinancialSummary {
  noi: number;
  capRate: number;
  occupancyRate: number;
  /** Listed price amount — required whenever a financial summary is present. */
  askingPrice: number;
  /** Currency code for askingPrice and noi (for example USD). */
  currency: string;
}
