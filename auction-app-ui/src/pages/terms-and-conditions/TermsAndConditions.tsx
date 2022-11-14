import { useContext, useEffect } from 'react';
import PageContext from 'store/page-context';
import EN_STRINGS from 'util/en_strings';

import './terms-and-conditions.scss';

const TermsAndConditions = () => {
  const { setNavbarItems } = useContext(PageContext);

  useEffect(() => {
    setNavbarItems([
      EN_STRINGS['Navbar.Home'],
      EN_STRINGS['Navbar.Home'],
      EN_STRINGS['Footer.TermsAndConditions'],
    ]);
  }, []);

  return (
    <div className='c-terms-and-conditions'>
      <h1>Some title here</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat
        pretium turpis, in eleifend mi laoreet sed. Donec ipsum mauris,
        venenatis sit amet porttitor id, laoreet eu magna. In convallis diam
        volutpat libero tincidunt semper. Ut aliquet erat rutrum, venenatis
        lacus ut, ornare lectus. Quisque congue ex sit amet diam malesuada, eget
        laoreet quam molestie. In id elementum turpis. Curabitur quis tincidunt
        mauris.
      </p>

      <h3>Some title here</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat
        pretium turpis, in eleifend mi laoreet sed. Donec ipsum mauris,
        venenatis sit amet porttitor id, laoreet eu magna. In convallis diam
        volutpat libero tincidunt semper. Ut aliquet erat rutrum, venenatis
        lacus ut, ornare lectus. Quisque congue ex sit amet diam malesuada, eget
        laoreet quam molestie. In id elementum turpis. Curabitur quis tincidunt
        mauris.
      </p>

      <h3>Some title here</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat
        pretium turpis, in eleifend mi laoreet sed. Donec ipsum mauris,
        venenatis sit amet porttitor id, laoreet eu magna. In convallis diam
        volutpat libero tincidunt semper. Ut aliquet erat rutrum, venenatis
        lacus ut, ornare lectus. Quisque congue ex sit amet diam malesuada, eget
        laoreet quam molestie. In id elementum turpis. Curabitur quis tincidunt
        mauris.
      </p>
    </div>
  );
};

export default TermsAndConditions;
