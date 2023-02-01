import React, { useState } from 'react';
import './App.scss';

import Filters from './components/Filters';
import ProductsTable from './components/ProductsTable';
import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';

import { UpdatedProduct } from './types/UpdatedProduct';

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategories, setSelectedCategories] = useState('');

  const getFilteredProducts = () : UpdatedProduct[] => {
    let filteredProducts: UpdatedProduct[] = productsFromServer.map(product => {
      const category = categoriesFromServer.find(c => c.id === product.categoryId);
      const user = usersFromServer.find(u => u.id === category?.ownerId);

      return {
        id: product.id,
        name: product.name,
        category,
        user,
      };
    });

    filteredProducts = selectedUser
      ? filteredProducts.filter(product => product.user?.name === selectedUser)
      : filteredProducts;

    filteredProducts = selectedCategories ? filteredProducts.filter(
      product => product.category?.title && selectedCategories.includes(product.category.title),
    ) : filteredProducts;

    filteredProducts = searchInput ? filteredProducts.filter(
      product => product.name.toLowerCase().includes(searchInput.toLowerCase()),
    ) : filteredProducts;

    return filteredProducts;
  };

  const onSelectedUser = (name: string) => {
    setSelectedUser(name);
  };

  const onSelectedCategories = (categories: string) => {
    setSelectedCategories(categories);
  };

  const onSearchChange = (text : string) => {
    setSearchInput(text);
  };

  const filteredProducts : UpdatedProduct[] = getFilteredProducts();

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <Filters
            users={usersFromServer}
            categories={categoriesFromServer}
            selectedUser={selectedUser}
            selectedCategories={selectedCategories}
            searchInput={searchInput}
            onSelectedUser={onSelectedUser}
            onSelectedCategories={onSelectedCategories}
            onSearchChange={onSearchChange}
          />
        </div>

        <div className="box table-container">
          { filteredProducts.length === 0 && (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}

          { filteredProducts.length > 0 && <ProductsTable products={filteredProducts} />}
        </div>
      </div>
    </div>
  );
};
