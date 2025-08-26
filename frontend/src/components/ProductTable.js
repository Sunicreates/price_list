import React, { useEffect, useState } from 'react';

const headers = {
  article_no: 'Article No.',
  product_service: 'Product/Service',
  in_price: 'In Price',
  price: 'Price',
  unit: 'Unit',
  in_stock: 'In Stock',
  description: 'Description',
};

function calcFields(width) {
  if (width < 520) return ['product_service', 'price'];
  if (width < 640) return ['article_no', 'product_service', 'price'];
  if (width < 880) return ['article_no', 'product_service', 'price', 'unit'];
  if (width < 1040) return ['article_no', 'product_service', 'price', 'unit', 'in_stock'];
  return ['article_no', 'product_service', 'in_price', 'price', 'unit', 'in_stock', 'description'];
}

export default function ProductTable({ products, handleChange, handleBlur }) {
  const [fields, setFields] = useState(() => calcFields(window.innerWidth));
  useEffect(() => {
    const onResize = () => setFields(calcFields(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
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
