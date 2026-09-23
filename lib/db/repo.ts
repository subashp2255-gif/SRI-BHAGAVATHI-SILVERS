import { db } from "./index";
import crypto from "crypto";

export interface DbProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryLabel: string;
  subcategory?: string;
  price: number;
  formattedPrice: string;
  pricingMode: "FIXED" | "RATE_BASED";
  netWeight: string;
  weightGrams: number;
  purity: string;
  makingCharge: number;
  gstRate: number;
  purityBadge: string;
  badgeType: string;
  image: string;
  secondaryImages: string[];
  description: string;
  inStock: boolean;
  featured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  style: string[];
  collection?: string;
  occasions: string[];
  tags: string[];
  story?: string;
  careInstructions?: string;
  specs: Record<string, string>;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

// ----------------------------------------------------
// ADMIN USERS
// ----------------------------------------------------
export function getAdminByEmail(email: string) {
  const row = db.prepare("SELECT * FROM admin_users WHERE email = ?").get(email.trim().toLowerCase()) as any;
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
    name: row.name,
    role: row.role,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function getAllAdmins() {
  const rows = db.prepare("SELECT id, email, name, role, created_at, updated_at FROM admin_users ORDER BY created_at DESC").all() as any[];
  return rows.map((r) => ({
    id: r.id,
    email: r.email,
    name: r.name,
    role: r.role,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  }));
}

export function createAdmin(data: { email: string; passwordHash: string; name: string; role: "SUPER_ADMIN" | "EDITOR" }) {
  const id = `usr_${crypto.randomUUID().slice(0, 8)}`;
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO admin_users (id, email, password_hash, name, role, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(id, data.email.trim().toLowerCase(), data.passwordHash, data.name, data.role, now, now);
  return getAdminByEmail(data.email);
}

export function deleteAdmin(id: string) {
  db.prepare("DELETE FROM admin_users WHERE id = ?").run(id);
}

// ----------------------------------------------------
// PRODUCTS
// ----------------------------------------------------
function parseProductRow(r: any): DbProduct {
  return {
    id: r.id,
    name: r.name,
    slug: r.slug,
    category: r.category,
    categoryLabel: r.category_label,
    subcategory: r.subcategory || undefined,
    price: r.price,
    formattedPrice: r.formatted_price,
    pricingMode: r.pricing_mode as "FIXED" | "RATE_BASED",
    netWeight: r.net_weight,
    weightGrams: r.weight_grams,
    purity: r.purity,
    makingCharge: r.making_charge,
    gstRate: r.gst_rate,
    purityBadge: r.purity_badge,
    badgeType: r.badge_type,
    image: r.image,
    secondaryImages: JSON.parse(r.secondary_images || "[]"),
    description: r.description,
    inStock: Boolean(r.in_stock),
    featured: Boolean(r.featured),
    isNewArrival: Boolean(r.is_new_arrival),
    isBestSeller: Boolean(r.is_best_seller),
    status: r.status as "DRAFT" | "PUBLISHED" | "ARCHIVED",
    style: JSON.parse(r.style || "[]"),
    collection: r.collection || undefined,
    occasions: JSON.parse(r.occasions || "[]"),
    tags: JSON.parse(r.tags || "[]"),
    story: r.story || undefined,
    careInstructions: r.care_instructions || undefined,
    specs: JSON.parse(r.specs || "{}"),
    seoTitle: r.seo_title || undefined,
    seoDescription: r.seo_description || undefined,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

export function getProducts(options?: {
  search?: string;
  category?: string;
  status?: string;
  collection?: string;
  featuredOnly?: boolean;
}) {
  let query = "SELECT * FROM products WHERE 1=1";
  const params: any[] = [];

  if (options?.status) {
    query += " AND status = ?";
    params.push(options.status);
  }

  if (options?.category) {
    query += " AND category = ?";
    params.push(options.category);
  }

  if (options?.collection) {
    query += " AND collection = ?";
    params.push(options.collection);
  }

  if (options?.featuredOnly) {
    query += " AND featured = 1";
  }

  if (options?.search) {
    query += " AND (name LIKE ? OR description LIKE ? OR tags LIKE ?)";
    const term = `%${options.search.trim()}%`;
    params.push(term, term, term);
  }

  query += " ORDER BY updated_at DESC";

  const rows = db.prepare(query).all(...params) as any[];
  return rows.map(parseProductRow);
}

export function getProductById(id: string): DbProduct | null {
  const row = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
  if (!row) return null;
  return parseProductRow(row);
}

export function saveProduct(data: Partial<DbProduct> & { name: string; category: string; price: number; image: string }) {
  const now = new Date().toISOString();
  const id = data.id || `p_${Date.now()}`;
  const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const formattedPrice = data.formattedPrice || `₹${data.price.toLocaleString("en-IN")}`;

  const existing = getProductById(id);

  if (existing) {
    db.prepare(`
      UPDATE products SET
        name = ?, slug = ?, category = ?, category_label = ?, subcategory = ?,
        price = ?, formatted_price = ?, pricing_mode = ?, net_weight = ?, weight_grams = ?,
        purity = ?, making_charge = ?, gst_rate = ?, purity_badge = ?, badge_type = ?,
        image = ?, secondary_images = ?, description = ?, in_stock = ?, featured = ?,
        is_new_arrival = ?, is_best_seller = ?, status = ?, style = ?, collection = ?,
        occasions = ?, tags = ?, story = ?, care_instructions = ?, specs = ?,
        seo_title = ?, seo_description = ?, updated_at = ?
      WHERE id = ?
    `).run(
      data.name,
      slug,
      data.category,
      data.categoryLabel || data.category,
      data.subcategory || null,
      data.price,
      formattedPrice,
      data.pricingMode || "FIXED",
      data.netWeight || "0g",
      data.weightGrams || 0,
      data.purity || "925",
      data.makingCharge || 0,
      data.gstRate || 0.03,
      data.purityBadge || "92.5 SILVER",
      data.badgeType || "primary",
      data.image,
      JSON.stringify(data.secondaryImages || []),
      data.description || "",
      data.inStock !== false ? 1 : 0,
      data.featured ? 1 : 0,
      data.isNewArrival ? 1 : 0,
      data.isBestSeller ? 1 : 0,
      data.status || "PUBLISHED",
      JSON.stringify(data.style || []),
      data.collection || null,
      JSON.stringify(data.occasions || []),
      JSON.stringify(data.tags || []),
      data.story || null,
      data.careInstructions || null,
      JSON.stringify(data.specs || {}),
      data.seoTitle || null,
      data.seoDescription || null,
      now,
      id
    );
  } else {
    db.prepare(`
      INSERT INTO products (
        id, name, slug, category, category_label, subcategory, price, formatted_price,
        pricing_mode, net_weight, weight_grams, purity, making_charge, gst_rate,
        purity_badge, badge_type, image, secondary_images, description, in_stock,
        featured, is_new_arrival, is_best_seller, status, style, collection,
        occasions, tags, story, care_instructions, specs, seo_title, seo_description,
        created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?
      )
    `).run(
      id,
      data.name,
      slug,
      data.category,
      data.categoryLabel || data.category,
      data.subcategory || null,
      data.price,
      formattedPrice,
      data.pricingMode || "FIXED",
      data.netWeight || "0g",
      data.weightGrams || 0,
      data.purity || "925",
      data.makingCharge || 0,
      data.gstRate || 0.03,
      data.purityBadge || "92.5 SILVER",
      data.badgeType || "primary",
      data.image,
      JSON.stringify(data.secondaryImages || []),
      data.description || "",
      data.inStock !== false ? 1 : 0,
      data.featured ? 1 : 0,
      data.isNewArrival ? 1 : 0,
      data.isBestSeller ? 1 : 0,
      data.status || "DRAFT",
      JSON.stringify(data.style || []),
      data.collection || null,
      JSON.stringify(data.occasions || []),
      JSON.stringify(data.tags || []),
      data.story || null,
      data.careInstructions || null,
      JSON.stringify(data.specs || {}),
      data.seoTitle || null,
      data.seoDescription || null,
      now,
      now
    );
  }

  return getProductById(id);
}

export function bulkUpdateProductsStatus(ids: string[], status: "PUBLISHED" | "DRAFT" | "ARCHIVED") {
  const now = new Date().toISOString();
  const stmt = db.prepare("UPDATE products SET status = ?, updated_at = ? WHERE id = ?");
  for (const id of ids) {
    stmt.run(status, now, id);
  }
}

export function duplicateProduct(id: string) {
  const original = getProductById(id);
  if (!original) return null;

  const newId = `p_${Date.now()}`;
  const newName = `${original.name} (Copy)`;
  const newSlug = `${original.slug}-copy-${Date.now().toString().slice(-4)}`;

  return saveProduct({
    ...original,
    id: newId,
    name: newName,
    slug: newSlug,
    status: "DRAFT",
  });
}

export function archiveProduct(id: string) {
  const now = new Date().toISOString();
  db.prepare("UPDATE products SET status = 'ARCHIVED', updated_at = ? WHERE id = ?").run(now, id);
}

// ----------------------------------------------------
// CATEGORIES
// ----------------------------------------------------
export function getCategories() {
  const rows = db.prepare("SELECT * FROM categories ORDER BY display_order ASC").all() as any[];
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    slug: r.slug,
    count: r.count,
    image: r.image,
    alt: r.alt,
    href: r.href,
    description: r.description,
    displayOrder: r.display_order,
    isActive: Boolean(r.is_active),
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  }));
}

export function saveCategory(cat: { id: string; name: string; image: string; description?: string; isActive?: boolean }) {
  const now = new Date().toISOString();
  const existing = db.prepare("SELECT id FROM categories WHERE id = ?").get(cat.id);

  if (existing) {
    db.prepare(`
      UPDATE categories SET name = ?, image = ?, description = ?, is_active = ?, updated_at = ?
      WHERE id = ?
    `).run(cat.name, cat.image, cat.description || "", cat.isActive !== false ? 1 : 0, now, cat.id);
  } else {
    db.prepare(`
      INSERT INTO categories (id, name, slug, count, image, alt, href, description, display_order, is_active, created_at, updated_at)
      VALUES (?, ?, ?, 0, ?, ?, ?, ?, 99, ?, ?, ?)
    `).run(cat.id, cat.name, cat.id, cat.image, cat.name, `/shop?category=${cat.id}`, cat.description || "", cat.isActive !== false ? 1 : 0, now, now);
  }
}

// ----------------------------------------------------
// COLLECTIONS
// ----------------------------------------------------
export function getCollections() {
  const rows = db.prepare("SELECT * FROM collections ORDER BY display_order ASC").all() as any[];
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    slug: r.slug,
    description: r.description,
    heroImage: r.hero_image,
    thumbnail: r.thumbnail,
    story: r.story,
    featured: Boolean(r.featured),
    displayOrder: r.display_order,
    status: r.status,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  }));
}

