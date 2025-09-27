import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: "todo_list_colaborativa",
    test: {
        base: "todo_list_colaborativa",
        globals: true,
        environment: 'jsdom',
    },
})