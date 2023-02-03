import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {debounce} from 'lodash';
import './App.scss';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';
import Filters from './components/Filters';
import ProductsTable from './components/ProductsTable';
import { UpdatedProduct } from './types/UpdatedProduct';

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedCategories, setSelectedCategories] = useState('');
  const [search, setSearch] = useSearchParams();

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
    const searchInput = search.get('query') || '';

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

  const onSearchChange = debounce((text : string) => {
    
    if(text.length === 0){
      search.delete('query');
      setSearch(search, {
        replace: true,
      });
    }else{
      search.set('query', text);
      setSearch(search, {
        replace: true,
      });
    }
  }, 350);

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
