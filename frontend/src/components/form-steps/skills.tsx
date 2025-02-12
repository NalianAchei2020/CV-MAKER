'use client';

import { useFieldArray } from 'react-hook-form';
import { TextField, Chip, Box, Button, Paper } from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

export function SkillsStep({ form }: { form: any }) {
  const [newSkill, setNewSkill] = useState('');
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'skills',
  });

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      append({ value: newSkill.trim() }); // Append an object with 'value'
      setNewSkill('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          label="Add Skill"
          variant="outlined"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button
          variant="contained"
          onClick={handleAddSkill}
          sx={{ minWidth: 'auto' }}
        >
          <AddIcon />
        </Button>
      </Box>

      <Paper
        variant="outlined"
        sx={{ p: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}
      >
        {fields.map((field, index) => (
          <Chip
            key={field.id}
            label={field.value}
            onDelete={() => remove(index)}
            color="primary"
            variant="outlined"
          />
        ))}
      </Paper>
    </Box>
  );
}
