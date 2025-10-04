'use server';

/**
 * @fileOverview A personalized product recommendation AI agent.
 * 
 * - getPersonalizedRecommendations - A function that generates product recommendations based on user demographics and browsing history.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  gender: z.string().describe('The user\'s gender.'),
  location: z.string().describe('The user\'s location.'),
  ageRange: z.string().describe('The user\'s age range.'),
  browsingHistory: z.string().describe('The user\'s browsing history.'),
});

export type PersonalizedRecommendationsInput = z.infer<typeof PersonalizedRecommendationsInputSchema>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      productName: z.string().describe('The name of the recommended product.'),
      productDescription: z.string().describe('A brief description of the product.'),
      productImageUrl: z.string().describe('URL of the product image.'),
    })
  ).describe('A list of personalized product recommendations.'),
});

export type PersonalizedRecommendationsOutput = z.infer<typeof PersonalizedRecommendationsOutputSchema>;

export async function getPersonalizedRecommendations(input: PersonalizedRecommendationsInput): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an expert e-commerce product recommender.

  Based on the user\'s demographic information and browsing history, provide a list of product recommendations.

  Demographic Information:
  Gender: {{{gender}}}
  Location: {{{location}}}
  Age Range: {{{ageRange}}}

  Browsing History: {{{browsingHistory}}}

  Provide the recommendations in the following JSON format:
  {{$instructions PersonalizedRecommendationsOutputSchema}}
  `,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
