import React from 'react';
import { render } from 'react-dom';

import { MockedRoot } from './examples/test-2';
import './main.scss';

render(<MockedRoot />, document.getElementById('root'));
