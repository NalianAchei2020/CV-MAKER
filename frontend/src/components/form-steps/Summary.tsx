import React from 'react';
import { TextField, Grid } from '@mui/material';
import { AIchatSession } from '@/service/generateTextFromAI';

const SummaryStep = ({ form, formData }: { form: any; formData: any }) => {
  const jobTitle = formData?.job_title;
  const prompt = `Job title: ${jobTitle}. Depends on job title, give a summary for my resume within 4 - 5 lines`;

  const generateSummaryFromAI = async () => {
    try {
      console.log('Prompt:', prompt);
      const result = await AIchatSession.sendMessage(prompt);
      console.log(result.response.text());
    } catch (error) {
      console.error('Error generating summary:', error);
    }
  };
  return (
    <div>
      <Grid>
        {/* Professional Summary */}
        <Grid item xs={12}>
          <div className="flex justify-end items-end">
            <button
              className="outline-blue-700 p-2 border-2 border-blue-700 rounded-lg mb-2 text-blue-500"
              onClick={generateSummaryFromAI}
            >
              Generate from AI
            </button>
          </div>
          <TextField
            fullWidth
            label="Professional Summary"
            variant="outlined"
            multiline
            rows={4}
            {...form.register('summary')}
            error={!!form.formState.errors.summary}
            helperText={form.formState.errors.summary?.message}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default SummaryStep;
