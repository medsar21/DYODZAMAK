import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess } from "@/lib/api-utils";
import { products as staticProducts } from "@/data/site";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const where: Record<string, unknown> = { active: true };

    const categorySlug = searchParams.get("category");
    if (categorySlug) {
      const cat = await prisma.category.findUnique({ where: { slug: categorySlug } });
      if (cat) where.categoryId = cat.id;
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { sortOrder: "asc" },
      include: { category: true },
    });

    if (products && products.length > 0) {
      return apiSuccess(products);
    }
  } catch (error) {
    console.error("Database query failed in /api/public/products, using static products fallback:", error);
  }

  const { searchParams } = new URL(req.url);
  const categorySlug = searchParams.get("category");
  let list = staticProducts;
  if (categorySlug) {
    list = staticProducts.filter((p) => p.category === categorySlug);
  }
  return apiSuccess(list);
}
