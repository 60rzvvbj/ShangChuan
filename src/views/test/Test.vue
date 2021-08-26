<template>
  <quill-editor></quill-editor>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'Test',
  components: {
    quillEditor
  }
}
</script>

<style>
</style>