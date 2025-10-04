'use server';

/**
 * @fileOverview Provides a GenAI-powered summary of trending products in a specific region.
 *
 * - trendingProductsSummary - A function that generates a summary of trending products.
 * - TrendingProductsSummaryInput - The input type for the trendingProductsSummary function, including region.
 * - TrendingProductsSummaryOutput - The return type for the trendingProductsSummary function, providing the summary.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TrendingProductsSummaryInputSchema = z.object({
  region: z.string().describe('The region for which to summarize trending products.'),
});
export type TrendingProductsSummaryInput = z.infer<typeof TrendingProductsSummaryInputSchema>;

const TrendingProductsSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of the trending products in the specified region.'),
});
export type TrendingProductsSummaryOutput = z.infer<typeof TrendingProductsSummaryOutputSchema>;

export async function trendingProductsSummary(input: TrendingProductsSummaryInput): Promise<TrendingProductsSummaryOutput> {
  return trendingProductsSummaryFlow(input);
}

const trendingProductsSummaryPrompt = ai.definePrompt({
  name: 'trendingProductsSummaryPrompt',
  input: {schema: TrendingProductsSummaryInputSchema},
  output: {schema: TrendingProductsSummaryOutputSchema},
  prompt: `You are an expert fashion industry analyst. Based on aggregated and anonymized user data, provide a summary of the trending products in the following region: {{{region}}}. Highlight the top 3 most popular clothing items and explain why they are trending. The summary should be concise and no more than 200 words.`,
});

const trendingProductsSummaryFlow = ai.defineFlow(
  {
    name: 'trendingProductsSummaryFlow',
    inputSchema: TrendingProductsSummaryInputSchema,
    outputSchema: TrendingProductsSummaryOutputSchema,
  },
  async input => {
    const {output} = await trendingProductsSummaryPrompt(input);
    return output!;
  }
);
