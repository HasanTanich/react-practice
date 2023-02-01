import React from 'react';
import cn from 'classnames';

const SortArrows = ({
  onSortType, isActive, isReversed,
}
: { onSortType: ()=> void, isActive: boolean, isReversed : boolean }) => {
  return (
    <a
      href="#/"
      onClick={onSortType}
    >
      <span className="icon">
        <i
          data-cy="SortIcon"
          className={cn('fas', {
            'fa-sort': !isActive,
            'fa-sort-up': isActive && !isReversed,
            'fa-sort-down': isActive && isReversed,
          })}
        />
      </span>
    </a>
  );
};

export default SortArrows;
