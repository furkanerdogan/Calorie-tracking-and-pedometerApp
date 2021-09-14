import * as React from 'react';

import Root from './src/Navigation/Root'
import { AuthProvider } from './src/Navigation/AuthProvider'
import { Yemekprovider } from './src/store/Yemekprovider'

//        GoogleFit.authorize({ scopes: [Scopes.FITNESS_ACTIVITY_READ], })

export default function App() {
  // AGCApp.getInstance().SetClientId('635966308059462528');
  // AGCApp.getInstance().SetClientSecret('BF1D220D75745DF136940AA042A8A31A9EB66274392417DD5633949B040C2342');
  // AGCApp.getInstance().SetApiKey('CgB6e3x91Rn9OzeU1LvTAyhV4KLjVsF7oYdi5BDjdpGykUPbtvWjNnbLz5JYNx7Ns2Ozv1E4T49qWzhsRDmMOhRY');
  return (
    // <StoreProvider store={store}> redux için procider ekleyeceğim zaman üstüne eklemem gerekiyor.
    <Yemekprovider>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </Yemekprovider>
  )
}
