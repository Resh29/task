import React from 'react';

export const Tabs = ({ items }) => {
  const [active, setActive] = React.useState(null);

  const open = (e) => {
    setActive(+e.target.dataset.index);
  };
  return (
    <div className="_tabs">
      {items.map((n, i) => (
        <button
          data-index={i}
          className={`btn tablinks ${i === active ? 'active' : ''}`}
          onClick={open}
        >
          {n.title}
        </button>
      ))}
      <div className="_tabs__content">
        {/* {items[active] && <TabContent {...items[active]} />} */}
      </div>
    </div>
  );
};
