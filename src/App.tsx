import { memo, Suspense } from "react";
import AppRouter from "@/pages";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppRouter />
      <Toaster position="top-right" reverseOrder={false} />
    </Suspense>
  );
};

export default memo(App);
