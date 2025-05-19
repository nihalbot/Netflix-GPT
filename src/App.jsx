import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import appStore from "./utils/appStore";
import Body from "./components/Body";
import Login from "./components/Login";
import Browse from "./components/Browse";

// Define a layout route that renders Body (which handles auth & outlet)
const appRouter = createBrowserRouter([
  {
    element: <Body />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/browse", element: <Browse /> },
    ],
  },
]);

export default function App() {
  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}
