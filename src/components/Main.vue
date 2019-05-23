<template>
  <div style="margin-top:15em">
    <b-card title="How does this work?" >
      <b-card-text>
        This application allows you to enroll a person's face, then verify faces to confirm if they are known to you or not
      </b-card-text>
      <b-button :to="{ name: 'enroll'}" variant="secondary">Enroll</b-button>
      <b-button :to="{ name: 'verify'}" variant="primary">Verify</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Main'
}
</script>
