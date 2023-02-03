import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Category } from '../types/Category';
import { User } from '../types/User';

type Props = {
  users: User[],
  categories: Category[],
  selectedUser: string,
  selectedCategories: string,
  onSelectedCategories: (categories: string) => void,
  onSelectedUser: (name: string) => void,
  onSearchChange: (search: string) => void
};
const Filters = ({users, categories, selectedUser, selectedCategories, onSelectedUser, onSelectedCategories, onSearchChange} : Props,) => {
  
  const [search] = useSearchParams();
  const [searchText, setSearchText] = useState(search.get('query') || '');

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
    setSearchText(e.target.value);
  };
  
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs has-text-weight-bold">
        <a
          data-cy="FilterAllUsers"
          className={`${!selectedUser ? 'is-active' : ''}`}
          onClick={() => onSelectedUser('')}
        >
          All
        </a>
        {
          users.map(user => (
            <a
              key={user.id}
              data-cy="FilterUser"
              className={`${selectedUser === user.name ? 'is-active' : ''}`}
              onClick={() => onSelectedUser(user.name)}
            >
              {user.name}
            </a>
          ))
        }
      </p>

      <div className="panel-block">
        <p className="control has-icons-left has-icons-right">
          <input
            data-cy="SearchField"
            type="text"
            className="input"
            placeholder="Search"
            onChange={onSearch}
            value={searchText}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>

          <span className="icon is-right">
            <button
              data-cy="ClearButton"
              type="button"
              className="delete"
              style={{ display: !searchText ? 'none' : 'block' }}
              onClick={() => {
                onSearchChange('');
                setSearchText('');
              }}
            />
          </span>
        </p>
      </div>

      <div className="panel-block is-flex-wrap-wrap">
        <a
          data-cy="AllCategories"
          className={`button is-success mr-6 ${selectedCategories ? 'is-outlined' : ''}`}
          onClick={() => onSelectedCategories('')}
        >
          All
        </a>
        {categories.map(category => {
          const { title, id } = category;

          return (
            <a
              key={id}
              data-cy="Category"
              className={`button mr-2 my-1 ${selectedCategories.includes(title) ? 'is-info' : ''}`}
              onClick={() => (selectedCategories.includes(title)
                ? onSelectedCategories(selectedCategories.replace(title, ''))
                : onSelectedCategories(selectedCategories.concat(title)))}
            >
              {title}
            </a>
          );
        })}
      </div>

      <div className="panel-block">
        <a
          data-cy="ResetAllButton"
          className="button is-link is-outlined is-fullwidth"
          onClick={() => {
            onSelectedUser('');
            onSelectedCategories('');
            onSearchChange('');
            setSearchText('');
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};

export default Filters;
