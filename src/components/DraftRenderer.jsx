import React from 'react';

export default function DraftRenderer({ blocks }) {
  const renderSaved = () => {
    const renderBlock = (type, text) => {
      switch (type) {
        case 'header-one':
          return <h1>{text}</h1>;
        case 'header-two':
          return <h2>{text}</h2>;
        case 'header-three':
          return <h3>{text}</h3>;
        case 'unstyled':
          return <p>{text}</p>;
        default:
          return;
      }
    };
    return (
      <div>
        {blocks.map((el) => (
          <React.Fragment key={el.key}>
            {renderBlock(el.type, el.text)}
          </React.Fragment>
        ))}
      </div>
    );
  };
  return renderSaved();
}
