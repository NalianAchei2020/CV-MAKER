'use client';

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
import { AIchatSession3 } from '@/service/AIProjectDesAPI';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export function ProjectsStep({ form, formData }: { form: any; formData: any }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'projects',
  });

  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const generateProjectDescription = async (index: number) => {
    if (!form.getValues(`projects.${index}.title`)) {
      // You might want to add error handling here
      return;
    }

    try {
      setLoading(true);
      setCurrentIndex(index);

      const prompt = `Project title:${form.getValues(
        `projects.${index}.title`
      )}.Give a description for this project with 3 - 5 lines.
      Please avoid any additional instructions or explanations`;

      const result = await AIchatSession3.sendMessage(prompt);
      const response = await result.response.text();

      // Update the description field using form.setValue
      form.setValue(`projects.${index}.description`, response);
    } catch (error) {
      console.error('Error generating description:', error);
    } finally {
      setLoading(false);
      setCurrentIndex(null);
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
              <Typography variant="h6">Project {index + 1}</Typography>
              <IconButton
                onClick={() => remove(index)}
                color="error"
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Project Title"
                  variant="outlined"
                  {...form.register(`projects.${index}.title`)}
                />
              </Grid>

              <Grid item xs={12}>
                <div className="flex justify-end items-end">
                  <button
                    className="outline-blue-700 p-2 border-2 border-blue-700 rounded-lg mb-2 text-blue-500 flex items-center gap-2 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => generateProjectDescription(index)}
                    disabled={
                      loading || !form.getValues(`projects.${index}.title`)
                    }
                  >
                    {loading && currentIndex === index && (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    )}
                    {loading && currentIndex === index
                      ? 'Generating...'
                      : 'Generate from AI'}
                  </button>
                </div>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  variant="outlined"
                  {...form.register(`projects.${index}.description`)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Project Link"
                  variant="outlined"
                  {...form.register(`projects.${index}.link`)}
                />
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
            title: '',
            description: '',
            link: '',
          })
        }
        fullWidth
      >
        Add Project
      </Button>
    </Box>
  );
}
