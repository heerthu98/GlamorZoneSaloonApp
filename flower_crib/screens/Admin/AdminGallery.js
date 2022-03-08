import React from 'react';
import { View, ScrollView } from 'react-native';

import ViewGallery from './ViewGallery';
import AddGallery from './AddGallery';

export default function AdminGallery() {
  return (
    <ScrollView>
      <View>
        <ViewGallery />
        <AddGallery />
      </View>
    </ScrollView>
  );
}
