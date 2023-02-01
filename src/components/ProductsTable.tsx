import React from 'react';
import { useState } from 'react';
import { UpdatedProduct } from '../types/UpdatedProduct';
import SortArrows from './SortArrows';

const ProductsTable = ({ products } : { products: UpdatedProduct[] }) => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const filteredProducts: UpdatedProduct[] = products.slice().sort((a, b) => {
    switch (sortType) {
    case 'id':
      return (isReversed ? b.id - a.id : a.id - b.id);
    case 'product':
      return (isReversed ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name));
    case 'category':
      return (isReversed ? (b.category?.title || '').localeCompare((a.category?.title || '')) : (a.category?.title || '').localeCompare((b.category?.title || '')));
    case 'user':
      return (isReversed ? (b.user?.name || '').localeCompare((a.user?.name || '')) : (a.user?.name || '').localeCompare((b.user?.name || '')));
    default:
      return 0;
    }
  });
  const onSortType = (type: string) => {
    if (type !== sortType) {
      setSortType(type);
      setIsReversed(false);
    } else if (isReversed) {
      setSortType('');
      setIsReversed(false);
    } else {
      setIsReversed(true);
    }
  };

  return (
    <table
      data-cy="ProductTable"
      className="table is-striped is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              ID
              <SortArrows
                onSortType={() => onSortType('id')}
                isActive={sortType === 'id'}
                isReversed={isReversed}
              />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Product
              <SortArrows
                onSortType={() => onSortType('product')}
                isActive={sortType === 'product'}
                isReversed={isReversed}
              />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Category
              <SortArrows
                onSortType={() => onSortType('category')}
                isActive={sortType === 'category'}
                isReversed={isReversed}
              />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              User
              <SortArrows
                onSortType={() => onSortType('user')}
                isActive={sortType === 'user'}
                isReversed={isReversed}
              />
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        {filteredProducts.map(product => {
          const {
            id, name, category, user,
          } = product;

          return (
            <tr data-cy="Product" key={id}>
              <td className="has-text-weight-bold" data-cy="ProductId">
                {id}
              </td>

              <td data-cy="ProductName">{name}</td>
              <td data-cy="ProductCategory">
                {category?.icon}
                -
                {category?.title}
              </td>

              <td
                data-cy="ProductUser"
                className={`${user?.sex === 'm' ? 'has-text-link' : 'has-text-danger'}`}
              >
                {user?.name}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProductsTable;
