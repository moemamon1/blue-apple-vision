export const SHOPIFY_API_VERSION = "2025-07";
export const SHOPIFY_STORE_PERMANENT_DOMAIN = "blue-apple-vision-8vqm9.myshopify.com";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = "65b79c4a35ca440c8aec34548ebff5a7";

export interface ShopifyVariantNode {
  id: string;
  title: string;
  price: { amount: string; currencyCode: string };
  availableForSale: boolean;
  selectedOptions?: Array<{ name: string; value: string }>;
}

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
    edges: Array<{ node: ShopifyVariantNode }>;
  };
  options?: Array<{ name: string; values: string[] }>;
}

const PRODUCT_FIELDS = `
  id
  title
  description
  handle
  productType
  tags
  priceRange { minVariantPrice { amount currencyCode } }
  images(first: 6) { edges { node { url altText } } }
  variants(first: 10) {
    edges {
      node {
        id
        title
        price { amount currencyCode }
        availableForSale
        selectedOptions { name value }
      }
    }
  }
  options { name values }
`;

const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges { node { ${PRODUCT_FIELDS} } }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProduct($handle: String!) {
    productByHandle(handle: $handle) { ${PRODUCT_FIELDS} }
  }
`;

const COLLECTION_PRODUCTS_QUERY = `
  query GetCollectionProducts($id: ID!, $first: Int!) {
    collection(id: $id) {
      id
      title
      products(first: $first, sortKey: MANUAL, reverse: false) {
        edges { node { ${PRODUCT_FIELDS} } }
      }
    }
  }
`;

export async function fetchProductsByCollectionId(
  collectionId: string,
  first = 250
): Promise<ShopifyProduct[]> {
  const gid = collectionId.startsWith("gid://")
    ? collectionId
    : `gid://shopify/Collection/${collectionId}`;
  const result = await storefrontApiRequest<{
    collection: { products: { edges: Array<{ node: ShopifyProduct }> } } | null;
  }>(COLLECTION_PRODUCTS_QUERY, { id: gid, first });
  if (!result?.data?.collection) return [];
  return result.data.collection.products.edges.map((e) => e.node);
}

export async function storefrontApiRequest<T = any>(
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
  if (!response.ok) throw new Error(`Shopify Storefront request failed: ${response.status}`);
  return response.json();
}

export async function fetchProducts(query?: string, first = 50): Promise<ShopifyProduct[]> {
  const result = await storefrontApiRequest<{ products: { edges: Array<{ node: ShopifyProduct }> } }>(
    PRODUCTS_QUERY,
    { first, query: query ?? null }
  );
  if (!result?.data) return [];
  return result.data.products.edges.map((e) => e.node);
}

export async function fetchProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const result = await storefrontApiRequest<{ productByHandle: ShopifyProduct | null }>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle }
  );
  return result?.data?.productByHandle ?? null;
}

/* ---------------- Cart ---------------- */

const CART_QUERY = `
  query cart($id: ID!) { cart(id: $id) { id totalQuantity } }
`;
const CART_CREATE = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;
const CART_LINES_ADD = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;
const CART_LINES_UPDATE = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { id }
      userErrors { field message }
    }
  }
`;
const CART_LINES_REMOVE = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { id }
      userErrors { field message }
    }
  }
`;

export function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set("channel", "online_store");
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

type UserErr = { field: string[] | null; message: string };
function isCartNotFound(errs: UserErr[] = []) {
  return errs.some((e) => /cart not found|does not exist/i.test(e.message));
}

export async function createShopifyCart(variantId: string, quantity: number) {
  const data = await storefrontApiRequest<any>(CART_CREATE, {
    input: { lines: [{ quantity, merchandiseId: variantId }] },
  });
  const errs = data?.data?.cartCreate?.userErrors || [];
  if (errs.length) {
    console.error("cartCreate", errs);
    return null;
  }
  const cart = data?.data?.cartCreate?.cart;
  if (!cart?.checkoutUrl) return null;
  const lineId = cart.lines.edges[0]?.node?.id;
  return { cartId: cart.id as string, checkoutUrl: formatCheckoutUrl(cart.checkoutUrl), lineId: lineId as string };
}

export async function addLineToShopifyCart(cartId: string, variantId: string, quantity: number) {
  const data = await storefrontApiRequest<any>(CART_LINES_ADD, {
    cartId,
    lines: [{ quantity, merchandiseId: variantId }],
  });
  const errs = data?.data?.cartLinesAdd?.userErrors || [];
  if (isCartNotFound(errs)) return { success: false, cartNotFound: true as const };
  if (errs.length) {
    console.error("cartLinesAdd", errs);
    return { success: false as const };
  }
  const lines = data?.data?.cartLinesAdd?.cart?.lines?.edges || [];
  const newLine = lines.find((l: any) => l.node.merchandise.id === variantId);
  return { success: true as const, lineId: newLine?.node?.id as string | undefined };
}

export async function updateShopifyCartLine(cartId: string, lineId: string, quantity: number) {
  const data = await storefrontApiRequest<any>(CART_LINES_UPDATE, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });
  const errs = data?.data?.cartLinesUpdate?.userErrors || [];
  if (isCartNotFound(errs)) return { success: false, cartNotFound: true as const };
  if (errs.length) {
    console.error("cartLinesUpdate", errs);
    return { success: false as const };
  }
  return { success: true as const };
}

export async function removeShopifyCartLine(cartId: string, lineId: string) {
  const data = await storefrontApiRequest<any>(CART_LINES_REMOVE, {
    cartId,
    lineIds: [lineId],
  });
  const errs = data?.data?.cartLinesRemove?.userErrors || [];
  if (isCartNotFound(errs)) return { success: false, cartNotFound: true as const };
  if (errs.length) {
    console.error("cartLinesRemove", errs);
    return { success: false as const };
  }
  return { success: true as const };
}

export async function fetchCart(cartId: string) {
  const data = await storefrontApiRequest<any>(CART_QUERY, { id: cartId });
  return data?.data?.cart ?? null;
}
