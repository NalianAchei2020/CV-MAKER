import React, { useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import {
  TextField,
  Grid,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import TextEditor from './textEditor';

import { Loader2 } from 'lucide-react';
import { AIchatSession2 } from '@/service/AIexperienceDesAPI';

interface WorkExperienceStepProps {
  form: any;
  formData: any;
}

export function WorkExperienceStep({
  form,
  formData,
}: WorkExperienceStepProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'workExperience',
  });

  const [loading2, setLoading2] = useState(false);

  const workExperienceDesFromAI = async (index: number) => {
    const jobTitle = form.watch(`workExperience.${index}.jobTitle`);
    const prompt = `Write a concise description within 5 points for this job experience ${
      jobTitle || 'N/A'
    }. Please keep the summaries brief and avoid any additional instructions or explanations.`;

    if (!jobTitle) {
      console.error('Please enter a job title first.');
      return;
    }

    try {
      setLoading2(true);
      const result = await AIchatSession2.sendMessage(prompt);
      const response = await result.response.text();
      const text = response
        .split('.')
        .map((sentence) => sentence.trim())
        .filter((sentence) => sentence)
        .join('\n');

      form.setValue(`workExperience.${index}.description`, text);
    } catch (error) {
      console.error('Error generating description:', error);
    } finally {
      setLoading2(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {fields.map((field, index) => (
        <Card key={field.id} variant="outlined">
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Typography variant="h6">Experience {index + 1}</Typography>
              <IconButton
                onClick={() => remove(index)}
                color="error"
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Job Title"
                  variant="outlined"
                  {...form.register(`workExperience.${index}.jobTitle`)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Company"
                  variant="outlined"
                  {...form.register(`workExperience.${index}.company`)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  variant="outlined"
                  {...form.register(`workExperience.${index}.city`)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Country"
                  variant="outlined"
                  {...form.register(`workExperience.${index}.country`)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  {...form.register(`workExperience.${index}.startDate`)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="End Date"
                  type="date"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  {...form.register(`workExperience.${index}.endDate`)}
                />
              </Grid>

              <Grid item xs={12}>
                <div className="flex justify-end items-end">
                  <button
                    type="button"
                    className="outline-blue-700 p-2 border-2 border-blue-700 rounded-lg mb-2 text-blue-500 flex gap-4"
                    onClick={() => workExperienceDesFromAI(index)}
                  >
                    {loading2 ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      ''
                    )}
                    {loading2 ? 'Generating...' : 'Generate from AI'}
                  </button>
                </div>
                <Box
                  sx={{ border: 1, borderColor: 'grey.300', borderRadius: 1 }}
                >
                  <TextEditor
                    value={
                      form.watch(`workExperience.${index}.description`) || ''
                    }
                    onChange={(value) =>
                      form.setValue(
                        `workExperience.${index}.description`,
                        value
                      )
                    }
                    placeholder="Description"
                  />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() =>
          append({
            jobTitle: '',
            company: '',
            city: '',
            country: '',
            startDate: '',
            endDate: '',
            description: '',
          })
        }
        fullWidth
      >
        Add Work Experience
      </Button>
    </Box>
  );
}
