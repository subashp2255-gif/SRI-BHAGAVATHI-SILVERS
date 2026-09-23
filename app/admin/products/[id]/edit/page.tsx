import { notFound } from "next/navigation";
import { getProductById } from "@/lib/db/repo";
import ProductForm from "@/components/admin/ProductForm";

export const metadata = {
  title: "Edit Product | Admin CMS",
};

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductForm initialData={product} isEdit={true} />;
}
