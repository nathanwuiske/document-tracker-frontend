<template>
  <main>
    <div class="space-y-16 py-16 xl:space-y-20">
      <div>
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
              <h1 class="text-base font-semibold leading-6 text-gray-900">
                Documents Expiring Soon
              </h1>
              <p class="mt-2 text-sm text-gray-700">
                A list of documents that will expire within the next 7 days
              </p>
            </div>
          </div>
          <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div
                class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
              >
                <DataTable
                  :value="documents?.data || []"
                  :loading="isLoading"
                  dataKey="id"
                  tableStyle="min-width: 50rem"
                >
                  <Column field="id" header="ID"></Column>
                  <Column field="name" header="Name"></Column>
                  <Column field="expires_at" header="Expires At"></Column>
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { documentsClient } from '@/client'
import { useQuery } from '@tanstack/vue-query'

const { data: documents, isLoading } = useQuery({
  queryKey: ['documents'],
  queryFn: documentsClient.getDocuments,
})
</script>