export function saveCollection(data: { id?: string; name: string; description: string; heroImage: string; thumbnail?: string; story?: string; featured?: boolean; status?: string }) {
  const now = new Date().toISOString();
  const id = data.id || data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const existing = db.prepare("SELECT id FROM collections WHERE id = ?").get(id);

  if (existing) {
    db.prepare(`
      UPDATE collections SET name = ?, description = ?, hero_image = ?, thumbnail = ?, story = ?, featured = ?, status = ?, updated_at = ?
      WHERE id = ?
    `).run(data.name, data.description, data.heroImage, data.thumbnail || data.heroImage, data.story || "", data.featured ? 1 : 0, data.status || "PUBLISHED", now, id);
  } else {
    db.prepare(`
      INSERT INTO collections (id, name, slug, description, hero_image, thumbnail, story, featured, display_order, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 99, ?, ?, ?)
    `).run(id, data.name, id, data.description, data.heroImage, data.thumbnail || data.heroImage, data.story || "", data.featured ? 1 : 0, data.status || "PUBLISHED", now, now);
  }
}

// ----------------------------------------------------
// OCCASIONS
// ----------------------------------------------------
export function getOccasions() {
  const rows = db.prepare("SELECT * FROM occasions ORDER BY display_order ASC").all() as any[];
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    slug: r.slug,
    description: r.description,
    heroImage: r.hero_image,
    thumbnail: r.thumbnail,
    featured: Boolean(r.featured),
    active: Boolean(r.active),
    displayOrder: r.display_order,
    relatedOccasions: JSON.parse(r.related_occasions || "[]"),
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  }));
}

