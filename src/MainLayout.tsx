import { Outlet } from "react-router-dom";
import CustomNavigation from "./components/CustomNavigation/CustomNavigation";
import { useMainLayout } from "./hooks/useMainLayout";

export default function MainLayout() {
  const { id, isLoading, isValidId } = useMainLayout();

  if (isLoading) return <div>Loading...</div>;
  if (id && !isValidId) return null;

  return (
    <>
      <CustomNavigation id={id} />
      <Outlet />
    </>
  );
}
