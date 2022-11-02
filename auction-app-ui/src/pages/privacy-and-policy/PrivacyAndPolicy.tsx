import { useContext, useEffect } from 'react';
import PageContext from 'store/page-context';
import EN_STRINGS from 'util/en_strings';

import './privacy-and-policy.scss';

const PrivacyAndPolicy = () => {
  const pageCtx = useContext(PageContext);

  useEffect(() => {
    pageCtx.setNavbarItems([
      EN_STRINGS['Navbar.Home'],
      EN_STRINGS['Footer.PrivacyAndPolicy'],
    ]);
  }, []);

  return (
    <div className='c-privacy-and-policy'>
      <div className='c-content'>
        <h1>Some title here</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
          consequat pretium turpis, in eleifend mi laoreet sed. Donec ipsum
          mauris, venenatis sit amet porttitor id, laoreet eu magna. In
          convallis diam volutpat libero tincidunt semper. Ut aliquet erat
          rutrum, venenatis lacus ut, ornare lectus. Quisque congue ex sit amet
          diam malesuada, eget laoreet quam molestie. In id elementum turpis.
          Curabitur quis tincidunt mauris. Duis pharetra a odio vitae
          consectetur. Nullam vitae lacinia nisi, at porta sapien. Etiam
          vehicula augue at lacus tempus euismod. Nullam sit amet eros ut metus
          pulvinar volutpat et elementum lacus. Cras mauris mi, vulputate ac
          justo vitae, fringilla vestibulum sapien. Sed hendrerit nulla id
          luctus placerat. Sed venenatis ornare augue, et viverra dolor
          ullamcorper id. Duis id quam hendrerit, mollis ex ut, varius ipsum.
        </p>
        <p>
          Etiam bibendum viverra nulla, at cursus leo fringilla eget. In
          pellentesque viverra elit id vestibulum. Sed eget leo suscipit,
          commodo urna vitae, efficitur ligula. Pellentesque non mauris blandit,
          ultrices nibh consectetur, auctor velit. Nunc ac justo lacus. Vivamus
          et gravida ante. Quisque cursus augue ligula, aliquam ullamcorper enim
          ultricies sit amet. In placerat sapien eu ligula commodo pharetra.
          Nunc et facilisis dolor, ut condimentum metus. Phasellus lacinia
          efficitur diam sed pharetra. Nullam euismod magna at mauris hendrerit
          scelerisque vitae vel leo. Cras interdum tellus in sapien fermentum
          consequat.
        </p>
        <p>
          Sed sollicitudin non elit eu faucibus. Phasellus et enim ultricies,
          tincidunt velit eu, dictum dui. Proin laoreet semper sapien vitae
          aliquet. Vestibulum accumsan nibh pharetra dui vulputate commodo.
          Pellentesque a justo eu diam cursus auctor. Quisque sit amet maximus
          lacus, in mollis nunc. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
        </p>
      </div>
    </div>
  );
};

export default PrivacyAndPolicy;