export function saveOccasion(data: { id?: string; name: string; description: string; heroImage: string; thumbnail?: string; featured?: boolean; active?: boolean }) {
  const now = new Date().toISOString();
  const id = data.id || data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const existing = db.prepare("SELECT id FROM occasions WHERE id = ?").get(id);

  if (existing) {
    db.prepare(`
      UPDATE occasions SET name = ?, description = ?, hero_image = ?, thumbnail = ?, featured = ?, active = ?, updated_at = ?
      WHERE id = ?
    `).run(data.name, data.description, data.heroImage, data.thumbnail || data.heroImage, data.featured ? 1 : 0, data.active !== false ? 1 : 0, now, id);
  } else {
    db.prepare(`
      INSERT INTO occasions (id, name, slug, description, hero_image, thumbnail, featured, active, display_order, related_occasions, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 99, '[]', ?, ?)
    `).run(id, data.name, id, data.description, data.heroImage, data.thumbnail || data.heroImage, data.featured ? 1 : 0, data.active !== false ? 1 : 0, now, now);
  }
}

// ----------------------------------------------------
// SILVER RATE CONTROL
// ----------------------------------------------------
export function getLatestSilverRate() {
  const rate = db.prepare("SELECT * FROM silver_rate_records ORDER BY timestamp DESC LIMIT 1").get() as any;
  const config = db.prepare("SELECT * FROM silver_rate_config WHERE id = 'default'").get() as any;

  return {
    ratePerGram999: rate?.rate_per_gram_999 || 247.04,
    ratePerGram925: rate?.rate_per_gram_925 || 247.04,
    mode: rate?.mode || "MANUAL",
    manualOverride: Boolean(rate?.manual_override ?? true),
    purity: rate?.purity || "999",
    source: rate?.source || "Certified Boutique Atelier",
    change: rate?.change_val || 0,
    changePercent: rate?.change_percent || 0,
    timestamp: rate?.timestamp || new Date().toISOString(),
    adminEmail: rate?.admin_email || null,
    config: {
      isTopBarVisible: Boolean(config?.is_top_bar_visible ?? true),
      showTimestamp: Boolean(config?.show_timestamp ?? true),
      showSource: Boolean(config?.show_source ?? true),
      showChangeIndicator: Boolean(config?.show_change_indicator ?? true),
      defaultPurity: config?.default_purity || "999",
    },
  };
}

