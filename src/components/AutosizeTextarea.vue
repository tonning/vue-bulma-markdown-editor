<template>
    <textarea v-model="body" v-on:input="$emit('input', $event.target.value)">
    </textarea>
</template>

<script>
    import autosize from 'autosize'

    export default {
      name: 'AutosizeTextarea',
      props: ['value'],
        mounted() {
            autosize(this.$el)
        },
      data: function () {
        return {
          body: this.value,
        }
      },
      watch: {
        value: function(newVal) {
          this.body = newVal
        }
      }
    }
</script>
