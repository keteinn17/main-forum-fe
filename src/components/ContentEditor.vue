<template>
  <div class="fg-black" style="--ck-border-radius: 0.25rem">
    <CKEditor
      :editor="ClassicEditor"
      v-model="editorData"
      :config="editorConfig"
    ></CKEditor>
  </div>
</template>

<script setup>
import { ref, defineProps, watch, defineEmits } from "vue";
import { component as CKEditor } from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);
const editorData = ref(props.modelValue || "");
const editorConfig = ref({
  items: [
    "undo",
    "redo",
    "|",
    "heading",
    "|",
    "fontfamily",
    "fontsize",
    "fontColor",
    "fontBackgroundColor",
    "|",
    "bold",
    "italic",
    "strikethrough",
    "subscript",
    "superscript",
    "code",
    "-", // break point
    "|",
    "alignment",
    "link",
    "uploadImage",
    "blockQuote",
    "codeBlock",
    "|",
    "bulletedList",
    "numberedList",
    "todoList",
    "outdent",
    "indent",
  ],
  heading: {
    options: [
      { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
      {
        model: "heading1",
        view: "h1",
        title: "Heading 1",
        class: "ck-heading_heading1",
      },
      {
        model: "heading2",
        view: "h2",
        title: "Heading 2",
        class: "ck-heading_heading2",
      },
    ],
  },
});
watch(editorData, () => {
  emit("update:modelValue", editorData.value);
});
</script>

<style>
.ck-editor__editable {
  min-height: 260px;
}
</style>
