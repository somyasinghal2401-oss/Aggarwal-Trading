import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  Boxes,
  PackageCheck,
  PencilRuler,
  Moon,
  Sun,
  X,
  Menu as MenuIcon,
  Search,
  ArrowRight,
  ArrowDownRight,
  CircleCheck,
  Factory,
  Truck,
  Users,
} from 'lucide-react';
import { PRODUCTS, Product } from './data/products';

const CATEGORIES = ['All', ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

const PILLARS = [
  {
    title: 'Product quality',
    copy: 'Precision-moulded parts built for everyday load and repeat use.',
  },
  {
    title: 'Practical design',
    copy: 'Fittings shaped for easy fitting on real production lines and job sites.',
  },
  {
    title: 'Dependable service',
    copy: 'Consistent supply and clear communication on every order.',
  },
  {
    title: 'Long-term value',
    copy: 'Fair pricing and reliable products that keep customers coming back.',
  },
];

const WHY_CHOOSE_US = [
  {
    title: 'Durable materials',
    copy: 'Tough plastics that resist wear, moisture and daily handling.',
    icon: ShieldCheck,
  },
  {
    title: 'Wide range',
    copy: 'Legs, brackets, caps, grommets, clips and plugs from one supplier.',
    icon: Boxes,
  },
  {
    title: 'Bulk-ready',
    copy: 'Standard pack sizes for quick counting, dispatch and restocking.',
    icon: PackageCheck,
  },
  {
    title: 'Custom options',
    copy: 'Colours, sizes and moulded variants made to your requirement.',
    icon: PencilRuler,
  },
];

const SERVED_SECTORS = [
  'Furniture manufacturers',
  'Hardware dealers',
  'Retailers',
  'Industrial customers',
  'Interior contractors',
];

const TRUST_METRICS = [
  'Manufacturer & trader',
  'Bulk and retail supply',
  'Consistent quality, every batch',
  'Dealer-friendly pricing',
];

const TRUST_ICONS = [Factory, Truck, ShieldCheck, Users];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>(PRODUCTS[0]?.name ?? '');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      return (localStorage.getItem('aggarwal-theme') as 'light' | 'dark') || 'light';
    } catch {
      return 'light';
    }
  });
  const [formStatus, setFormStatus] = useState<string>('');

  useEffect(() => {
    document.title = 'Aggarwal Trading – Quality Plastic Hardware | Where Trust Begins';
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Aggarwal Trading manufactures and supplies precision-moulded plastic furniture fittings, brackets, legs, caps, bushes and wall plugs.'
    );
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('aggarwal-theme', theme);
    } catch {
      // storage unavailable
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        !term ||
        [product.name, product.category, product.description, product.options]
          .join(' ')
          .toLowerCase()
          .includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const handleEnquireClick = (productName: string) => {
    setSelectedProduct(productName);
    setFormStatus('');
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuoteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get('n') ?? '');
    const phone = String(formData.get('p') ?? '');
    const product = String(formData.get('s') ?? '');
    const qty = String(formData.get('q') ?? '');
    const msg = String(formData.get('m') ?? '');

    const bodyText = `Name: ${name}\nPhone: ${phone}\nProduct: ${product}\nQuantity: ${qty}\nMessage: ${msg}`;
    const mailtoUrl = `mailto:info@aggarwaltrading.com?subject=${encodeURIComponent(
      `Enquiry: ${product}`
    )}&body=${encodeURIComponent(bodyText)}`;

    window.location.href = mailtoUrl;
    setFormStatus(
      'Your email app should open with the enquiry ready to send. Nothing is sent from this website.'
    );
  };

  return (
    <div className="site" id="top">
      {/* Topline Bar */}
      <div className="topline">
        <div className="wrap topline-inner">
          <span>Precision-moulded plastic furniture fittings</span>
          <span>Built on dependable supply and long-term relationships</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="site-header">
        <div className="wrap header-inner">
          <a className="brand" href="#top" aria-label="Aggarwal Trading home">
            <img src="/images/logo.jpg" alt="Aggarwal Trading logo" />
            <span>
              <strong>AGGARWAL TRADING</strong>
              <small>WHERE TRUST BEGINS</small>
            </span>
          </a>

          <nav
            id="main-navigation"
            className={`nav${isMenuOpen ? ' open' : ''}`}
            aria-label="Main navigation"
          >
            <a href="#about" onClick={closeMenu}>
              About
            </a>
            <a href="#products" onClick={closeMenu}>
              Products
            </a>
            <a href="#why" onClick={closeMenu}>
              Why us
            </a>
            <a href="#contact" onClick={closeMenu}>
              Contact
            </a>
            <a className="button" href="#contact" onClick={closeMenu}>
              Get a quote
            </a>
          </nav>

          <div className="header-actions">
            <button
              className="icon-button"
              type="button"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              data-testid="button-theme"
              onClick={toggleTheme}
            >
              {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
            </button>

            <button
              className="menu-button"
              type="button"
              aria-expanded={isMenuOpen}
              aria-controls="main-navigation"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              data-testid="button-menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={17} /> : <MenuIcon size={17} />}
              <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap hero-content">
            <div className="reveal">
              <span className="eyebrow">A dependable hardware partner</span>
              <h1 id="hero-title">
                Quality plastic hardware. <span>Reliable solutions.</span> Lasting relationships.
              </h1>
              <p className="hero-copy">
                Precision-moulded plastic components for furniture makers, hardware dealers,
                retailers and industrial buyers: durable, practical and priced for volume.
              </p>
              <div className="hero-ctas">
                <a className="button" href="#products">
                  View products & prices <ArrowDownRight size={17} />
                </a>
                <a className="button button-outline" href="#contact">
                  Request a quote
                </a>
              </div>
              <div className="hero-footnote">
                <CircleCheck size={16} />
                <span>Useful fittings. Clear pricing. Reliable supply.</span>
              </div>
            </div>

            <div className="hero-art reveal reveal-delay">
              <img src="/images/hero.jpg" alt="Aggarwal Trading – Where Trust Begins" />
              <div className="hero-stamp">Quality plastic hardware</div>
            </div>
          </div>

          {/* Trust Strip */}
          <div className="trust-strip">
            <div className="wrap trust-inner">
              {TRUST_METRICS.map((item, idx) => {
                const IconComponent = TRUST_ICONS[idx];
                return (
                  <span key={item}>
                    <IconComponent size={17} aria-hidden="true" /> {item}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="section" id="about" aria-labelledby="about-heading">
          <div className="wrap about-layout">
            <div className="about-copy">
              <div className="section-head">
                <span className="eyebrow">About Aggarwal Trading</span>
                <h2 id="about-heading">Small components. Big impact on the finished product.</h2>
              </div>
              <p>
                Aggarwal Trading is a plastic hardware manufacturing and trading business
                specializing in durable, functional and precision-moulded plastic components for
                furniture and hardware applications. We supply furniture manufacturers, hardware
                dealers, retailers and industrial customers.
              </p>
              <p>
                Our range includes plastic furniture fittings, brackets, caps, bushes, mounting
                components, wall plugs and other essential accessories. With a focus on quality,
                practical design and dependable service, we deliver hardware that combines
                functionality, durability and value.
              </p>
              <blockquote>Aggarwal Trading: Where Quality Meets Reliability.</blockquote>
            </div>

            <div className="pillars" aria-label="Our commitments">
              {PILLARS.map((pillar) => (
                <article className="pillar" key={pillar.title}>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Products Catalog Section */}
        <section className="section section-soft" id="products" aria-labelledby="products-heading">
          <div className="wrap">
            <div className="catalog-top">
              <div className="section-head">
                <span className="eyebrow">Furniture & hardware fittings</span>
                <h2 id="products-heading">Our products</h2>
                <p>
                  Browse the range with indicative prices and pack sizes. Prices are per piece and
                  vary with order volume, colour and size.
                </p>
              </div>
              <div
                className="catalog-count"
                aria-live="polite"
                data-testid="text-product-count"
              >
                Showing {filteredProducts.length} of {PRODUCTS.length} products
              </div>
            </div>

            <div className="catalog-tools">
              <div
                className="filters"
                role="group"
                aria-label="Filter products by category"
              >
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    className="filter-button"
                    type="button"
                    aria-pressed={selectedCategory === cat}
                    data-testid={`filter-${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <label className="search-wrap">
                <Search size={17} aria-hidden="true" />
                <span className="sr-only">Search products</span>
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products"
                  aria-label="Search products"
                  data-testid="input-product-search"
                />
              </label>
            </div>

            <div className="product-grid" aria-live="polite">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((prod: Product) => (
                  <article
                    className="product-card"
                    key={prod.name}
                    data-testid={`card-product-${prod.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  >
                    <div className="product-photo">
                      <img src={prod.image} alt={prod.name} loading="lazy" />
                    </div>
                    <div className="product-body">
                      <span className="product-category">{prod.category}</span>
                      <h3>{prod.name}</h3>
                      <p>{prod.description}</p>
                      <div className="product-options">Available: {prod.options}</div>
                      <div className="product-meta">
                        <div>
                          <span>Price per piece</span>
                          <strong>{prod.price}</strong>
                        </div>
                        <div>
                          <span>Pack quantity</span>
                          <strong>{prod.pack}</strong>
                        </div>
                      </div>
                      <button
                        className="button button-navy"
                        type="button"
                        data-testid={`button-enquire-${prod.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                        onClick={() => handleEnquireClick(prod.name)}
                      >
                        Enquire now <ArrowRight size={15} />
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="empty-results" role="status">
                  <strong>No matching products</strong>
                  Try another product name or select a different category.
                </div>
              )}
            </div>

            <p className="catalog-note">
              Prices are indicative, in Indian rupees (₹), excluding GST and freight. Custom sizes,
              colours and moulded parts are available on request.
            </p>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="section why" id="why" aria-labelledby="why-heading">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">A supply relationship you can count on</span>
              <h2 id="why-heading">Why customers choose Aggarwal Trading</h2>
              <p>Trust is built one dependable order at a time.</p>
            </div>

            <div className="why-grid">
              {WHY_CHOOSE_US.map(({ title, copy, icon: IconComponent }) => (
                <article className="why-item" key={title}>
                  <span>
                    <IconComponent size={18} aria-hidden="true" />
                  </span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Serve Section */}
        <section className="serve-section" aria-labelledby="serve-heading">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">Made to work across your supply chain</span>
              <h2 id="serve-heading">Who we serve</h2>
            </div>
            <div className="serve-list">
              {SERVED_SECTORS.map((sector) => (
                <span key={sector}>{sector}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Contact / Request a Quote Section */}
        <section className="section contact-section" id="contact" aria-labelledby="contact-heading">
          <div className="wrap contact-layout">
            <div className="contact-info">
              <div className="section-head">
                <span className="eyebrow">Start a conversation</span>
                <h2 id="contact-heading">Request a quote</h2>
                <p>Tell us what you need and we will reply with pricing and availability.</p>
              </div>

              <dl>
                <dt>Phone / WhatsApp</dt>
                <dd>+91 XXXXX XXXXX</dd>
                <dt>Email</dt>
                <dd>info@aggarwaltrading.com</dd>
                <dt>Address</dt>
                <dd>Your business address, City, State, PIN</dd>
                <dt>Business hours</dt>
                <dd>Mon–Sat, 10:00 AM – 7:00 PM</dd>
              </dl>
            </div>

            <form className="quote-form" onSubmit={handleQuoteSubmit}>
              <div className="form-row">
                <label>
                  Name
                  <input name="n" required autoComplete="name" data-testid="input-name" />
                </label>
                <label>
                  Phone
                  <input
                    name="p"
                    type="tel"
                    required
                    autoComplete="tel"
                    data-testid="input-phone"
                  />
                </label>
              </div>

              <label>
                Product
                <select
                  name="s"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  data-testid="select-product"
                >
                  {PRODUCTS.map((prod) => (
                    <option key={prod.name} value={prod.name}>
                      {prod.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Quantity required
                <input
                  name="q"
                  placeholder="e.g. 5,000 pcs"
                  data-testid="input-quantity"
                />
              </label>

              <label>
                Message
                <textarea
                  name="m"
                  rows={3}
                  placeholder="Size, colour or other requirements"
                  data-testid="input-message"
                />
              </label>

              <button
                className="button"
                type="submit"
                data-testid="button-submit-enquiry"
              >
                Prepare email enquiry <ArrowRight size={16} />
              </button>

              {formStatus && (
                <p className="form-status" role="status" data-testid="status-enquiry">
                  {formStatus}
                </p>
              )}

              <p className="form-disclaimer">
                Your email app will be used to send this enquiry. This website does not submit or store your details.
              </p>
            </form>
          </div>
        </section>
      </main>

      {/* Site Footer */}
      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-main">
            <div className="footer-brand">
              <strong>AGGARWAL TRADING</strong>
              <br />
              <em>Where Trust Begins</em>
            </div>
            <p>Quality Plastic Hardware. Reliable Solutions. Lasting Relationships.</p>
            <nav className="footer-links" aria-label="Footer navigation">
              <a href="#about">About</a>
              <a href="#products">Products</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
          <div className="footer-bottom">
            © 2026 Aggarwal Trading. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
