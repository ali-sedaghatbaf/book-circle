'use server';

/**
 * @fileOverview This file defines a Genkit flow for summarizing discussion threads or book chapters.
 *
 * - summarizeDiscussion - A function that summarizes a discussion thread or book chapter.
 * - SummarizeDiscussionInput - The input type for the summarizeDiscussion function.
 * - SummarizeDiscussionOutput - The return type for the summarizeDiscussion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeDiscussionInputSchema = z.object({
  text: z.string().describe('The discussion thread or book chapter text to summarize.'),
});
export type SummarizeDiscussionInput = z.infer<typeof SummarizeDiscussionInputSchema>;

const SummarizeDiscussionOutputSchema = z.object({
  summary: z.string().describe('The summarized text.'),
});
export type SummarizeDiscussionOutput = z.infer<typeof SummarizeDiscussionOutputSchema>;

export async function summarizeDiscussion(input: SummarizeDiscussionInput): Promise<SummarizeDiscussionOutput> {
  return summarizeDiscussionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeDiscussionPrompt',
  input: {schema: SummarizeDiscussionInputSchema},
  output: {schema: SummarizeDiscussionOutputSchema},
  prompt: `You are an expert summarizer. You will be given a discussion thread or book chapter text and you will summarize it.

  Determine the appropriate length and detail of the summary based on the length of the text. If the text is short, provide a more detailed summary. If the text is long, provide a more concise summary.

  Also, determine if any information should be excluded from the summary. Exclude any irrelevant or unimportant details.

  Text: {{{text}}}`,
});

const summarizeDiscussionFlow = ai.defineFlow(
  {
    name: 'summarizeDiscussionFlow',
    inputSchema: SummarizeDiscussionInputSchema,
    outputSchema: SummarizeDiscussionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
