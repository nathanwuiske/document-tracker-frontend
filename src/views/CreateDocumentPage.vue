<template>
  <Message v-if="successfulUpload" severity="success"
    >Successfully uploaded document</Message
  >
  <FileUpload
    name="demo[]"
    :multiple="true"
    accept="application/pdf"
    :maxFileSize="1000000"
    customUpload
    @uploader="documentUploader"
  >
    <template #empty>
      <span>Drag and drop files here to upload.</span>
    </template>
    <template #content="{ files }">
      <div class="flex flex-col gap-8 pt-4">
        <div v-if="files.length > 0">
          <h5>Pending Documents</h5>
          <div class="flex flex-wrap gap-4">
            <div
              v-for="file of files"
              :key="file.name + file.type + file.size"
              class="p-8 rounded-border flex flex-col border border-surface items-center gap-2"
            >
              <span
                class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden"
                >{{ file.name }}
              </span>
              <InputText
                v-model="file.newName"
                placeholder="Name the file (optional)"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </FileUpload>
</template>

<script lang="ts" setup>
import { documentsClient, UploadedDocument } from '@/client'
import { useMutation } from '@tanstack/vue-query'
import FileUpload, { FileUploadUploaderEvent } from 'primevue/fileupload'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import { Ref, ref } from 'vue'

const successfulUpload: Ref<boolean> = ref(false)

const createDocumentMutation = useMutation({
  mutationFn: async (data: UploadedDocument) =>
    documentsClient.createDocument(data),
  onSuccess: () => {
    successfulUpload.value = true
  },
})

const documentUploader = (event: FileUploadUploaderEvent) => {
  const files = event.files

  if (!Array.isArray(files)) return

  const file = files[0] as File & { newName?: string }
  const fileName = file.newName
    ? `${file.newName}.${getFileExtension(file.name)}`
    : file.name

  createDocumentMutation.mutate({
    name: fileName,
    document: file,
  } as UploadedDocument)
}

const getFileExtension = (fileName: string): string => {
  return fileName.split('.').pop() || ''
}
</script>
