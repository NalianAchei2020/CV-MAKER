'use client';

import { TextField, Grid } from '@mui/material';

export function PersonalInfoStep({ form }: { form: any }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Full Name"
          variant="outlined"
          {...form.register('personalInfo.fullName')}
          error={!!form.formState.errors.personalInfo?.fullName}
          helperText={form.formState.errors.personalInfo?.fullName?.message}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          {...form.register('personalInfo.email')}
          error={!!form.formState.errors.personalInfo?.email}
          helperText={form.formState.errors.personalInfo?.email?.message}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Phone"
          variant="outlined"
          {...form.register('personalInfo.phone')}
          error={!!form.formState.errors.personalInfo?.phone}
          helperText={form.formState.errors.personalInfo?.phone?.message}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Address"
          variant="outlined"
          {...form.register('personalInfo.address')}
          error={!!form.formState.errors.personalInfo?.address}
          helperText={form.formState.errors.personalInfo?.address?.message}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="LinkedIn Profile"
          variant="outlined"
          {...form.register('personalInfo.linkedin_profile')}
          error={!!form.formState.errors.personalInfo?.linkedin_profile}
          helperText={
            form.formState.errors.personalInfo?.linkedin_profile?.message
          }
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Job Title"
          variant="outlined"
          {...form.register('job_title')}
          error={!!form.formState.errors.job_title}
          helperText={form.formState.errors.job_title?.message}
        />
      </Grid>

      <Grid item xs={12}>
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
  );
}
