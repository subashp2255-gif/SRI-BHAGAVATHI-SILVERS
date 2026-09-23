import ProductForm from "@/components/admin/ProductForm";

export const metadata = {
  title: "Add New Product | Admin CMS",
};

export default function NewProductPage() {
  return <ProductForm isEdit={false} />;
}
