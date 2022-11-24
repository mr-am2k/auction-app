import { useEffect } from 'react';

import { usePage } from 'hooks/usePage';

import EN_STRINGS from 'util/en_strings';

import './about-us.scss';

const AboutUs = () => {
  const { setNavbarItems } = usePage();

  useEffect(() => {
    setNavbarItems([
      EN_STRINGS.NAVBAR.HOME,
      EN_STRINGS.NAVBAR.HOME,
      EN_STRINGS.FOOTER.ABOUT_US
    ]);
    window.scrollTo(0,0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='c-about-us'>
      <h1>About Us</h1>
      <div className='c-page-wrapper'>
        <div className='c-content'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            consequat pretium turpis, in eleifend mi laoreet sed. Donec ipsum
            mauris, venenatis sit amet porttitor id, laoreet eu magna. In
            convallis diam volutpat libero tincidunt semper. Ut aliquet erat
            rutrum, venenatis lacus ut, ornare lectus. Quisque congue ex sit
            amet diam malesuada, eget laoreet quam molestie. In id elementum
            turpis. Curabitur quis tincidunt mauris.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            consequat pretium turpis, in eleifend mi laoreet sed. Donec ipsum
            mauris, venenatis sit amet porttitor id, laoreet eu magna. In
            convallis diam volutpat libero tincidunt semper. Ut aliquet erat
            rutrum, venenatis lacus ut, ornare lectus. Quisque congue ex sit
            amet diam malesuada, eget laoreet quam molestie. In id elementum
            turpis. Curabitur quis tincidunt mauris.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            consequat pretium turpis, in eleifend mi laoreet sed. Donec ipsum
            mauris, venenatis sit amet porttitor id, laoreet eu magna. In
            convallis diam volutpat libero tincidunt semper. Ut aliquet erat
            rutrum, venenatis lacus ut, ornare lectus. Quisque congue ex sit
            amet diam malesuada, eget laoreet quam molestie. In id elementum
            turpis. Curabitur quis tincidunt mauris.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            consequat pretium turpis, in eleifend mi laoreet sed. Donec ipsum
            mauris, venenatis sit amet porttitor id, laoreet eu magna. In
            convallis diam volutpat libero tincidunt semper. Ut aliquet erat
            rutrum, venenatis lacus ut, ornare lectus. Quisque congue ex sit
            amet diam malesuada, eget laoreet quam molestie. In id elementum
            turpis. Curabitur quis tincidunt mauris.
          </p>
        </div>

        <div className='c-images'>
          <div className='c-main-image'></div>
          <div className='c-other-images'>
            <div className='c-image-2'></div>
            <div className='c-image-3'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
