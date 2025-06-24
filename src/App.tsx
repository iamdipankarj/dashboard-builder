import './App.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from '@/pages/home'
import { Toaster } from "@/components/ui/sonner"

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
