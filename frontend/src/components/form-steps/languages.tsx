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
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const proficiencyLevels = [
  'Native',
  'Fluent',
  'Advanced',
  'Intermediate',
  'Basic',
];

export function LanguagesStep({ form }: { form: any }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'languages',
  });

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
              <Typography variant="h6">Language {index + 1}</Typography>
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
                  label="Language"
                  variant="outlined"
                  {...form.register(`languages.${index}.language`, {
                    required: true,
                  })}
                  defaultValue="" // Ensure the default value is set
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Proficiency Level"
                  variant="outlined"
                  {...form.register(`languages.${index}.level`, {
                    required: true,
                  })}
                  defaultValue="" // Ensure the default value is set
                >
                  {proficiencyLevels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </TextField>
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
            language: '', // Initialize to an empty string
            level: '', // Initialize to an empty string
          })
        }
        fullWidth
      >
        Add Language
      </Button>
    </Box>
  );
}
