import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
  withXSRFToken: true,
})

export type LoginPayload = {
  email: string
  password: string
}
export const authClient = {
  csrf: () => api.get('/sanctum/csrf-cookie'),
  login: (data: LoginPayload) => api.post('/login', data),
  logout: () => api.post('/logout'),
}

type Document = {
  id: number
  name: string
  expires_at: string
}

export type UploadedDocument = {
  name: string
  document: File
}
export const documentsClient = {
  getDocuments: () => api.get<{ data: Document[] }>('/api/documents'),
  getDocument: (id: number) =>
    api.get<{ data: Document }>(`/api/documents/${id}`),
  archiveDocument: (id: number) => api.post(`/api/documents/${id}/archive`),
  createDocument: (uploadedDocument: UploadedDocument) =>
    api.post(`/api/documents`, uploadedDocument, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
}
