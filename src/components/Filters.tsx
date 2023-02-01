import React from 'react';
import { Category } from '../types/Category';
import { User } from '../types/User';

type Props = {
  users: User[],
  categories: Category[],
  selectedUser: string,
  selectedCategories: string,
  searchInput: string,
  onSelectedCategories: (categories: string) => void,
  onSelectedUser: (name: string) => void,
  onSearchChange: (search: string) => void
};
const Filters = (
  {
    // eslint-disable-next-line max-len
    users, categories, selectedUser, selectedCategories, searchInput, onSelectedUser, onSelectedCategories, onSearchChange,
  } : Props,
) => {
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs has-text-weight-bold">
        <a
          data-cy="FilterAllUsers"
          href="#/"
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
              href="#/"
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
            value={searchInput}
            onChange={onSearch}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>

          <span className="icon is-right">
            <button
              data-cy="ClearButton"
              type="button"
              className="delete"
              style={{ display: !searchInput ? 'none' : 'block' }}
              onClick={() => onSearchChange('')}
            />
          </span>
        </p>
      </div>

      <div className="panel-block is-flex-wrap-wrap">
        <a
          href="#/"
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
              href="#/"
            >
              {title}
            </a>
          );
        })}
      </div>

      <div className="panel-block">
        <a
          data-cy="ResetAllButton"
          href="#/"
          className="button is-link is-outlined is-fullwidth"
          onClick={() => {
            onSelectedUser('');
            onSelectedCategories('');
            onSearchChange('');
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};

export default Filters;
