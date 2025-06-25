## Configurable Smart Dashboard Builder

A react application demonstrating a drag-and-drop dashboard builder.

## 🚀 Installation

Follow these steps to set up the project locally. Once you have extracted the zip file, go to the project directory.

### 1. Clone the repository to your working directory
```bash
git clone git@github.com:iamdipankarj/dashboard-builder.git
```

### 2. Project Directory
```bash
cd dashboard-builder
```

### 3. Install Dependencies

```bash
yarn install
```

### 4. Start the Development Server

```bash
yarn dev
```

This will start the Vite dev server. Open your browser and navigate to:

```bash
http://localhost:5173
```

### 5. Build for Production (Optional)

```bash
yarn build
```

### 6. Preview production build (Optional)

```bash
yarn preview
```

## Design Decisions

### Widget System as Modular Components
Each widget (`WeatherWidget`, `NewsWidget`, `StockWidget`, etc.) was created as a standalone, dynamically-rendered component.

```tsx
export const WidgetRenderer = {
  weather: WeatherWidget,
  news: NewsWidget,
  stock: StockWidget
};
```
#### Why:
Easy to add/remove widgets in future. Keeps rendering logic clean and maintainable. Allows lazy loading (React.lazy) for performance.

### Centralized Widget State in useDsahboard custom hook.
A custom useDashboard() hook manages all widget logic — state, mutations, add/remove/configure. It keeps business logic decoupled from UI. Allows shared access from multiple components.

### Persistence via Backend API Only
Avoids state desync between client and backend. Supports multi-user or server-rendered dashboards in future.

### Optimistic Updates with React Query
Iam updating UI state immediately and sync to backend optimistically:

```tsx
setWidgets(newWidgets);
saveMutation.mutate(newWidgets);
```
### Drag-and-Drop via @dnd-kit
It is certainly possible to build a custom DnD solution, however to keep it focused on the core features, I took the liberty of using a third-party but a battle-tested library for this use case.

### Shadcn + Tailwind for UI
Using shadcn/ui ensures consistent UI primitives (buttons, select, toast), with utility-first styling via Tailwindcss.

### Agentic LLM Integration via Chat API
The widget-chat API accepts user messages and uses OpenAI function calling to return structured instructions. For example, a sample config.

While the same can be built on top of nodejs too, this time I chose to have on a separate service. You can find the controller here:

[https://github.com/iamdipankarj/larakit/blob/master/app/Http/Controllers/Api/WidgetChatController.php#L9](https://github.com/iamdipankarj/larakit/blob/master/app/Http/Controllers/Api/WidgetChatController.php#L9)

```json
{
  "action": "add",
  "widget": "weather",
  "config": {
    "location": "Kolkata"
  }
}
```

## Possible Improvements
* A search functionality for widgets.
* The API base urls should be moved to environment variables.
* Undo / Redo Functionality
* Confirmation Modals for Destructive Actions
* AI/LLM Enhancements
  * Multi-action Instructions. (e.g Add weather for Mumbai and stocks for Infosys).
  * Context aware AI. We can tell LLM not to suggest duplicates, for this we'd need to give the current widgets info. Something like `"currentWidgets": ["weather", "stocks"]`.
  * Streaming AI Chat. I can add real-time streaming of assistant responses (with useChat() + Vercel AI SDK), or with Laravel's http response streams.
* Currently the app is locked for desktop viewports. We can also improve the drag and drop UX to make it mobile responsive.
* Use a faster API for storing dashboard data. The one I have built is purposefully using very limited resources and only a single instance (too keep my cost minimal). While Laravel is not slow by any means, it is just for my usage of resources.
