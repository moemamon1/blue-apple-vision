export const SHOPIFY_API_VERSION = "2025-07";
export const SHOPIFY_STORE_PERMANENT_DOMAIN = "blue-apple-vision-8vqm9.myshopify.com";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = "65b79c4a35ca440c8aec34548ebff5a7";

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  productType: string;
  tags: string[];
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
  images: {
    edges: Array<{ node: { url: string; altText: string | null } }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: { amount: string; currencyCode: string };
        availableForSale: boolean;
      };
    }>;
  };
}

const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          productType
          tags
          priceRange {
            minVariantPrice { amount currencyCode }
          }
          images(first: 3) {
            edges { node { url altText } }
          }
          variants(first: 5) {
            edges {
              node {
                id
                title
                price { amount currencyCode }
                availableForSale
              }
            }
          }
        }
      }
    }
  }
`;

export async function storefrontApiRequest<T = unknown>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<{ data?: T; errors?: Array<{ message: string }> } | null> {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify Storefront request failed: ${response.status}`);
  }

  return response.json();
}

export async function fetchProducts(query?: string, first = 50): Promise<ShopifyProduct[]> {
  const result = await storefrontApiRequest<{
    products: { edges: Array<{ node: ShopifyProduct }> };
  }>(PRODUCTS_QUERY, { first, query: query ?? null });

  if (!result?.data) return [];
  return result.data.products.edges.map((e) => e.node);
}
