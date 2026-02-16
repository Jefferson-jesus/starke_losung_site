import { redirect } from "next/navigation";
import { detectLocaleServer } from "@/lib/locale";

export default async function IndexRedirectPage() {
  const locale = await detectLocaleServer();
  redirect(`/${locale}`);
}
