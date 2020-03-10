import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Register from './pages/Register';
import List from './pages/List';

const Routes = createAppContainer(
    createSwitchNavigator({
        Register,
        List,
    })
)

export default Routes;