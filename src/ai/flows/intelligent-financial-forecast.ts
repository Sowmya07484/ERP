'use server';
/**
 * @fileOverview A Genkit flow for the Intelligent Financial Forecast Tool.
 *
 * - intelligentFinancialForecast - A function that analyzes financial data to predict cash flow and recommend procurement schedules.
 * - IntelligentFinancialForecastInput - The input type for the intelligentFinancialForecast function.
 * - IntelligentFinancialForecastOutput - The return type for the intelligentFinancialForecast function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// --- Input Schema ---
const IntelligentFinancialForecastInputSchema = z.object({
  ledgerHistory: z.array(
    z.object({
      date: z.string().describe('Date of the ledger entry (YYYY-MM-DD).'),
      account: z.string().describe('Account name (e.g., Sales, Cash, Inventory).'),
      debit: z.number().optional().describe('Debit amount for the entry.'),
      credit: z.number().optional().describe('Credit amount for the entry.'),
      reference: z.string().optional().describe('Reference for the transaction.'),
    })
  ).describe('Historical ledger data for financial analysis.'),
  salesTrends: z.array(
    z.object({
      date: z.string().describe('Date of the sales record (YYYY-MM-DD).'),
      productName: z.string().describe('Name of the product sold.'),
      quantitySold: z.number().describe('Quantity of the product sold.'),
      totalAmount: z.number().describe('Total sales amount for this record.'),
    })
  ).describe('Historical sales trend data.'),
  inventoryLevels: z.array(
    z.object({
      materialName: z.string().describe('Name of the raw material.'),
      currentStock: z.number().describe('Current stock quantity.'),
      minimumQuantity: z.number().describe('Minimum required stock quantity.'),
      reorderQuantity: z.number().describe('Recommended reorder quantity when stock is low.'),
    })
  ).describe('Current and historical inventory levels for raw materials.'),
  forecastPeriodMonths: z.number().min(1).default(3).describe('Number of months for the financial forecast.'),
});

export type IntelligentFinancialForecastInput = z.infer<typeof IntelligentFinancialForecastInputSchema>;

// --- Output Schema ---
const IntelligentFinancialForecastOutputSchema = z.object({
  cashFlowPrediction: z.string().describe('A detailed prediction of future cash flow for the specified period, highlighting expected inflows and outflows.'),
  procurementRecommendations: z.array(
    z.object({
      materialName: z.string().describe('Name of the raw material recommended for procurement.'),
      recommendedQuantity: z.number().describe('Recommended quantity to procure.'),
      suggestedProcurementDate: z.string().describe('Suggested date for initiating procurement (YYYY-MM-DD).'),
      reasoning: z.string().describe('Explanation for the procurement recommendation based on inventory, sales, and lead times.'),
    })
  ).describe('Recommendations for procurement schedules to optimize inventory and meet future demand.'),
});

export type IntelligentFinancialForecastOutput = z.infer<typeof IntelligentFinancialForecastOutputSchema>;

// --- Prompt Definition ---
const prompt = ai.definePrompt({
  name: 'intelligentFinancialForecastPrompt',
  input: { schema: IntelligentFinancialForecastInputSchema },
  output: { schema: IntelligentFinancialForecastOutputSchema },
  prompt: `You are an expert financial analyst and supply chain strategist for an ERP system. Your task is to analyze historical financial data, sales trends, and inventory levels to predict future cash flow and provide proactive procurement schedule recommendations.

Here is the data for your analysis:

--- Historical Ledger Data ---
\`\`\`json
{{{json ledgerHistory}}}
\`\`\`

--- Sales Trends Data ---
\`\`\`json
{{{json salesTrends}}}
\`\`\`

--- Inventory Levels Data ---
\`\`\`json
{{{json inventoryLevels}}}
\`\`\`

--- Forecast Period ---
Forecast for the next {{forecastPeriodMonths}} months.

Based on the provided data, perform the following:
1.  **Analyze** the patterns in ledger history to understand income and expense fluctuations.
2.  **Analyze** sales trends to project future demand for products, considering any seasonalities or growth patterns.
3.  **Evaluate** current inventory levels against projected demand and minimum stock requirements.
4.  **Predict** future cash flow for the next {{forecastPeriodMonths}} months, highlighting potential surpluses or deficits.
5.  **Recommend** specific procurement schedules for raw materials that are likely to fall below minimum stock or are needed for projected sales, including quantities and ideal procurement dates. Provide reasoning for each recommendation.

Ensure your output is a JSON object matching the specified schema, directly providing the cash flow prediction and an array of procurement recommendations.`
});

// --- Flow Definition ---
const intelligentFinancialForecastFlow = ai.defineFlow(
  {
    name: 'intelligentFinancialForecastFlow',
    inputSchema: IntelligentFinancialForecastInputSchema,
    outputSchema: IntelligentFinancialForecastOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

// --- Wrapper Function ---
export async function intelligentFinancialForecast(
  input: IntelligentFinancialForecastInput
): Promise<IntelligentFinancialForecastOutput> {
  return intelligentFinancialForecastFlow(input);
}
