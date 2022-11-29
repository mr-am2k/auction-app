import { useEffect } from 'react';

import { usePage } from 'hooks/usePage';

import EN_STRINGS from 'util/en_strings';

import './terms-and-conditions.scss';

const TermsAndConditions = () => {
  const { setNavbarTitle, setNavbarItems } = usePage();

  useEffect(() => {
    setNavbarTitle(EN_STRINGS.NAVBAR.HOME);
    setNavbarItems([
      EN_STRINGS.NAVBAR.HOME,
      EN_STRINGS.FOOTER.TERMS_AND_CONDITIONS,
    ]);
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
