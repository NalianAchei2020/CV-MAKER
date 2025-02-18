import React, { useState } from 'react';
import {
  TextField,
  Grid,
  Card,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { AIchatSession } from '@/service/generateTextFromAI';

const SummaryStep = ({ form, formData }: { form: any; formData: any }) => {
  const [summaryOptions, setSummaryOptions] = useState<{
    experienced: string;
    midLevel: string;
    entryLevel: string;
  } | null>(null);

  const jobTitle = formData?.job_title;
  const prompt = `Create three concise resume summary options for a job title of "${jobTitle}". Each summary should target one of the following experience levels: experienced (mid-level), mid-level, and entry-level. Please keep the summaries brief and avoid any additional instructions or explanations.`;

  const generateSummaryFromAI = async () => {
    try {
      console.log('Prompt:', prompt);
      const result = await AIchatSession.sendMessage(prompt);
      const response = result.response.text();

      // Split the response into separate summaries based on the bullet points
      const summariesArray = response.split('**').filter((text) => text.trim());
      console.log(summariesArray);

      // Create an object with the summaries
      const summaries = {
        experienced: summariesArray[1].split(':')[1].trim(),
        midLevel: summariesArray[3].split(':')[1].trim(),
        entryLevel: summariesArray[5].split(':')[1].trim(),
      };

      setSummaryOptions(summaries);
    } catch (error) {
      console.error('Error generating summary:', error);
    }
  };

  const handleSummarySelection = (value: string) => {
    form.setValue('summary', value);
  };

  return (
    <div>
      <Grid container spacing={2}>
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

        {summaryOptions && (
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
              AI-Generated Suggestions
            </Typography>
            <RadioGroup
              onChange={(e) => handleSummarySelection(e.target.value)}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card sx={{ p: 2, mb: 2 }}>
                    <FormControlLabel
                      value={summaryOptions.experienced}
                      control={<Radio />}
                      label={
                        <div>
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            gutterBottom
                          >
                            Experienced
                          </Typography>
                          <Typography variant="body2">
                            {summaryOptions.experienced}
                          </Typography>
                        </div>
                      }
                    />
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card sx={{ p: 2, mb: 2 }}>
                    <FormControlLabel
                      value={summaryOptions.midLevel}
                      control={<Radio />}
                      label={
                        <div>
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            gutterBottom
                          >
                            Mid-Level
                          </Typography>
                          <Typography variant="body2">
                            {summaryOptions.midLevel}
                          </Typography>
                        </div>
                      }
                    />
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card sx={{ p: 2 }}>
                    <FormControlLabel
                      value={summaryOptions.entryLevel}
                      control={<Radio />}
                      label={
                        <div>
                          <Typography
                            variant="subtitle1"
                            color="primary"
                            gutterBottom
                          >
                            Entry-Level
                          </Typography>
                          <Typography variant="body2">
                            {summaryOptions.entryLevel}
                          </Typography>
                        </div>
                      }
                    />
                  </Card>
                </Grid>
              </Grid>
            </RadioGroup>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default SummaryStep;

export { SummaryStep };
