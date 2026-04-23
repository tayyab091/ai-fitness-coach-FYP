import { RecipeDetailClient } from "./RecipeDetailClient";

export function generateStaticParams() {
    return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }];
}

export default async function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <RecipeDetailClient id={id} />;
}