export function createSilverRateRecord(data: {
  ratePerGram999: number;
  ratePerGram925?: number;
  mode?: "MANUAL" | "API";
  manualOverride?: boolean;
  purity?: string;
  source?: string;
  changeVal?: number;
  changePercent?: number;
  adminEmail?: string;
}) {
  const id = `rate_${Date.now()}`;
  const now = new Date().toISOString();
  const rate925 = data.ratePerGram925 || Math.round(data.ratePerGram999 * 0.925 * 100) / 100;

  db.prepare(`
    INSERT INTO silver_rate_records (
      id, rate_per_gram_999, rate_per_gram_925, mode, manual_override, purity, source, change_val, change_percent, timestamp, admin_email
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    data.ratePerGram999,
    rate925,
    data.mode || "MANUAL",
    data.manualOverride !== false ? 1 : 0,
    data.purity || "999",
    data.source || "Certified Boutique Atelier",
    data.changeVal || 0,
    data.changePercent || 0,
    now,
    data.adminEmail || null
  );

  return getLatestSilverRate();
}

export function getSilverRateHistory(limit = 20) {
  const rows = db.prepare("SELECT * FROM silver_rate_records ORDER BY timestamp DESC LIMIT ?").all(limit) as any[];
  return rows.map((r) => ({
    id: r.id,
    ratePerGram999: r.rate_per_gram_999,
    ratePerGram925: r.rate_per_gram_925,
    mode: r.mode,
    manualOverride: Boolean(r.manual_override),
    purity: r.purity,
    source: r.source,
    change: r.change_val,
    changePercent: r.change_percent,
    timestamp: r.timestamp,
    adminEmail: r.admin_email,
  }));
}

export function updateSilverRateConfig(config: { isTopBarVisible?: boolean; showTimestamp?: boolean; showSource?: boolean; showChangeIndicator?: boolean; defaultPurity?: string }) {
  const current = getLatestSilverRate().config;
  db.prepare(`
    INSERT OR REPLACE INTO silver_rate_config (id, is_top_bar_visible, show_timestamp, show_source, show_change_indicator, default_purity)
    VALUES ('default', ?, ?, ?, ?, ?)
  `).run(
    config.isTopBarVisible ?? current.isTopBarVisible ? 1 : 0,
    config.showTimestamp ?? current.showTimestamp ? 1 : 0,
    config.showSource ?? current.showSource ? 1 : 0,
    config.showChangeIndicator ?? current.showChangeIndicator ? 1 : 0,
    config.defaultPurity || current.defaultPurity
  );
}

// ----------------------------------------------------
// ENQUIRIES
// ----------------------------------------------------
export function getEnquiries(status?: string) {
  let query = "SELECT * FROM enquiries";
  const params: any[] = [];
  if (status) {
    query += " WHERE status = ?";
    params.push(status);
  }
  query += " ORDER BY created_at DESC";

  const rows = db.prepare(query).all(...params) as any[];
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    phone: r.phone,
    email: r.email,
    type: r.type,
    message: r.message,
    status: r.status as "NEW" | "IN_PROGRESS" | "RESOLVED",
    productId: r.product_id,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  }));
}

export function createEnquiry(data: { name: string; phone: string; email?: string; type?: string; message: string; productId?: string }) {
  const id = `enq_${Date.now()}`;
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO enquiries (id, name, phone, email, type, message, status, product_id, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, 'NEW', ?, ?, ?)
  `).run(id, data.name, data.phone, data.email || null, data.type || "GENERAL", data.message, data.productId || null, now, now);
}

