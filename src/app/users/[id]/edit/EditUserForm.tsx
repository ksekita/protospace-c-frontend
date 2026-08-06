import Useredit from "@/components/users/edit/UserEdit";
import api from "@/lib/api/layout/apiClient";
import { userInfo } from "@/lib/api/prototype-list/useGetPrototype";
import { redirect } from "next/navigation";

export default async function EdituserInfo({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = Number(id);
  const currentUser = await userInfo();
  if (Number(currentUser.id) != userId) {
    redirect(`/users/${userId}`);
  }
  const response = await api.get(`/users/${userId}`);
  const userData = response.data;

  return (
    <>
      <Useredit userData={userData} userId={userId} />
    </>
  );
}
