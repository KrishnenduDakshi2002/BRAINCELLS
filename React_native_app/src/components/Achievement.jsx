import React from 'react';

import {
  Text,
  View,
} from 'react-native';

const Achievement = ({ value, subheading }) => (
	<View>
		<Text>{value}</Text>
		<Text>{subheading}</Text>
	</View>
);

export default Achievement;