export function updateEnquiryStatus(id: string, status: "NEW" | "IN_PROGRESS" | "RESOLVED") {
  const now = new Date().toISOString();
  db.prepare("UPDATE enquiries SET status = ?, updated_at = ? WHERE id = ?").run(status, now, id);
}

// ----------------------------------------------------
// AUDIT LOGS
// ----------------------------------------------------
export function createAuditLog(data: { adminEmail: string; action: string; entity: string; entityId?: string; details?: string }) {
  const id = `log_${Date.now()}`;
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO audit_logs (id, admin_email, action, entity, entity_id, details, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(id, data.adminEmail, data.action, data.entity, data.entityId || null, data.details || null, now);
}

export function getAuditLogs(limit = 50) {
  const rows = db.prepare("SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT ?").all(limit) as any[];
  return rows.map((r) => ({
    id: r.id,
    adminEmail: r.admin_email,
    action: r.action,
    entity: r.entity,
    entityId: r.entity_id,
    details: r.details,
    timestamp: r.timestamp,
  }));
}

// ----------------------------------------------------
// STORE CONFIG
// ----------------------------------------------------
export function getStoreConfig() {
  const row = db.prepare("SELECT * FROM store_config WHERE id = 'default'").get() as any;
  if (!row) return null;
  return {
    name: row.name,
    address: row.address,
    phone: row.phone,
    whatsapp: row.whatsapp,
    email: row.email,
    openingHours: row.opening_hours,
    googleMapsUrl: row.google_maps_url,
    directionsUrl: row.directions_url,
    lat: row.lat,
    lng: row.lng,
    heroImage: row.hero_image,
  };
}

export function updateStoreConfig(data: Partial<NonNullable<ReturnType<typeof getStoreConfig>>>) {
  const current = getStoreConfig() || {
    name: "Sri Bhagavathi Silvers",
    address: "",
    phone: "",
    whatsapp: "",
    email: "",
    openingHours: "",
    googleMapsUrl: "",
    directionsUrl: "",
    lat: 13.0827,
    lng: 80.2707,
    heroImage: "",
  };
  db.prepare(`
    UPDATE store_config SET
      name = ?, address = ?, phone = ?, whatsapp = ?, email = ?,
      opening_hours = ?, google_maps_url = ?, directions_url = ?, lat = ?, lng = ?, hero_image = ?
    WHERE id = 'default'
  `).run(
    data?.name ?? current.name,
    data?.address ?? current.address,
    data?.phone ?? current.phone,
    data?.whatsapp ?? current.whatsapp,
    data?.email ?? current.email,
    data?.openingHours ?? current.openingHours,
    data?.googleMapsUrl ?? current.googleMapsUrl,
    data?.directionsUrl ?? current.directionsUrl,
    data?.lat ?? current.lat,
    data?.lng ?? current.lng,
    data?.heroImage ?? current.heroImage
  );
}

// ----------------------------------------------------
// DASHBOARD OVERVIEW METRICS
// ----------------------------------------------------
export function getDashboardMetrics() {
  const totalProducts = (db.prepare("SELECT COUNT(*) as count FROM products").get() as any).count;
  const activeProducts = (db.prepare("SELECT COUNT(*) as count FROM products WHERE status = 'PUBLISHED'").get() as any).count;
  const draftProducts = (db.prepare("SELECT COUNT(*) as count FROM products WHERE status = 'DRAFT'").get() as any).count;
  const totalCollections = (db.prepare("SELECT COUNT(*) as count FROM collections").get() as any).count;
  const totalOccasions = (db.prepare("SELECT COUNT(*) as count FROM occasions").get() as any).count;
  const customizedPieces = (db.prepare("SELECT COUNT(*) as count FROM customized_items").get() as any).count;
  const pendingEnquiries = (db.prepare("SELECT COUNT(*) as count FROM enquiries WHERE status = 'NEW'").get() as any).count;

  const currentRate = getLatestSilverRate();
  const recentProducts = getProducts({ status: "PUBLISHED" }).slice(0, 5);
  const recentEnquiries = getEnquiries().slice(0, 5);
  const recentLogs = getAuditLogs(5);

  return {
    totalProducts,
    activeProducts,
    draftProducts,
    totalCollections,
    totalOccasions,
    customizedPieces,
    pendingEnquiries,
    currentRate,
    recentProducts,
    recentEnquiries,
    recentLogs,
  };
}
