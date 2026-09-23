/**
 * SRI BHAGAVATHI SILVERS - CENTRAL PRICING CONFIGURATION
 * 
 * Configurable constants for calculating final customer-facing silver prices per gram.
 * Modify makingChargePerGram, purity, or gstRate here centrally.
 */
export const SILVER_PRICING = {
  /** Target selling purity (e.g. 925 for sterling silver) */
  purity: 925,

  /** Applicable GST rate (3% GST) */
  gstRate: 0.03,

  /** Configurable making / handling charge per gram in INR */
  makingChargePerGram: 50,
};

export interface FinalPriceCalculationParams {
  silverRate999: number;
  purity?: number;
  makingChargePerGram?: number;
  gstRate?: number;
}

/**
 * Reusable server-side function to calculate final customer-facing silver price per gram
 * 
 * Formula:
 * 1. silverPricePerGram925 = silverRate999 * (purity / 999)
 * 2. taxableAmount = silverPricePerGram925 + makingChargePerGram
 * 3. finalPrice = (taxableAmount * (1 + gstRate))
 * 4. Rounded to 2 decimal places
 */
export function calculateFinalSilverPrice({
  silverRate999,
  purity = SILVER_PRICING.purity,
  makingChargePerGram = SILVER_PRICING.makingChargePerGram,
  gstRate = SILVER_PRICING.gstRate,
}: FinalPriceCalculationParams): number {
  const silverPricePerGramSellingPurity = silverRate999 * (purity / 999);
  const taxableAmount = silverPricePerGramSellingPurity + makingChargePerGram;
  const finalPriceRaw = taxableAmount * (1 + gstRate);

  // Round to 2 decimal places for customer display
  return Math.round(finalPriceRaw * 100) / 100;
}
