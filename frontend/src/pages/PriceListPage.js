import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ProductTable from '../components/ProductTable';

export default function PriceListPage() {
  const [products, setProducts] = useState([]);
  const [searchArticle, setSearchArticle] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const [advanced, setAdvanced] = useState(false);
  const [creating, setCreating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on ESC
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setSidebarOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then(res => res.json())
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  const handleChange = (id, field, value) => {
    setProducts(list => list.map(p => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleBlur = (id, product) => {
    fetch(`http://localhost:4000/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    }).catch(() => {});
  };

  const filtered = products.filter(p =>
    (p.article_no || '').toLowerCase().includes(searchArticle.toLowerCase()) &&
    (p.product_service || '').toLowerCase().includes(searchProduct.toLowerCase())
  );

  return (
    <div className={`layout-root ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Header lang="en" setLang={() => {}} onToggleSidebar={() => setSidebarOpen(o => !o)} sidebarOpen={sidebarOpen} />
      {sidebarOpen && <div className="overlay" role="button" aria-label="Close menu overlay" onClick={() => setSidebarOpen(false)} />}
      <div className="layout-body">
        <div className="sidebar-wrapper" id="app-sidebar"><Sidebar /></div>
        <main className="content-area">
          <div className="toolbar">
            <div className="searchers">
              <input
                className="pill-input"
                placeholder="Search Article No."
                value={searchArticle}
                onChange={e => setSearchArticle(e.target.value)}
              />
              <input
                className="pill-input"
                placeholder="Search Product ..."
                value={searchProduct}
                onChange={e => setSearchProduct(e.target.value)}
              />
            </div>
            <div className="toolbar-actions">
              <button
                className="btn-pill primary"
                disabled={creating}
                onClick={async () => {
                  try {
                    setCreating(true);
                    const blank = { article_no:'', product_service:'', in_price:'', price:'', unit:'', in_stock:'', description:'' };
                    // optimistic temporary row
                    const tempId = Date.now();
                    setProducts(p => [...p, { id: tempId, ...blank }]);
                    const res = await fetch('http://localhost:4000/products', {
                      method:'POST',
                      headers:{ 'Content-Type':'application/json' },
                      body: JSON.stringify(blank)
                    });
                    if (res.ok) {
                      const created = await res.json();
                      setProducts(p => p.map(row => row.id === tempId ? created : row));
                    } else {
                      setProducts(p => p.filter(row => row.id !== tempId));
                    }
                  } finally { setCreating(false); }
                }}
              ><span className="plus">+</span> {creating ? 'Creating...' : 'New Product'}</button>
              <button className="btn-pill">
                <span className="icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9V3h12v6" />
                    <rect x="6" y="13" width="12" height="8" rx="1" />
                    <path d="M6 13h12" />
                    <path d="M8 17h8" />
                    <path d="M20 9h-2" />
                  </svg>
                </span>
                Print List
              </button>
              <button
                type="button"
                className={`btn-pill btn-toggle ${advanced ? 'on' : ''}`}
                onClick={() => setAdvanced(a => !a)}
                aria-pressed={advanced}
              >
                Advanced mode
                <span className="switch" aria-hidden="true" />
              </button>
            </div>
          </div>
          <h2 className="page-title only-price-list">Price List</h2>
          <ProductTable products={filtered} handleChange={handleChange} handleBlur={handleBlur} />
        </main>
      </div>
    </div>
  );
}
