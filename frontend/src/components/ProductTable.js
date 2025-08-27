import React, { useEffect, useState } from 'react';

const headers = {
  article_no: 'Article No.',
  product_service: 'Product/Service',
  in_price: 'In Price',
  price: 'Price',
  unit: 'Unit',
  in_stock: 'In Stock',
  description: 'Description'
};


function calcFields(width, orientation) {
  if (width < 520) return ['product_service', 'price'];
  if (width < 640) return ['article_no', 'product_service', 'price'];
  if (width < 768) return ['article_no', 'product_service', 'price', 'unit'];
  // Tablet portrait
  if (width < 1024 && orientation === 'portrait') return ['article_no', 'product_service', 'price', 'unit', 'in_stock'];
  // Tablet landscape up to desktop breakpoint
  if (width < 1200) return ['article_no', 'product_service', 'in_price', 'price', 'unit', 'in_stock'];
  // Desktop / large screens
  return ['article_no', 'product_service', 'in_price', 'price', 'unit', 'in_stock', 'description'];
}

export default function ProductTable({ products, handleChange, handleBlur }) {
  const getOrientation = () => (window.matchMedia && window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape');
  const [orientation, setOrientation] = useState(getOrientation());
  const [fields, setFields] = useState(() => calcFields(window.innerWidth, orientation));

  useEffect(() => {
    const mq = window.matchMedia('(orientation: portrait)');
    const handleOrientation = () => {
      const o = getOrientation();
      setOrientation(o);
      setFields(calcFields(window.innerWidth, o));
    };
    const handleResize = () => setFields(calcFields(window.innerWidth, getOrientation()));
    mq.addEventListener ? mq.addEventListener('change', handleOrientation) : mq.addListener(handleOrientation);
    window.addEventListener('resize', handleResize);
    return () => {
      mq.removeEventListener ? mq.removeEventListener('change', handleOrientation) : mq.removeListener(handleOrientation);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className="product-table-wrapper">
      <div className="table-scroll">
      <table className="product-table">
        <thead>
          <tr>
            {fields.map(f => (
              <th key={f}>{headers[f]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              {fields.map(f => (
                <td key={f}>
                  <input
                    name={f}
                    value={product[f] ?? ''}
                    onChange={e => handleChange(product.id, f, e.target.value)}
                    onBlur={() => handleBlur(product.id, product)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
