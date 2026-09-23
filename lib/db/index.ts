import path from "path";
import fs from "fs";
import bcrypt from "bcryptjs";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { OCCASIONS } from "@/data/occasions";
import { CUSTOMIZED_PIECES } from "@/data/customized";

let sqlite: any;

try {
  // Lazy require better-sqlite3 to prevent build-time webpack errors in serverless environments
  const Database = require("better-sqlite3");
  
  const dbDir = path.join(process.cwd(), ".data");
  if (!fs.existsSync(dbDir)) {
    try {
      fs.mkdirSync(dbDir, { recursive: true });
    } catch {
      // In read-only serverless filesystems (e.g., Vercel), use /tmp
    }
  }

  const dbPath = fs.existsSync(dbDir)
    ? path.join(dbDir, "sri_bhagavathi.db")
    : path.join("/tmp", "sri_bhagavathi.db");

  sqlite = new Database(dbPath);
  sqlite.pragma("journal_mode = WAL");

  // Initialize Schema
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'EDITOR',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      category TEXT NOT NULL,
      category_label TEXT NOT NULL,
      subcategory TEXT,
      price REAL NOT NULL,
      formatted_price TEXT NOT NULL,
      pricing_mode TEXT NOT NULL DEFAULT 'FIXED',
      net_weight TEXT NOT NULL DEFAULT '0g',
      weight_grams REAL NOT NULL DEFAULT 0,
      purity TEXT NOT NULL DEFAULT '999',
      making_charge REAL NOT NULL DEFAULT 0,
      gst_rate REAL NOT NULL DEFAULT 0.03,
      purity_badge TEXT NOT NULL DEFAULT '92.5 SILVER',
      badge_type TEXT NOT NULL DEFAULT 'primary',
      image TEXT NOT NULL,
      secondary_images TEXT NOT NULL DEFAULT '[]',
      description TEXT NOT NULL,
      in_stock INTEGER NOT NULL DEFAULT 1,
      featured INTEGER NOT NULL DEFAULT 0,
      is_new_arrival INTEGER NOT NULL DEFAULT 0,
      is_best_seller INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'PUBLISHED',
      style TEXT NOT NULL DEFAULT '[]',
      collection TEXT,
      occasions TEXT NOT NULL DEFAULT '[]',
      tags TEXT NOT NULL DEFAULT '[]',
      story TEXT,
      care_instructions TEXT,
      specs TEXT NOT NULL DEFAULT '{}',
      seo_title TEXT,
      seo_description TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      count INTEGER NOT NULL DEFAULT 0,
      image TEXT NOT NULL,
      alt TEXT NOT NULL DEFAULT '',
      href TEXT NOT NULL,
      description TEXT,
      display_order INTEGER NOT NULL DEFAULT 0,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS collections (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      hero_image TEXT NOT NULL,
      thumbnail TEXT NOT NULL,
      story TEXT,
      featured INTEGER NOT NULL DEFAULT 0,
      display_order INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'PUBLISHED',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS occasions (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      hero_image TEXT NOT NULL,
      thumbnail TEXT NOT NULL,
      featured INTEGER NOT NULL DEFAULT 0,
      active INTEGER NOT NULL DEFAULT 1,
      display_order INTEGER NOT NULL DEFAULT 0,
      related_occasions TEXT NOT NULL DEFAULT '[]',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS customized_items (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      category TEXT NOT NULL,
      occasions TEXT NOT NULL DEFAULT '[]',
      featured INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'PUBLISHED',
      display_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS customization_steps (
      id TEXT PRIMARY KEY,
      step_number INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      icon TEXT NOT NULL DEFAULT 'Sparkles',
      display_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS silver_rate_records (
      id TEXT PRIMARY KEY,
      rate_per_gram_999 REAL NOT NULL,
      rate_per_gram_925 REAL NOT NULL,
      mode TEXT NOT NULL DEFAULT 'MANUAL',
      manual_override INTEGER NOT NULL DEFAULT 1,
      purity TEXT NOT NULL DEFAULT '999',
      source TEXT NOT NULL DEFAULT 'Certified Boutique Atelier',
      change_val REAL NOT NULL DEFAULT 0,
      change_percent REAL NOT NULL DEFAULT 0,
      timestamp TEXT NOT NULL,
      admin_email TEXT
    );

    CREATE TABLE IF NOT EXISTS silver_rate_config (
      id TEXT PRIMARY KEY DEFAULT 'default',
      is_top_bar_visible INTEGER NOT NULL DEFAULT 1,
      show_timestamp INTEGER NOT NULL DEFAULT 1,
      show_source INTEGER NOT NULL DEFAULT 1,
      show_change_indicator INTEGER NOT NULL DEFAULT 1,
      default_purity TEXT NOT NULL DEFAULT '999'
    );

    CREATE TABLE IF NOT EXISTS homepage_sections (
      id TEXT PRIMARY KEY,
      section_key TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      subtitle TEXT,
      enabled INTEGER NOT NULL DEFAULT 1,
      display_order INTEGER NOT NULL DEFAULT 0,
      content_json TEXT NOT NULL DEFAULT '{}'
    );

    CREATE TABLE IF NOT EXISTS store_config (
      id TEXT PRIMARY KEY DEFAULT 'default',
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      phone TEXT NOT NULL,
      whatsapp TEXT NOT NULL,
      email TEXT NOT NULL,
      opening_hours TEXT NOT NULL,
      google_maps_url TEXT NOT NULL,
      directions_url TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL,
      hero_image TEXT
    );

    CREATE TABLE IF NOT EXISTS instagram_items (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL DEFAULT '@sbs_sribhagavathisilvers',
      profile_url TEXT NOT NULL DEFAULT 'https://instagram.com/sbs_sribhagavathisilvers',
      post_url TEXT NOT NULL,
      reel_url TEXT,
      thumbnail TEXT NOT NULL,
      caption TEXT,
      display_order INTEGER NOT NULL DEFAULT 0,
      enabled INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS media_items (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      url TEXT NOT NULL,
      file_type TEXT NOT NULL,
      size INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      type TEXT NOT NULL DEFAULT 'GENERAL',
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'NEW',
      product_id TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      admin_email TEXT NOT NULL,
      action TEXT NOT NULL,
      entity TEXT NOT NULL,
      entity_id TEXT,
      details TEXT,
      timestamp TEXT NOT NULL
    );
  `);

  // Seed function if tables are empty
  const adminCount = (sqlite.prepare("SELECT COUNT(*) as count FROM admin_users").get() as { count: number }).count;
  const now = new Date().toISOString();

  if (adminCount === 0) {
    const superAdminHash = bcrypt.hashSync("Admin@SBS2026", 10);
    const editorHash = bcrypt.hashSync("Editor@SBS2026", 10);

    sqlite.prepare(`
      INSERT INTO admin_users (id, email, password_hash, name, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run("usr_super", "admin@sribhagavathisilvers.com", superAdminHash, "Super Admin", "SUPER_ADMIN", now, now);

    sqlite.prepare(`
      INSERT INTO admin_users (id, email, password_hash, name, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run("usr_editor", "editor@sribhagavathisilvers.com", editorHash, "Content Editor", "EDITOR", now, now);

    // Seed Categories
    const insertCat = sqlite.prepare(`
      INSERT OR REPLACE INTO categories (id, name, slug, count, image, alt, href, description, display_order, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
    `);

    CATEGORIES.forEach((cat, idx) => {
      insertCat.run(cat.id, cat.name, cat.id, cat.count || 0, cat.image, cat.alt || "", cat.href, cat.description || "", idx + 1, now, now);
    });

    // Seed Collections
    const insertCol = sqlite.prepare(`
      INSERT OR REPLACE INTO collections (id, name, slug, description, hero_image, thumbnail, story, featured, display_order, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'PUBLISHED', ?, ?)
    `);

    insertCol.run("sanctum-and-temple", "Sanctum & Temple", "sanctum-and-temple", "Divine pooja lamps, kalash, idol crowns, and sacred silver ritual articles.", "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1500&q=85", "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=85", "Crafted for temple sanctums and home mandirs.", 1, 1, now, now);
    insertCol.run("royal-silver-heritage", "Royal Silver Heritage", "royal-silver-heritage", "Masterpiece antique finished chokers, temple jhumkas, and heavy makara kadas.", "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1500&q=85", "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=85", "Inspired by Chettinad palace heirlooms.", 1, 2, now, now);
    insertCol.run("modern-silver", "Modern Silver", "modern-silver", "Minimalist stackable bands, sleek cuffs, and contemporary geometric daily accents.", "https://lh3.googleusercontent.com/aida-public/AB6AXuCW7_d9BeF9-rkPp7KgexqRyKdBpMQCDz3AWVUEkvMyjrGpcGTq29MtqyB1K1yUmFgZUphYCEqqa-LO_WQ-Jz1gMWCbcT1dCVGWHigjiseuyPScOr8dRn1_UVnP-0Qk1hehK7Z8Wid4sTnzCCA8mpZtS1t3wNWr5KLuqVZChLB4GzN5HPDszV4-1POIwGptQHw2xyO5EVcKy2XcSZfu97kwjHRZc_D1o93WzDNbzDcfWR73CNVK5G4U", "https://lh3.googleusercontent.com/aida-public/AB6AXuCW7_d9BeF9-rkPp7KgexqRyKdBpMQCDz3AWVUEkvMyjrGpcGTq29MtqyB1K1yUmFgZUphYCEqqa-LO_WQ-Jz1gMWCbcT1dCVGWHigjiseuyPScOr8dRn1_UVnP-0Qk1hehK7Z8Wid4sTnzCCA8mpZtS1t3wNWr5KLuqVZChLB4GzN5HPDszV4-1POIwGptQHw2xyO5EVcKy2XcSZfu97kwjHRZc_D1o93WzDNbzDcfWR73CNVK5G4U", "Designed for modern daily luxury.", 1, 3, now, now);

    // Seed Occasions
    const insertOcc = sqlite.prepare(`
      INSERT OR REPLACE INTO occasions (id, name, slug, description, hero_image, thumbnail, featured, active, display_order, related_occasions, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, 1, 1, ?, ?, ?, ?)
    `);

    OCCASIONS.forEach((occ, idx) => {
      insertOcc.run(occ.slug, occ.name, occ.slug, occ.shortDescription, occ.heroImage, occ.image, idx + 1, JSON.stringify(occ.relatedSlugs), now, now);
    });

    // Seed Products
    const insertProd = sqlite.prepare(`
      INSERT OR REPLACE INTO products (
        id, name, slug, category, category_label, price, formatted_price, pricing_mode,
        net_weight, weight_grams, purity, making_charge, gst_rate, purity_badge, badge_type,
        image, secondary_images, description, in_stock, featured, is_new_arrival, is_best_seller,
        status, style, collection, occasions, tags, story, care_instructions, specs,
        seo_title, seo_description, created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, 'FIXED',
        ?, ?, '925', 0, 0.03, ?, ?,
        ?, '[]', ?, ?, ?, ?, ?,
        'PUBLISHED', ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?
      )
    `);

    PRODUCTS.forEach((prod) => {
      const weightNum = parseFloat(prod.netWeight.replace(/[^0-9.]/g, "")) || 0;
      insertProd.run(
        prod.id,
        prod.name,
        prod.id,
        prod.category,
        prod.categoryLabel,
        prod.price,
        prod.formattedPrice,
        prod.netWeight,
        weightNum,
        prod.purityBadge || "92.5 SILVER",
        prod.badgeType || "primary",
        prod.image,
        prod.description,
        prod.inStock ? 1 : 0,
        prod.featured ? 1 : 0,
        prod.isNewArrival ? 1 : 0,
        prod.isBestSeller ? 1 : 0,
        JSON.stringify(prod.style || []),
        prod.collection || "Royal Silver Heritage",
        JSON.stringify(prod.occasions || []),
        JSON.stringify(prod.tags || []),
        prod.story || "",
        prod.careInstructions || "",
        JSON.stringify(prod.specs || {}),
        prod.name + " | Sri Bhagavathi Silvers",
        prod.description,
        now,
        now
      );
    });

    // Seed Customized Pieces
    const insertCustom = sqlite.prepare(`
      INSERT OR REPLACE INTO customized_items (id, name, slug, description, image, category, occasions, featured, status, display_order, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, 1, 'PUBLISHED', ?, ?, ?)
    `);

    CUSTOMIZED_PIECES.forEach((item, idx) => {
      insertCustom.run(
        item.id,
        item.name,
        item.slug,
        item.shortDescription,
        item.image,
        item.categoryLabel,
        JSON.stringify(item.occasions || []),
        idx + 1,
        now,
        now
      );
    });

    // Seed Customization Steps
    const insertStep = sqlite.prepare(`
      INSERT OR REPLACE INTO customization_steps (id, step_number, title, description, icon, display_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    insertStep.run("step-1", 1, "Consultation & Design Idea", "Share your vision, dimensions, or family crest idea via WhatsApp or in-store appointment.", "MessageSquare", 1);
    insertStep.run("step-2", 3, "Custom 3D CAD & Artisanal Sketch", "Our master designers create precision 3D CAD renders and hand-sketches for your approval.", "PenTool", 2);
    insertStep.run("step-3", 3, "Artisanal Handcrafted Forging", "Crafted in 999 fine or 925 silver with traditional hand-chasing techniques.", "Hammer", 3);
    insertStep.run("step-4", 4, "BIS Certification & Velvet Delivery", "Inspected, hallmarked, and packaged in a luxury velvet presentation chest.", "ShieldCheck", 4);

    // Seed Silver Rate & Config
    sqlite.prepare(`
      INSERT INTO silver_rate_records (id, rate_per_gram_999, rate_per_gram_925, mode, manual_override, purity, source, change_val, change_percent, timestamp, admin_email)
      VALUES (?, 247.04, 247.04, 'MANUAL', 1, '999', 'Certified Boutique Atelier', 0, 0, ?, 'admin@sribhagavathisilvers.com')
    `).run("rate_init", now);

    sqlite.prepare(`
      INSERT OR REPLACE INTO silver_rate_config (id, is_top_bar_visible, show_timestamp, show_source, show_change_indicator, default_purity)
      VALUES ('default', 1, 1, 1, 1, '999')
    `).run();

    // Seed Store Config
    sqlite.prepare(`
      INSERT OR REPLACE INTO store_config (id, name, address, phone, whatsapp, email, opening_hours, google_maps_url, directions_url, lat, lng, hero_image)
      VALUES ('default', 'Sri Bhagavathi Silvers', '124, South Mada Street, Mylapore, Chennai, Tamil Nadu - 600004', '+91 98400 12345', '+91 98400 12345', 'contact@sribhagavathisilvers.com', 'Mon - Sat: 10:00 AM - 8:30 PM | Sunday: 11:00 AM - 6:00 PM', 'https://maps.google.com/?q=Sri+Bhagavathi+Silvers+Chennai', 'https://maps.google.com/?q=Sri+Bhagavathi+Silvers+Chennai', 13.0335, 80.2687, 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1500&q=85')
    `).run();

    // Audit log initialization
    sqlite.prepare(`
      INSERT INTO audit_logs (id, admin_email, action, entity, entity_id, details, timestamp)
      VALUES (?, 'system', 'DATABASE_SEEDED', 'SYSTEM', 'INIT', 'SQLite database initialized and seeded with default Sri Bhagavathi Silvers products & configuration.', ?)
    `).run("log_init", now);
  }
} catch (err) {
  // Dummy fallback database handler for serverless build step if native sqlite is unavailable
  sqlite = {
    prepare: () => ({
      get: () => null,
      all: () => [],
      run: () => ({ changes: 0 }),
    }),
    exec: () => {},
    pragma: () => {},
  };
}

export const db = sqlite;
